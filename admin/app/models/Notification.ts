import { AbstractSheet } from './AbstractSheet'

export class Notification extends AbstractSheet {
  private static readonly SHEET_NAME: string = 'notifications'

  public readonly startAt: Date

  public readonly endAt: Date

  public readonly title: string

  public readonly description: string

  public readonly linkUrl: string

  public static findAll (): Notification[] {
    return this.sheetToObjects().map(row => new Notification(row))
  }
}
