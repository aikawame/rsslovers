# frozen_string_literal: true

require 'open-uri'

# アイテム
class Item
  attr_reader :title, :description, :link_url, :updated_at

  def initialize(title:, link_url:, updated_at:, description: nil)
    @title = title
    @description = description
    @link_url = link_url
    @updated_at = updated_at
  end
end
