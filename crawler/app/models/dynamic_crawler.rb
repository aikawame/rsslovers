# frozen_string_literal: true

# 動的HTMLを扱うクローラー
module DynamicCrawler
  SESSION = Capybara::Session.new(:scraper)

  def fetch_html
    SESSION.visit(@url)
    Nokogiri::HTML.parse(SESSION.html)
  end
end
