import '../styles/globals.css'
import {GeneralProvider} from '../components/Context/Context'
import Layout from '../components/Layout/Layout'


function MyApp({ Component, pageProps }) {
  return (
    <GeneralProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GeneralProvider>
  )
}

export default MyApp
