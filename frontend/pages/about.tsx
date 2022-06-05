import Link from 'next/link'
import Main from '../components/Main'
import Section from '../components/Section'

export default function About() {
  return (
    <Main title="サービス案内">
      <Section heading="RSS愛好会とは">
        <p>
          RSS愛好会は、有志によるRSSフィード配信サービスです。
        </p>
        <p>
          昨今は新聞社等のサイトがRSSフィードを配信停止する例が増えております。
          本サービスは、そのように公式で配信されていないRSSフィードを代わりに配信しております。
        </p>
        <p>
          本サービスの運用には、クローラーの稼働やRSSフィードへの大量アクセス等のため、維持費用が掛かっております。
          フィードを日頃より購読されている場合は、サブスクリプションやスポットでの
          <Link href={"/support"}><a>ご支援</a></Link>
          をいただけますと幸いです。
        </p>
        <p>
          <Link href={"/support"}>
            <a className="button is-rounded is-primary">
              <i className="icon-donate" aria-hidden="true" />&nbsp;RSS愛好会を支援する
            </a>
          </Link>
        </p>
      </Section>
      <Section heading="適法性に関しまして">
        <p>
          本サービスは、新聞社等のサイトから記事の見出しのみを取得し、RSSフィードとして配信しております。
          著作権の及ぶ記事本文は取得せず、配信元サイトを参照していただくことにより、法令を遵守しております。
          なお、ニュース記事の見出しには著作物性が認められておらず、過去の判例でも著作権侵害が否定されております。
        </p>
        <p>
          また、本サービスではクローラーによる各サイトページへのアクセスは、1時間に1回以内としております。
          これは頻度・内容共に人為的なものと変わらず、各サイトへの影響は無視できるレベルであると考えております。
        </p>
        <p>
          とはいえ、各サイト運営者様のご都合もあろうとは存じます。
          つきましては、運営者様よりRSSフィード配信を認めない旨の通知を受けた際には、速やかに取り下げる方針です。
        </p>
      </Section>
      <Section heading="免責事項">
        <p>
          本サービスでは、第三者サイトのRSSフィードを掲載しておりますが、その内容についていかなる責任も負いかねます。
        </p>
        <p>
          また、本サービスおよび配信するRSSフィードは、予告なく改廃される場合があります。
        </p>
      </Section>
    </Main>
  )
}
