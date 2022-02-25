# frozen_string_literal: true

# 47NEWSのクローラー
class Crawler::Yonnana < Crawler
  def fetch_items
    fetch_html.css('.title-list li').map do |block|
      Item.new(title: block.css('h3.txt40').text,
               link_url: URI.join(root_url, block.css('a').attr('href')),
               updated_at: Time.zone.now.midnight)
    end
  end
end
