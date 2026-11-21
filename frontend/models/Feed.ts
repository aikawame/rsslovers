import yaml from '@/shared/data/feeds.yml'
import { ApplicationRecord, type BaseAttributes } from './ApplicationRecord'
import { Site } from './Site'

export interface FeedAttributes extends BaseAttributes {
  siteId: string
  label: string
  name: string
}

export interface Feed extends FeedAttributes {}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: ActiveRecord
export class Feed extends ApplicationRecord<FeedAttributes> {
  static data = yaml

  site() {
    return Site.findBy({ id: this.siteId })
  }
}
