'use client'
import React, {useState, useRef} from 'react'
import './style.css'
export default function Page() {
    const buttonRef = useRef<HTMLDivElement>(null)
    const [transPosition, setTransPosition] = useState<{x:number, y: number}>({x: 0, y:0})
    const mouseMove = (event:React.MouseEvent) => {
        if(!buttonRef.current) {return}
        const offsetX = event.nativeEvent.offsetX
        const offsetY= event.nativeEvent.offsetY
        const clientWidth = buttonRef.current.clientWidth
        const clientHeight = buttonRef.current.clientHeight
        const transX = (offsetX - clientWidth / 2)
        const transY = (offsetY - clientHeight / 2)
        setTransPosition({x: transX, y: transY})

        const mx = event.pageX - buttonRef.current.offsetLeft
        const my = event.pageY - buttonRef.current.offsetTop
        buttonRef.current.style.setProperty('--x', `${mx}px`)
        buttonRef.current.style.setProperty('--y', `${my}px`)
    }
    const mouseOut = (event:React.MouseEvent) => {
        setTransPosition({x: 0, y: 0})
    }
    return (
        <div className='min-h-screen bg-slate-900 flex justify-center items-center gap-10'>
            <div
                ref={buttonRef}
                className='
                    bg-slate-800 py-4 
                    px-5 transition-all 
                    ease-linear 
                    text-2xl 
                    font-bold cursor-pointer w-48 
                    flex justify-center 
                    items-center relative 
                    tracking-wide rounded-full
                    magnet-button 
                    text-slate-600
                    hover:text-slate-50
                    overflow-hidden
                '
                style={{transform:`translateX(${transPosition.x}px) translateY(${transPosition.y}px)`}}
                onMouseMove={mouseMove}
                onMouseOut={mouseOut}
                >
                <span className='pointer-events-none relative'>
                    Magnetic
                </span>
            </div>
        </div>
    )
}
