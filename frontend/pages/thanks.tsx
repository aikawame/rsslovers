import Link from 'next/link'
import Main from '../components/Main'
import Section from '../components/Section'

export default function About() {
  return (
    <Main title="ご支援ありがとうございます">
      <Section heading="御礼">
        <p>
          RSS愛好会の活動にご協力いただきまして、誠にありがとうございます。
          いただきましたご支援に深く感謝し、有効活用させていただきます。
        </p>
        <p>
          ご支援者様のお名前をサイト内で掲示させていただきますので、
          決済時のメールアドレスとお名前を添えて<Link href={"/inquiry"}>お問い合わせ</Link>いただけますと幸いです。
        </p>
        <p>
          今後ともRSS愛好会をよろしくお願いいたします。
        </p>
      </Section>
    </Main>
  )
}
