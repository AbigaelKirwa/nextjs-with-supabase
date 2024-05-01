'use client'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='w-full h-[100vh] flex flex-col items-center justify-center'>
      <div className='flex'>
        <h2 className='font-bold text-2xl'>404:</h2>
        <p className='mt-1 ml-2'>Could not find requested resource</p>
      </div>
      <div className='mt-5 underline font-medium'>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  )
}