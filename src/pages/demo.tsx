import Head from 'next/head'
import { Inter } from '@next/font/google'
// import mui button
import Button from '@mui/material/Button'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const sendReq = async () => {
    // get random number from 1 to 10000
    const rand = Math.floor(Math.random() * 10000) + 1;
    const res = await axios.post('/api/entry', { title: "Foo Bar", slug: "foo-bar"+rand, body: "lorem ipsum" });
    console.log(res);
  }

  return (
    <>
      <Head>
        <title>gputhing</title>
        <meta name="description" content="thing that compares performance benchmarks via video" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button onClick={sendReq} variant="text">Get video</Button>
    </>
  )
}
