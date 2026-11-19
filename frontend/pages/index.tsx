import { Category } from '@/models/Category'
import { Site } from '@/models/Site'
import FeedPanel from '../components/FeedPanel'
import Main from '../components/Main'
import Section from '../components/Section'
import SupportersList from '../components/SupportersList'

export default function Home() {
  const categories = Category.all()

  return (
    <Main title="">
      { categories.map((category: Category) => { return (
        <Section heading={category.name} key={category.id}>
          <div className="panels">
            <div className="columns is-multiline">
              { category.sites().map((site: Site) => { return (
                <FeedPanel site={site} key={site.id} />
              )})}
            </div>
          </div>
        </Section>
      )})}
      <SupportersList />
    </Main>
  )
}
