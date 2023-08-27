import React from 'react'
import './style.css'
export default function Page() {
  return (
    <div className='min-h-screen bg-slate-200 flex justify-center items-center'>
        <div className='grid__box text-white'>
            <div className='grid__item bg-green-500'>1</div>
            <div className='grid__item bg-red-500'>2</div>
            <div className='grid__item bg-blue-500'>3</div>
            <div className='grid__item bg-yellow-500'>4</div>
            <div className='grid__item bg-slate-500'>5</div>
        </div>
    </div>
  )
}
