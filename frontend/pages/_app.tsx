import type { AppProps } from 'next/app'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import Layout from '../components/Layout'
import '../styles/globals.scss'
import '../styles/icons.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      language="ja"
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GoogleReCaptchaProvider>
  )
}
