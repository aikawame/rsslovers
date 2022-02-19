// eslint-disable-next-line camelcase, no-undef
import Menu = GoogleAppsScript.Base.Menu;
import { Category } from './models/Category'
import { Feed } from './models/Feed'
import { Notification } from './models/Notification'
import { Utils } from './models/Utils'

const ENV_DEV = 'development'
const ENV_PROD = 'production'

// eslint-disable-next-line no-unused-vars
function onOpen (): void {
  const menu: Menu = SpreadsheetApp.getUi().createMenu('シート')
  menu.addItem('💾 本番環境に適用', 'apply')
  menu.addItem('💾 開発環境に適用', 'applyToDev')
  menu.addToUi()
}

const apply = (env: string = ENV_PROD): void => {
  const rssDir = env === ENV_DEV ? 'rss_dev' : 'rss'

  try {
    const frontendCategories: Category[] = Category.findAll()
    Utils.saveToS3(`${rssDir}/db/frontend_categories.json`, frontendCategories)

    const crawlerFeeds: Feed[] = Feed.findAll()
    Utils.saveToS3(`${rssDir}/db/crawler_feeds.json`, crawlerFeeds)

    const notifications: Notification[] = Notification.findAll()
    Utils.saveToS3(`${rssDir}/db/notifications.json`, notifications)
  } catch (e: Error) {
    Browser.msgBox(e.message)
  }
}

// eslint-disable-next-line no-unused-vars
const applyToDev = (): void => {
  apply(ENV_DEV)
}
