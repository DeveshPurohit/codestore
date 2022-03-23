import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="CodeStore - Enjoy the code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar/>
        <div>
          <img src='/home.jpeg'/>
        </div>
      <Footer/>

    </div>
  )
}
