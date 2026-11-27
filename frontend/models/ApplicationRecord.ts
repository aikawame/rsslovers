const camelize = (key: string) => key.replace(/_([a-z0-9])/g, (_, char: string) => char.toUpperCase())

export interface BaseAttributes {
  id: string
}

type ModelClass<M> = {
  new (attributes: any): M
  data: Record<string, any>[]
  _cache?: M[]
  all(): M[]
}

export abstract class ApplicationRecord<T extends BaseAttributes> {
  static data: Record<string, any>[]
  static _cache?: any[]

  constructor(readonly attributes: T) {
    Object.assign(this, attributes)
  }

  static all<M>(this: ModelClass<M>): M[] {
    if (!this._cache) {
      this._cache = this.data.map(
        (item) => new this(Object.fromEntries(Object.entries(item).map(([key, value]) => [camelize(key), value])))
      )
    }
    return this._cache
  }

  static findBy<M extends ApplicationRecord<any>>(
    this: ModelClass<M>,
    conditions: Partial<M['attributes']>
  ): M | undefined {
    return this.all().find((record) => record.matches(conditions))
  }

  static where<M extends ApplicationRecord<any>>(this: ModelClass<M>, conditions: Partial<M['attributes']>): M[] {
    return this.all().filter((record) => record.matches(conditions))
  }

  matches(conditions: Partial<T>): boolean {
    return Object.entries(conditions).every(([key, value]) => this.attributes[key as keyof T] === value)
  }
}
