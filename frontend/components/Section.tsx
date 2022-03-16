import { ReactNode } from 'react'

type Props = {
  heading: string
  children: ReactNode
}

export default function Section ({heading, children}: Props) {
  return (
    <section className="section">
      <h2 className="title is-4">{heading}</h2>
      {children}
    </section>
  )
}
