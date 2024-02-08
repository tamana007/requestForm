'use client'

import React from 'react'
import DirectorReview from '../director-review'
import { useSearchParams } from 'next/navigation'
import Logo from '@/components/Logo'

function page() {
  const searchParams = useSearchParams()
  const search = searchParams.get('tamana') 

  return (
    <>
    <Logo/>
      <DirectorReview/>
    </>
  )
}

export default page