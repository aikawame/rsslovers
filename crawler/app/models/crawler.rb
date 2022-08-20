# frozen_string_literal: true

require 'kconv'

# クローラー
class Crawler
  attr_accessor :url

  def self.create(label)
    Object.const_get("Crawler::#{label.capitalize}").new
  end

  def fetch_html
    return Nokogiri::HTML::Document.new if @url.instance_of?(URI)

    Nokogiri::HTML.parse(url.open)
  end

  private

  def root_url
    return nil if @url.instance_of?(URI)

    "#{@url.scheme}://#{@url.hostname}"
  end
end
