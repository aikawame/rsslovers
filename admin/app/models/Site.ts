import { AbstractSheet } from './AbstractSheet'
import { Feed } from './Feed'

export class Site extends AbstractSheet {
  private static readonly SHEET_NAME: string = 'sites'

  private static readonly BELONGS_TO: string = 'category'

  public readonly label: string

  public readonly crawler: string

  public readonly name: string

  public readonly url: string

  public readonly isActive: boolean

  public readonly feeds?: Feed[]

  public static find (label: string): Site {
    return new Site(this.sheetToObjects('label', label)[0])
  }

  public static findByCategory (label: string): Site[] {
    return this.sheetToObjects(this.BELONGS_TO, label).map(row => new Site(row, Feed.findBySite(row.label)))
  }

  public constructor (row: { [key: string]: string }, feeds?: Feed[]) {
    super(row)
    this.feeds = feeds
  }
}
