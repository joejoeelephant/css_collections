'use client'
import React, {useState} from 'react'
import './style.css'
import HomeIcon from '@mui/icons-material/Home';
export default function Page() {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div className='min-h-screen bg-slate-900'>
            <ul className='absolute left-0 w-28 h-full flex justify-center items-center flex-col gap-3 nav-bar'>
                {
                    Array.from({length: 8}).map((item, index) => {
                        return (
                            <li key={index} className={`relative w-20 h-20 flex justify-center ${(index == activeIndex) ? 'active': ""} items-center mx-1 w-full`} onClick={() => {return setActiveIndex(index)}}>
                                <a href="#" className='flex justify-center items-center flex-col relative w-full'>
                                    <span className='absolute text-green-500 flex justify-center items-center w-20 h-20 rounded-full transition-all duration-500 delay-200  icon'>
                                        <HomeIcon className='text-4xl'></HomeIcon>
                                    </span>
                                    <span className='nav-text absolute left-20 bg-green-500 py-1 px-4 rounded-2xl  text-xl'>{`Text${index}`}</span>
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
