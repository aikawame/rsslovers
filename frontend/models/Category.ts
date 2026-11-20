import yaml from '@/shared/data/categories.yml'
import { ApplicationRecord, type BaseAttributes } from './ApplicationRecord'
import { Site } from './Site'

export interface CategoryAttributes extends BaseAttributes {
  name: string
}

export interface Category extends CategoryAttributes {}

export class Category extends ApplicationRecord<CategoryAttributes> {
  static data = yaml

  sites() {
    return Site.where({ categoryId: this.id })
  }
}
