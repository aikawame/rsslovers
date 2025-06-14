# frozen_string_literal: true

# 読売新聞のクローラー
class Crawler::Yomiuri < Crawler
  def fetch_items
    fetch_html.css(selector).map do |block|
      anchor = block.css('h3 a')
      datetime = block.css('time').attr('datetime')
      Item.new(title: anchor.text,
               link_url: URI.join(root_url, anchor.attr('href')),
               updated_at: Time.zone.parse(datetime))
    rescue StandardError
    end
  end
end

def selector
  [
    '.news-top-latest article',
    '.fn-category-organization article',
    '.fn-category-time-series article',
    '.layout-contents__main .item'
  ].join(', ')
end
