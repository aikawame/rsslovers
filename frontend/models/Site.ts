import yaml from '@/shared/data/sites.yml'
import { ApplicationRecord, BaseAttributes } from './ApplicationRecord'
import { Category } from './Category'
import { Feed } from './Feed'

export interface SiteAttributes extends BaseAttributes {
  categoryId: string
  label: string
  name: string
  url: string
}

export interface Site extends SiteAttributes {}

export class Site extends ApplicationRecord<SiteAttributes> {
  static data = yaml

  category() {
    return Category.findBy({ id: this.categoryId })
  }

  feeds() {
    return Feed.where({ siteId: this.id })
  }
}
