'use client'
import React, {useRef, useState, useEffect} from 'react'
import Image from 'next/image'
import './style.css'
import gsap from 'gsap';

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

const getRandomString = (length:number) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

interface PointData {
    previous: number;
    current: number;
    amt: number
}

export default function Page() {
    const [randomString, setRandomString] = useState("")
    const [currentPosition, setCurrentPosition] = useState<{x: number, y: number}>({x: 0, y: 0});
    const [targetPosition, setTargetPosition] = useState<{x: number, y: number}>({x: 0, y: 0});
    const decoRef = useRef<HTMLDivElement>(null)
    const currentPositionRef = useRef({ x: 0, y: 0 });

    const mouseMove = (event:React.MouseEvent) => {
        const offsetX = event.nativeEvent.offsetX
        const offsetY= event.nativeEvent.offsetY
        setRandomString(getRandomString(2000))
        setTargetPosition({x: offsetX, y: offsetY});

        if (decoRef.current) {
            gsap.to(decoRef.current, {
                duration: 3,
                ease: 'power3',
                "--x": offsetX,
                "--y": offsetY
            });
        }
    }

    const handleMouseEnter = () => {
        if (decoRef.current) {
            gsap.to(decoRef.current, {
                duration: .1,
                ease: 'power3',
                opacity: 1
            });
        }
    }

    const handleMouseLeave = () => {
        if (decoRef.current) {
            gsap.to(decoRef.current, {
                duration: .1,
                ease: 'power3',
                opacity: 0
            });
        }
    }

    return (
        <div className='min-h-screen bg-slate-900 flex flex-col justify-center items-center'>
            <div className='grid grid-cols-3 grid-rows-1 w-3/4 box-container gap-1'>
                <div className=' p-4 grid gap-5 grid-item'>
                    <div className='w-full relative rounded-3xl overflow-hidden grid place-items-center aspect-square transition-all grid-item-img' 
                        // style={{"--x": `${currentPositionRef.current.x}px`, "--y": `${currentPositionRef.current.y}px`} as React.CSSProperties} 
                        onMouseMove={mouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className='absolute inset-0 text-sm break-words text-white opacity-0 transition-opacity duration-500 grid-item-img-deco' ref={decoRef}>
                            {randomString}
                        </div>
                        <Image src={'/logo.svg'} alt='logo' width={40} height={40} className='relative z-10 w-10'></Image>
                    </div>
                    <p className='text-white'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas dicta fugit sit, accusamus aperiam doloribus eum neque voluptatum fuga perferendis.
                    </p>
                    <span className='py-1 px-2 border-2 border-slate-50 rounded-3xl w-40 inline-flex text-white justify-center text-sm'>
                        Lorem ipsum.
                    </span>
                </div>
            </div>
            <div className='text-white'>
                {currentPosition.x}||{currentPosition.y}
            </div>
        </div>
    )
}