# frozen_string_literal: true

require 'open-uri'

# アイテム
class Item
  attr_reader :title, :description, :link_url, :updated_at

  def self.all_notification_items
    item_hashes = Utils.read_json_db(URI.parse("#{CREDENTIALS.s3.root_url}/db/crawler/notifications.json"))
    item_hashes.select { |item_hash| active?(item_hash) }
               .map { |item_hash| create_notification_item(item_hash) }
  end

  def self.active?(item_hash)
    now = Time.zone.now
    start_at = Time.zone.parse(item_hash[:start_at])
    end_at = Time.zone.parse(item_hash[:end_at])
    hour_diff = ((now - start_at) / 1.hour.to_i).floor
    start_at < now && now < end_at && (hour_diff % item_hash[:interval].to_i)
  end

  def self.create_notification_item(item_hash)
    now = Time.zone.now
    Item.new(title: item_hash[:title],
             description: item_hash[:description],
             link_url: URI.parse("#{item_hash[:link_url]}?ref=crawler&dt=#{now.strftime('%y%m%dH')}"),
             updated_at: now)
  end

  def initialize(title:, link_url:, updated_at:, description: nil)
    @title = title
    @description = description
    @link_url = link_url
    @updated_at = updated_at
  end
end
