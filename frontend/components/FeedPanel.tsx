import Link from 'next/link'
import { useState } from 'react'
import type { Feed } from '@/models/Feed'
import type { Site } from '@/models/Site'

type Props = {
  site: Site
}

const DEFAULT_LENGTH = 2

export default function FeedPanel({ site }: Props) {
  const [showPanel, setShowPanel] = useState(false)
  const feeds = site.feeds()
  const morePanel =
    showPanel || feeds.length <= DEFAULT_LENGTH ? (
      ''
    ) : (
      <a
        className="panel-block more is-justify-content-center"
        onClick={() => togglePanel()}
      >
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
        <h3 className="panel-heading is-size-5">{site.name}</h3>
        {feeds.map((feed: Feed, index: number) => {
          return (
            <Link
              href={`${process.env.NEXT_PUBLIC_ASSETS_URL}/rdf/${site.label}/${feed.label}.rdf`}
              key={feed.label}
              className="panel-block"
              style={getPanelStyle(index)}
            >
              <span className="panel-icon">
                <i className="icon-rss-square" aria-hidden="true" />
              </span>
              {feed.name}
            </Link>
          )
        })}
        {morePanel}
      </section>
    </div>
  )
}
