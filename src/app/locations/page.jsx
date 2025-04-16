'use client'
import React from 'react'
import dynamic from 'next/dynamic';
const MultiMapComponent = dynamic(() => import('@/components/MultiMapComponent'), { ssr: false });

function page  () {
  return (
    <>
    <MultiMapComponent />
    </>
  )
}

export default page