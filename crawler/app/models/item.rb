# frozen_string_literal: true

require 'open-uri'

# アイテム
class Item
  attr_reader :title, :description, :link_url, :updated_at

  def self.all_notification_items
    Notification.all.select { |notification| active?(notification) }
                .map { |notification| create_notification_item(notification) }
  end

  def self.active?(notification)
    now = Time.zone.now
    hour_diff = ((now - notification.start_at) / 1.hour.to_i).floor
    notification.start_at < now && now < notification.end_at && (hour_diff % notification.interval)
  end

  def self.create_notification_item(notification)
    now = Time.zone.now
    new(title: notification.title,
        description: notification.description,
        link_url: URI.parse("#{notification.link_url}?ref=crawler&dt=#{now.strftime('%y%m%dH')}"),
        updated_at: now)
  end

  def initialize(title:, link_url:, updated_at:, description: nil)
    @title = title
    @description = description
    @link_url = link_url
    @updated_at = updated_at
  end
end
