# frozen_string_literal: true

require 'open-uri'

# フィード
class Feed < ApplicationRecord
  MAX_RETRY_COUNT = 3
  BASE_WAIT_SECONDS = 30

  belongs_to :site

  attr_accessor :items

  def self.shuffled(args = {})
    feeds_by_site = where(args).to_a.shuffle.group_by(&:site_id).values
    max_feeds_per_site = feeds_by_site.map(&:size).max || 0
    (0...max_feeds_per_site).flat_map do |index|
      feeds_by_site.filter_map { |feeds| feeds[index] }
    end
  end

  def initialize(hash)
    @items = []
    super
  end

  def title
    "#{site.name} #{name}"
  end

  def description
    "#{site.name}の#{name}に関するフィードをお届けします。"
  end

  def self_url
    URI.parse("#{CREDENTIALS.r2.root_url}/rss/rdf/#{site.label}/#{label}.rdf")
  end

  def encoded_url
    URI.encode_www_form_component(self_url)
  end

  def updated_at
    Time.zone.now
  end

  def crawled?
    @crawled
  end

  def crawl_and_generate_items(retry_count = 0)
    crawler = Crawler.create(site.crawler_type, link_url)
    @items = crawler.fetch_items
    Sentry.capture_message("#{site.name}の#{name}の記事が取得されませんでした。") if @items.empty?
    @crawled = true
    self
  rescue StandardError => e
    if retry_count >= MAX_RETRY_COUNT
      Sentry.capture_exception(e)
    else
      wait_before_retry(e, retry_count)
      crawl_and_generate_items(retry_count + 1)
    end
    self
  end

  def save
    Utils.save_to_r2(path: "rss/rdf/#{site.label}/#{label}.rdf",
                     body: to_rdf,
                     content_type: 'application/xml')
  end

  def to_rdf
    @feed = self
    ERB.new(File.read('app/templates/feed.rdf.erb'), trim_mode: '-').result(binding)
  end

  private

  def wait_before_retry(error, retry_count)
    wait_seconds = (BASE_WAIT_SECONDS * (2**retry_count)) + rand(1..10)
    Rails.logger.warn("エラー発生のため#{wait_seconds}秒待機後に再試行します...(#{retry_count + 1}/3)")
    Rails.logger.warn(error.message)
    sleep(wait_seconds)
  end
end
