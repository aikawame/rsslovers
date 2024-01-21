# frozen_string_literal: true

# 日経新聞のクローラー
class Crawler::Nikkei < Crawler
  def fetch_items
    fetch_html.css('article').map do |block|
      Item.new(title: block.css('h2 a').text,
               link_url: URI.join('https://www.nikkei.com', block.css('h2 a').attr('href')),
               updated_at: Time.zone.parse(block.css('time').attr('datetime')))
    end
  end
end
