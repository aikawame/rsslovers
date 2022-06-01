import Head from 'next/head'
import Link from 'next/link'
import Analytics from './Analytics'
import Logo from './Logo'
import styles from '../styles/Layout.module.scss'

export default function Layout({ children }) {

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="日経・ロイター・ブルームバーグなどのRSSフィードを配信しています。" />
        <meta name="keywords" content="RSS,新聞,ニュース,日経,NIKKEI,ロイター,Reuters,ブルームバーグ,Bloomberg" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RSS愛好会" />
        <meta property="og:title" content="RSS愛好会" />
        <meta property="og:url" content="https://rss.wor.jp/" />
        <meta property="og:image" content="https://rss.wor.jp/img/ogp.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:description" content="日経・ロイター・ブルームバーグなどのRSSフィードを配信しています。" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@aikawame" />
        <link rel="icon" type="image/x-icon" href={"/favicon.ico"} />
        <title>RSS愛好会</title>
      </Head>
      <header className="container">
        <nav className="navbar">
          <div className="navbar-brand">
            <div className="navbar-item is-size-3">
              <Link href="/"><a><Logo /></a></Link>
            </div>
            <div className="navbar-burger">
              <Link href={"/support"}>
                <a className="button is-rounded is-primary">
                  <i className="icon-donate" aria-hidden="true" />&nbsp;支援
                </a>
              </Link>
            </div>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-item">
                <Link href={"/about"}><a>サービス案内</a></Link>
              </div>
              <div className="navbar-item">
                <Link href={"/inquiry"}><a>お問い合わせ</a></Link>
              </div>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <Link href={"/support"}>
                  <a className="button is-rounded is-primary">
                    <i className="icon-donate" aria-hidden="true" />&nbsp;支援
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer className="footer has-text-centered">
        <div className="container">
          <ul className={styles.buttons}>
            <li>
              <Link href={"https://twitter.com/intent/follow?screen_name=aikawame"}>
                <a className={styles.twitter} target="blank" aria-label="フォロー"><i className="icon-twitter" /></a>
              </Link>
            </li>
            <li>
              <Link href={"/support"}><a className={styles.support} aria-label="支援"><i className="icon-donate" /></a></Link>
            </li>
          </ul>
          <div>
            <Link href="/"><a><Logo /></a></Link>
          </div>
          <address className={styles.address}>
            &copy; 2014 <Link href="https://worklover.wor.jp/"><a>Worklover</a></Link>
          </address>
          <ul className={styles.menu}>
            <li>
              <Link href={"/about"}><a>サービス案内</a></Link>
            </li>
            <li>
              <Link href={"/inquiry"}><a>お問い合わせ</a></Link>
            </li>
          </ul>
        </div>
      </footer>
      <Analytics />
    </>
  )
}
