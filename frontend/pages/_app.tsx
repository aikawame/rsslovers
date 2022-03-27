import Layout from '../components/Layout'
import '../styles/globals.scss'
import '../styles/icons.scss'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
