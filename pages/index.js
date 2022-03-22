import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="CodeStore - Enjoy the code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      hi this is CodeStore
      <div className="mx-10 bg-slate-600">Devesh</div>
      <div className="mx-10 my-5 bg-slate-600">Devesh</div>


    </div>
  )
}
