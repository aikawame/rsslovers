# frozen_string_literal: true

# 47NEWSのクローラー
class Crawler::Yonnana < Crawler
  def fetch_items
    fetch_html.css('.post_items .post_item').map do |block|
      Item.new(title: block.css('.item_ttl').text,
               link_url: URI.join(root_url, block.attr('href')),
               updated_at: Time.zone.now.midnight)
    end
  end
end
