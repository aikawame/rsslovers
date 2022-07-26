# frozen_string_literal: true

# 読売新聞のクローラー
class Crawler::Yomiuri < Crawler
  def fetch_items
    fetch_html.css('.news-top-latest article').map do |block|
      anchor = block.css('h3 a')
      datetime = block.css('time').attr('datetime')
      Item.new(title: anchor.text,
               link_url: URI.parse(anchor.attr('href')),
               updated_at: Time.zone.parse(datetime))
    end
  end
end
