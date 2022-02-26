# frozen_string_literal: true

desc 'Crawl specified sites and feeds immediately'
task :crawl, %w[site feed] => :environment do |_, args|
  Rails.logger.info('クロールを開始します...')
  notification_items = Item.all_notification_items
  Feed.where(args).shuffle.each do |feed|
    Rails.logger.info("#{feed.site.name} - #{feed.name}")
    feed.crawl_and_generate_items
    next unless feed.crawled

    feed.items += notification_items if notification_items.present?
    feed.save
    Utils.purge_cdn_cache(feed.self_url)
  end
  Rails.logger.info('クロールを完了しました。')
end
