# frozen_string_literal: true

# ブルームバーグのクローラー
class Crawler::Bloomberg < Crawler
  def fetch_items
    fetch_html.css('article').map do |block|
      anchor = block.css('a')
      datetime = block.css('time').attr('datetime')
      Item.new(title: anchor.text.lstrip.split("\n")[0],
               link_url: URI.join(root_url, anchor.attr('href')),
               updated_at: updated_at(datetime))
    end
  end

  private

  def updated_at(datetime)
    datetime.present? ? Time.zone.parse(datetime) : Time.zone.now.midnight
  end
end
