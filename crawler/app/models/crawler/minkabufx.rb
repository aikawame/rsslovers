# frozen_string_literal: true

# みんかぶFX/為替のクローラー
class Crawler::Minkabufx < Crawler
  def fetch_items
    fetch_html.css('.list-link__item').map do |block|
      anchor = block.css('a')
      Item.new(title: anchor.attr('title').text,
               link_url: URI.join('https://fx.minkabu.jp', anchor.attr('href')),
               updated_at: Time.zone.parse(block.css('.fc-sub').text))
    end
  end
end
