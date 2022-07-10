import Image from 'next/image'
import Link from 'next/link'
import Main from '../components/Main'
import Section from '../components/Section'
import SupportersList from '../components/SupportersList'

export default function Support() {
  return (
    <Main title="RSS愛好会へのご支援">
      <Section heading="ご支援のお願い">
        <p>
          RSS愛好会は個人開発による非営利のサービスです。
          開発運用は趣味の延長で行っていますが、インフラ維持には費用が掛かっており、
          サービスの特性上広告収入も見込めないため、サービス継続には利用者各位からのご支援が必要です。
        </p>
        <p>
          なお、ご支援いただきました方にはささやかではありますが、以下の特典を用意しております。
        </p>
        <dl>
          <dt>100円/月・スポット~1,000円</dt>
          <dd>サイトへのお名前掲載</dd>
          <dt>300円/月・スポット3,000円</dt>
          <dd>サイトへのお名前掲載</dd>
          <dd>新規フィード追加のご要望対応（3件まで）</dd>
          <dt>1,000円/月・スポット10,000円</dt>
          <dd>サイトへのお名前掲載（ゴールドサポーター）</dd>
          <dd>新規フィード追加のご要望対応（10件まで）</dd>
        </dl>
      </Section>
      <Section heading="支援方法">
        <p>
          RSS愛好会への支援をご検討いただきまして、ありがとうございます。
          支援方法は3種類ございます。
        </p>
        <div className="columns is-multiline">
          <div className="column is-one-third-desktop is-half-tablet">
            <div className="card">
              <div className="card-content">
                <form id="stripe100" action="/api/checkouts?price=100" method="POST">
                  <p className="title has-text-centered">
                    <input type="image" src="/images/stripe.svg" width="200" height="100" alt="Stripe" />
                  </p>
                </form>
              </div>
              <footer className="card-footer">
                <div className="card-footer-item">
                  アカウント不要
                </div>
                <div className="card-footer-item">
                  <form id="stripe100" action="/api/checkouts?price=100" method="POST">
                    <input className="button is-rounded is-info" type="submit" value="100円/月" />
                  </form>
                </div>
              </footer>
              <footer className="card-footer">
                <div className="card-footer-item">
                  <form id="stripe300" action="/api/checkouts?price=300" method="POST">
                    <input className="button is-rounded is-info" type="submit" value="300円/月" />
                  </form>
                </div>
                <div className="card-footer-item">
                  <form id="stripe1000" action="/api/checkouts?price=1000" method="POST">
                    <input className="button is-rounded is-info" type="submit" value="1,000円/月" />
                  </form>
                </div>
              </footer>
            </div>
          </div>
          <div className="column is-one-third-desktop is-half-tablet">
            <div className="card">
              <div className="card-content">
                <div className="title has-text-centered">
                  <Link href="https://github.com/sponsors/aikawame">
                    <a><Image src={"/images/github.svg"} width="200" height="100" alt="GitHub" /></a>
                  </Link>
                </div>
              </div>
              <footer className="card-footer">
                <p className="card-footer-item">
                  開発者の方におすすめ
                </p>
              </footer>
              <footer className="card-footer">
                <div className="card-footer-item">
                  <Link href="https://github.com/sponsors/aikawame">
                    <a className="button is-rounded is-info" target="blank">1ドル～/月</a>
                  </Link>
                </div>
              </footer>
            </div>
          </div>
          <div className="column is-one-third-desktop is-half-tablet">
            <div className="card card-amazon">
              <div className="card-content">
                <p className="title has-text-centered">
                  <Link href="https://www.amazon.jp/hz/wishlist/ls/142WH8V4Z1BSI?ref_=wl_share">
                    <a target="blank"><Image src={"/images/amazon.svg"} width="200" height="100" alt="Amazon" /></a>
                  </Link>
                </p>
              </div>
              <footer className="card-footer">
                <div className="card-footer-item">
                  スポットでお気軽に
                </div>
              </footer>
              <footer className="card-footer">
                <div className="card-footer-item">
                  <Link href="https://www.amazon.jp/hz/wishlist/ls/142WH8V4Z1BSI?ref_=wl_share">
                    <a className="button is-rounded is-info" target="blank">500円～/都度</a>
                  </Link>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </Section>
      <Section heading="ご支援者様への御礼">
        <p>
          ご支援者各位
        </p>
        <p>
          日頃よりRSS愛好会の活動にご協力いただきまして、誠にありがとうございます。
          いただきましたご支援に深く感謝し、有効活用させていただきます。
        </p>
        <p>
          ご支援者様のお名前をサイト内で掲示させていただきますので、
          メールアドレスとお名前を添えて<Link href={"/inquiry"}>お問い合わせ</Link>いただけますと幸いです。
          過去にご支援いただきました方も含めてお名前掲載させていただきます。
        </p>
      </Section>
      <SupportersList />
    </Main>
  )
}
