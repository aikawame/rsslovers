// eslint-disable-next-line camelcase, no-undef
import Menu = GoogleAppsScript.Base.Menu;
import { Category } from './models/Category'
import { Utils } from './models/Utils'
import { Feed } from './models/Feed'

// eslint-disable-next-line no-unused-vars
function onOpen (): void {
  const menu: Menu = SpreadsheetApp.getUi().createMenu('シート')
  menu.addItem('💾 RSS愛好会に適用', 'apply')
  menu.addToUi()
}

// eslint-disable-next-line no-unused-vars
const apply = (): void => {
  try {
    const frontendCategories: Category[] = Category.findAll()
    Utils.saveToS3('rss/db/frontend_categories.json', frontendCategories)

    const batchFeeds: Feed[] = Feed.findAll()
    Utils.saveToS3('rss/db/batch_feeds.json', batchFeeds)
  } catch (e: Error) {
    Browser.msgBox(e.message)
  }
}
