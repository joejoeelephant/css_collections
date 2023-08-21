import React from 'react'
import './style.css'
import Image from 'next/image'
export default function Page() {
  return (
    <div className='min-h-screen bg-slate-900 flex justify-center items-center'>
        <div className='w-60 h-80 bg-slate-900 relative flex justify-center items-center flex-col overflow-hidden card-box'>
            <div className='flex justify-center items-center flex-col gap-3 bg-slate-700 absolute inset-0 opacity-0 transition-opacity duration-500 delay-500 p-6 content-box'>
                <h2 className='text-xl text-red-500 font-bold'>Design</h2>
                <p className='text-white'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Autem nulla hic voluptates natus? 
                    Sequi voluptatem architecto commodi rerum repudiandae iure.
                </p>
                <a href="#" className='text-white block py-1 px-3 mt-3 bg-green-500'>Read More</a>
            </div>
            <div className='flex justify-cener items-center bg-white h-32 w-full z-20 origin-top relative image-box'>
                <Image src='/rocket.png' alt='rocket' width={64} height={64} className='absolute left-1/2 -translate-x-1/2 -bottom-8 z-30'></Image>
            </div>
            <div className='flex justify-center items-end bg-green-500 h-48 w-full z-10 origin-top border-t-4 relative border-slate-900 text-box'>
                <h2 className='text-xl font-bold py-1 px-3 bg-slate-50'> Design</h2>
            </div>
        </div>
    </div>
  )
}
