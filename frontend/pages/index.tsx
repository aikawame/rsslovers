import useSWR from 'swr'
import FeedPanel from '../components/FeedPanel'
import Main from '../components/Main'
import Section from '../components/Section'
import SupportersList from '../components/SupportersList'

type Category = {
  label: string
  name: string
  isActive: boolean
  sites: Site[]
}

type Site = {
  label: string
  crawler: string
  name: string
  url: string
  isActive: boolean
  feeds: Feed[]
}

type Feed = {
  label: string
  name: string
  linkUrl: string
  isActive: boolean
}

const fetcher = (url) => fetch(url).then(res => res.json())

export default function Home() {
  const { data } = useSWR<Category[]>(`${process.env.NEXT_PUBLIC_ASSETS_URL}/db/frontend/categories.json`, fetcher)

  if (!data) return (
    <div className="index-loading" />
  )

  return (
    <Main title="">
      <Section heading="ロイターのフィードに配信関しまして">
        <p>
          現在、ロイターのサイト刷新によりフィードが正常に配信できない状況となっております。
          本サービスでは、ロイターのフィードが正常に配信できるよう、対応を検討しております。
        </p>
      </Section>
      { data.map(category => { return (
        <Section heading={category.name} key={category.label}>
          <div className="panels">
            <div className="columns is-multiline">
              { category.sites.map((site: Site) => { return (
                <FeedPanel category={category} site={site} key={site.label} />
              )})}
            </div>
          </div>
        </Section>
      )})}
      <SupportersList />
    </Main>
  )
}
