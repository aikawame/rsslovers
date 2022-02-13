import { AbstractSheet } from './AbstractSheet'
import { Site } from './Site'

export class Feed extends AbstractSheet {
  private static readonly SHEET_NAME: string = 'feeds'

  private static readonly BELONGS_TO: string = 'site'

  public readonly site?: Site

  public readonly label: string

  public readonly name: string

  public readonly linkUrl: string

  public readonly isActive: boolean

  public static findAll (): Feed[] {
    return this.sheetToObjects().map(row => new Feed(row, Site.find(row.site)))
  }

  public static findBySite (label: string): Feed[] {
    return this.sheetToObjects(this.BELONGS_TO, label).map(row => new Feed(row))
  }

  public constructor (row: { [key: string]: string }, site?: Site) {
    super(row)
    this.site = site
  }
}
