import React from 'react'
import LoginCard from '@/components/login-card'
import { getActiveNotes } from '@/utils/api'

export async function getStaticProps(){
  const res = await getActiveNotes()

  console.log("HI")

  return {
    props: {
      notes: res
    }
  }
}

const Login = () => {
  return (
    <LoginCard />
  )
}

export default Login