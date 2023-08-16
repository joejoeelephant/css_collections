'use client'
import React, {useState, useRef} from 'react'
import './style.css'

export default function Page() {
    const menueArr = [
        'Lorem, ipsum.',
        'Lorem ipsum dolor sit.',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        'Lorem ipsum dolor sit amet.',
        'Lorem, ipsum dolor.'
    ]
    const [menue, setMenue] = useState<string[]>(menueArr)
    const [cursorPosition, setCursorPosition] = useState<{x:number, y:number}>({x:0, y:0})
    const menueRef = useRef<HTMLUListElement>(null)

    const menueMove = (event: React.MouseEvent) => {
        const cursorX = event.pageX
        const cursorY = event.pageY
        setCursorPosition({x: cursorX, y: cursorY})
    }

    return (
        <div className='min-h-screen bg-slate-900 flex justify-center items-center page-container cursor-none' onMouseMove={menueMove}>
            <div>
                <ul className=' flex flex-col justify-center items-center relative' ref={menueRef} >
                    {
                        menue.map((item, index) => {
                            return (
                                <li key={index} className='relative text-center px-3 menue-li'>
                                    <a href="#" className='no-underline text-slate-800 cursor-none'>
                                        {
                                            item.split('').map((item , index) => {
                                                return (
                                                    <span key={index} 
                                                        className='relative text-2xl tracking-wide uppercase menue-letter transition-all duration-300'
                                                        style={{transitionDelay: `${index*30}ms`}}
                                                    >
                                                        {item}
                                                    </span>
                                                )
                                            })
                                        }
                                    </a>
                                </li>
                            )
                        })
                    }
                    <div className='w-5 h-5 rounded-full bg-white menue-cursor fixed pointer-events-none' style={{top:cursorPosition.y, left: cursorPosition.x}}></div>
                </ul>
            </div>
        </div>
    )
}
