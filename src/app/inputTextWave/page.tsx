'use client'
import React from 'react'
import './style.css'
export default function Page() {
    const lableText = 'Lorem ipsum dolor sit.'
    return (
        <div className='min-h-screen bg-slate-900 flex justify-center items-center'>
            <div className='relative'>
                <input type="text" required id='text' className='outline-0 border-b-2 border-b-slate-600 bg-transparent text-xl text-white input-text' />
                <label htmlFor="text" className='absolute block  top-0 text-xl'>
                    {
                        lableText.split('').map((item, index) => {
                            return (
                                <span key={index} className='relative inline-flex text-slate-500 tracking-wider whitespace-pre' 
                                style={{transitionDelay: `${index*20}ms`, filter: `hue-rotate(${index*10}deg)`}}>
                                    {item.trim() !== '' ? item: '\u00A0'}
                                </span>
                            )
                        })
                    }
                </label>
            </div>
        </div>
    )
}
