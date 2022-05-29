import { useState } from 'react'
import Link from 'next/link'
import { Category, Site, Feed } from '../globals'

type Props = {
  category: Category
  site: Site
}

const DEFAULT_LENGTH = 2

export default function FeedPanel ({ category, site }: Props) {
  const [showPanel, setShowPanel] = useState(false)
  const siteName = category.label === 'yonnana' ? site.name.replace('47NEWS', '') : site.name
  const morePanel = showPanel || site.feeds.length <= DEFAULT_LENGTH ? '' : (
    <a className="panel-block more is-justify-content-center" onClick={() => togglePanel()}>
      &#9660;
    </a>
  )

  const getPanelStyle = (index: number) => {
    return { display: showPanel || index < DEFAULT_LENGTH ? 'flex' : 'none' }
  }

  const togglePanel = () => {
    setShowPanel(!showPanel)
  }

  return (
    <div className="column is-one-third">
      <section className="panel">
        <h3 className="panel-heading is-size-5">{siteName}</h3>
        { site.feeds.map((feed: Feed, index: number) => { return (
          <Link href={`${process.env.NEXT_PUBLIC_ASSETS_URL}/rdf/${site.label}/${feed.label}.rdf`} key={feed.label}>
            <a className="panel-block" style={getPanelStyle(index)}>
              <span className="panel-icon"><i className="icon-rss-square" aria-hidden="true" /></span>
              {feed.name}
            </a>
          </Link>
        )})}
        {morePanel}
      </section>
    </div>
  )
}
