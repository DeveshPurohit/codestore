import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'


const MyAccount = () => {
  const router = useRouter()
  useEffect(() => {
    if(!localStorage.getItem('myuser')){
      router.push('/')
    }
  }, [])
  return (
    <div>My Account</div>
  )
}

export default MyAccount