# frozen_string_literal: true

require 'open-uri'

# フィード
class Feed < ApplicationRecord
  belongs_to :site

  attr_accessor :items

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
    URI.parse("#{CREDENTIALS.s3.root_url}/rss/rdf/#{site.label}/#{label}.rdf")
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
    if retry_count >= 3
      Sentry.capture_exception(e)
    else
      sleep(10)
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
end
