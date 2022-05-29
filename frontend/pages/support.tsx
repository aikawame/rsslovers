import Image from 'next/image'
import Link from 'next/link'
import Main from '../components/Main'
import Section from '../components/Section'

export default function Support() {
  return (
    <Main title="RSS愛好会へのご支援">
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
                <p className="card-footer-item">
                  アカウント不要
                </p>
              </footer>
              <footer className="card-footer">
                <div className="card-footer-item">
                  <form id="stripe100" action="/api/checkouts?price=100" method="POST">
                    <input className="button is-rounded is-info" type="submit" value="月額 100円" />
                  </form>
                </div>
                <div className="card-footer-item">
                  <form id="stripe300" action="/api/checkouts?price=300" method="POST">
                    <input className="button is-rounded is-info" type="submit" value="月額 300円" />
                  </form>
                </div>
              </footer>
            </div>
          </div>
          <div className="column is-one-third-desktop is-half-tablet">
            <div className="card">
              <div className="card-content">
                <p className="title has-text-centered">
                  <Link href="https://github.com/sponsors/aikawame">
                    <a><Image src={"/images/github.svg"} width="200" height="100" alt="GitHub" /></a>
                  </Link>
                </p>
              </div>
              <footer className="card-footer">
                <p className="card-footer-item">
                  開発者の方におすすめ
                </p>
              </footer>
              <footer className="card-footer">
                <div className="card-footer-item">
                  <Link href="https://github.com/sponsors/aikawame">
                    <a className="button is-rounded is-info" target="blank">月額 1ドル～</a>
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
                <p className="card-footer-item">
                  スポットでお気軽に
                </p>
              </footer>
              <footer className="card-footer">
                <div className="card-footer-item">
                  <Link href="https://www.amazon.jp/hz/wishlist/ls/142WH8V4Z1BSI?ref_=wl_share">
                    <a className="button is-rounded is-info" target="blank">都度 500円～</a>
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
          開発を優先するため、個別の返信はいたしておりませんが、いただきましたご支援に深く感謝し、
          有効活用させていただきます。
        </p>
      </Section>
    </Main>
  )
}
