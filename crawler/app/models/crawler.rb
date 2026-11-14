# frozen_string_literal: true

require 'kconv'

# クローラー
class Crawler
  def self.create(type, url)
    Object.const_get("Crawler::#{type.capitalize}").new(url)
  end

  def initialize(url)
    @url = URI.parse(url)
  end

  def fetch_html
    return Nokogiri::HTML::Document.new if @url.instance_of?(URI)

    Nokogiri::HTML.parse(@url.open)
  end

  private

  def root_url
    return nil if @url.instance_of?(URI)

    "#{@url.scheme}://#{@url.hostname}"
  end
end
