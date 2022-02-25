# frozen_string_literal: true

# サイト
class Site
  attr_reader :crawler, :label, :name, :url

  def initialize(crawler:, label:, name:, url:)
    @crawler = crawler
    @label = label
    @name = name
    @url = url
  end
end
