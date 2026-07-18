# frozen_string_literal: true

# ブルームバーグのクローラー
class Crawler::Bloomberg < Crawler
  prepend DynamicCrawler

  def fetch_items
    fetch_html.css('.styles_itemContainer__t2ZQc').map do |block|
      anchor = block.css('a')
      Item.new(title: anchor.text,
               link_url: URI.join(root_url, anchor.attr('href')),
               updated_at: Time.zone.now.midnight)
    end
  end
end
