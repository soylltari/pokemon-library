import Image from 'next/image'
import React from 'react'

const NotFound = () => {
  return (
    <div className='flex min-h-[calc(100vh-100px)] flex-col items-center justify-center'>
      <Image src='/error-pokemon.png' alt='Not Found' width={200} height={200} />
      <h1>Not Found</h1>
      <p className='text-gray-500'>The page you are looking for does not exist.</p>
    </div>
  )
}

export default NotFound
