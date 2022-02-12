import { AbstractSheet } from './AbstractSheet'
import { Site } from './Site'

export class Category extends AbstractSheet {
  private static readonly SHEET_NAME: string = 'categories'

  public readonly label: string

  public readonly name: string

  public readonly isActive: boolean

  public websites: Site[]

  public static findAll (): Category[] {
    return this.sheetToObjects().map(row => new Category(row, Site.findByCategory(row.label)))
  }

  public constructor (row: { [key: string]: string }, websites: Site[] = []) {
    super(row)
    this.websites = websites
  }
}
