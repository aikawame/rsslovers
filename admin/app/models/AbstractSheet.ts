import { Utils } from './Utils'

export abstract class AbstractSheet {
  protected static readonly SHEET_NAME: string

  protected static readonly BELONGS_TO: string

  public static sheetToObjects (filterKey?: string, filterValue?: string): { [key: string]: string }[] {
    const values: string[][] =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(this.SHEET_NAME)?.getDataRange().getValues() ?? []
    const headings: string[] = values.slice(0, 1)[0]
    const rows: string[][] = values.slice(1)
    const filterIndex = headings.indexOf(filterKey || '')

    return rows.filter(columns => {
      return filterIndex === -1 || columns[filterIndex] === filterValue
    }).map(columns => {
      return columns.reduce((object: string[][], current: string, index: number) => {
        object[headings[index]] = current

        return object
      }, {})
    })
  }

  protected constructor (row: { [key: string]: string }) {
    Object.keys(row).forEach(key => {
      this[key] = (key === 'isActive') ? Utils.stringToBoolean(row[key]) : row[key]
    })
  }
}
