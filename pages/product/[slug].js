import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { slug } = router.query

  return <p>presenting : {slug}</p>
}

export default Post