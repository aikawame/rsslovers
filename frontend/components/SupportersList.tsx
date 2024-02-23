export default function SupportersList () {
  const GOLD_SUPPORTERS = [
    'SHIN',
  ]

  const NORMAL_SUPPORTERS = [
    'YuG1224',
    'Matyahiko',
    'ニシノ',
    'zucchini',
    'Masa Hokari',
    'chitetopopps',
    'holypanel',
    'CrazyHIKO'
  ]

  return (
    <section className="section supporters">
      <h2 className="title is-4">ご支援者様一覧<small>（敬称略）</small></h2>
      <section className="panel">
        <h3 className="gold panel-heading is-size-5">ゴールドサポーター</h3>
        <ul className="columns is-multiline is-centered">
          { GOLD_SUPPORTERS.map((supporter: string) => { return (
            <li className="column is-half-mobile is-one-third-tablet is-one-fifth-desktop" key={supporter}>
              {supporter}
            </li>
          )})}
        </ul>
      </section>
      <section className="panel">
        <h3 className="panel-heading is-size-5">サポーター</h3>
        <ul className="columns is-multiline is-centered">
          { NORMAL_SUPPORTERS.map((supporter: string) => { return (
            <li className="column is-half-mobile is-one-third-tablet is-one-fifth-desktop" key={supporter}>
              {supporter}
            </li>
          )})}
        </ul>
      </section>
    </section>
  )
}
