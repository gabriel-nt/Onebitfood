import Head from 'next/head'
import { RecoilRoot } from 'recoil';

import Header from '../components/Header'
import Container from 'react-bootstrap/Container';

import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>OneBitFood V2</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
      </Head>

      <main>
        <Header />
        <Container className="mt-6">
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </Container>
      </main>
    </>
  )
}

export default MyApp
