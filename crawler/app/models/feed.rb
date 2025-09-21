# frozen_string_literal: true

require 'open-uri'

# フィード
class Feed
  attr_accessor :items
  attr_reader :site, :label, :name, :link_url, :crawled

  def self.all
    feed_hashes = Utils.read_json_db(URI.parse("#{CREDENTIALS.s3.root_url}/db/crawler/feeds.json"))
    feed_hashes.map do |feed_hash|
      create(feed_hash)
    rescue StandardError => e
      Sentry.capture_exception(e)
      Rails.logger.error(e.message)
      Rails.logger.error(e.backtrace&.first)
    end
  end

  def self.create(feed_hash)
    site = Site.new(crawler: Crawler.create(feed_hash[:site][:crawler]),
                    label: feed_hash[:site][:label],
                    name: feed_hash[:site][:name],
                    url: URI.parse(feed_hash[:site][:url]))
    new(site: site,
        label: feed_hash[:label],
        name: feed_hash[:name],
        link_url: URI.parse(feed_hash[:link_url]))
  end

  def self.where(labels = {})
    site_label = labels[:site]
    feed_label = labels[:feed]
    feeds = all
    feeds = feeds.select { |feed| feed.site.label == site_label } if site_label.present?
    feeds = feeds.select { |feed| feed.label == feed_label } if feed_label.present?
    feeds
  end

  def initialize(site:, label:, name:, link_url:)
    @site = site
    @label = label
    @name = name
    @link_url = link_url
    @items = []
    @crawled = false
    @html = nil
  end

  def title
    "#{@site.name} #{@name}"
  end

  def description
    "#{@site.name}の#{@name}に関するフィードをお届けします。"
  end

  def self_url
    URI.parse("#{CREDENTIALS.s3.root_url}/rss/rdf/#{@site.label}/#{@label}.rdf")
  end

  def encoded_url
    URI.encode_www_form_component(self_url)
  end

  def updated_at
    Time.zone.now
  end

  def crawl_and_generate_items(retry_count = 0)
    @site.crawler.url = @link_url
    @items = @site.crawler.fetch_items
    Sentry.capture_message("#{@site.name}の#{@name}の記事が取得されませんでした。") if @items.empty?
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
    Utils.save_to_s3(path: "rss/rdf/#{@site.label}/#{@label}.rdf",
                     body: to_rdf,
                     content_type: 'application/xml')
  end

  def to_rdf
    @feed = self
    ERB.new(File.read('app/templates/feed.rdf.erb'), trim_mode: '-').result(binding)
  end
end
