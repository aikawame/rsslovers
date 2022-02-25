# frozen_string_literal: true

# ブルームバーグのクローラー
class Crawler::Bloomberg < Crawler
  def fetch_items
    fetch_html.css('article').map do |block|
      anchor = block.css('a')
      datetime = block.css('time').attr('datetime')
      Item.new(title: anchor.text.lstrip,
               link_url: URI.join(root_url, anchor.attr('href')),
               updated_at: datetime.present? ? Time.zone.parse(datetime) : Time.zone.now.midnight)
    end
  end
end
