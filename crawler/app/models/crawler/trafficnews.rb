# frozen_string_literal: true

# 乗りものニュースのクローラー
class Crawler::Trafficnews < Crawler
  def fetch_items
    fetch_html.css('.archive-list li').map do |block|
      anchor = block.css('h2 > a')
      datetime = block.css('time').attr('datetime')
      Item.new(title: anchor.text,
               link_url: URI.join(root_url, anchor.attr('href')),
               updated_at: Time.zone.parse(datetime))
    end
  end
end
