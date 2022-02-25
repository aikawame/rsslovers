# frozen_string_literal: true

# バッファローのクローラー
class Crawler::Buffalo < Crawler
  def fetch_items
    fetch_html.css('div[role="list"] div.el-list--date__item').map do |block|
      anchor = block.css('p > a')
      datetime = block.css('time').attr('datetime')
      Item.new(title: anchor.text,
               link_url: URI.join(root_url, anchor.attr('href')),
               updated_at: Time.zone.parse(datetime))
    end
  end
end
