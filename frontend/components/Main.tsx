import { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  title: string
  children: ReactNode
}

export default function Main({title, children}: Props) {
  return (
    <>
      <Head>
        <title>{title} - RSS愛好会</title>
      </Head>
      <main>
        <div className="hero is-primary">
          <div className="hero-body has-text-centered">
            <h1 className="title has-text-weight-normal">
              {title}
            </h1>
          </div>
        </div>
        <section className="container content">
          {children}
        </section>
      </main>
    </>
  )
}
