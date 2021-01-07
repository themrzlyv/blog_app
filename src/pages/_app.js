import '../styles/globals.css'
import {GeneralProvider} from '../components/Context/Context'
import { ToastProvider } from 'react-toast-notifications'
import Layout from '../components/Layout/Layout'


function MyApp({ Component, pageProps }) {
  return (
    <GeneralProvider>
      <ToastProvider autoDismiss={true} autoDismissTimeout="3000">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ToastProvider>
    </GeneralProvider>
  )
}

export default MyApp
