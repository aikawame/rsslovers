# frozen_string_literal: true

# ORICON NEWSのクローラー
class Crawler::Oricon < Crawler
  def fetch_items
    fetch_html.css('article.card').map do |block|
      datetime = block.css('time').attr('datetime')
      Item.new(title: block.css('h2').text.strip,
               link_url: URI.join(root_url, full_path(block.css('a').attr('href'))),
               updated_at: parse_time(datetime))
    end
  end

  private

  def full_path(path)
    path.to_s.include?('/news/') ? "#{path}full/" : path
  end

  def parse_time(datetime)
    datetime.present? ? Time.zone.parse(datetime) : Time.zone.now.midnight
  end
end
