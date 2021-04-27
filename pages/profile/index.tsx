import { Layout } from '@components/common'
import { LoadingDots } from '@components/ui'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

// ? this page forwards user to '/profile/account'

export default function Profile() {
  const router = useRouter()

  useEffect(() => {
    if (router) router.push('/profile/account')
  }, [router])

  return (
    <div className="w-full h-56 flex justify-center items-center">
      <LoadingDots />
    </div>
  )
}

Profile.Layout = Layout
