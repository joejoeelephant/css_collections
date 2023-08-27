'use client'
import React, {useEffect, useRef, useState} from 'react'
import './style.css'
import SettingsIcon from '@mui/icons-material/Settings';
import BluetoothDriveIcon from '@mui/icons-material/BluetoothDrive';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

export default function Sections() {
    const [activeIndex, setActiveIndex] = useState(0)
    const indicatorRef = useRef<HTMLDivElement>(null)
    const sectionContainerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.registerPlugin(ScrollToPlugin);

        if(!indicatorRef.current) return;
        if(!sectionContainerRef.current) return;
        gsap.utils.toArray(".section-box").forEach((section, index) => {
            const updateIndicatorPosition = () => {
                gsap.killTweensOf(indicatorRef.current);  // Stop any ongoing animations
                gsap.to(indicatorRef.current, {
                    duration: 0.5,
                    x: index * 64
                });
                setActiveIndex(index)
            };

            const updateIndicatorPositionBack = () => {
                gsap.killTweensOf(indicatorRef.current);  // Stop any ongoing animations
                gsap.to(indicatorRef.current, {
                    duration: 0.5,
                    x: (index - 1) * 64
                });
                setActiveIndex(index - 1)

            };
    
            ScrollTrigger.create({
                trigger: section as HTMLElement,
                start: "top center",
                onEnter: updateIndicatorPosition,  // When section enters from the top
                onLeaveBack: updateIndicatorPositionBack  // When leaving, scrolling back up
            });
        });
    
        return () => {
          // Clean up ScrollTriggers on component unmount
          ScrollTrigger.getAll().forEach(st => st.kill());
        };
        
    },[])

    const scrollTo = (id: string) => (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
        gsap.to(window, {
            duration: 0.5,
            scrollTo: id,
            ease: "power2.inOut"
          });
    }

    return (
        <>
             <div className='fixed z-50 bottom-8 bg-white left-1/2 -translate-x-1/2 flex justify-center items-center nav-container rounded-md px-3'>
                <div className='flex relative'>
                    {
                        Array.from({length: 5}).map((item, index) => {
                            return (
                                <a href={`#section${index}`} key={index}
                                    onClick={scrollTo(`#section${index}`)}
                                    className={`relative z-10 w-16 h-14 flex flex-col justify-center items-center font-bold nav-item ${index == activeIndex? ' active ': ''}`}>
                                    <span className="relative transition-transform duration-500 block text-slate-400 nav-icon">
                                        {index %2 ==0 ? <BluetoothDriveIcon></BluetoothDriveIcon> : <SettingsIcon></SettingsIcon>}
                                    </span>
                                    <span className='absolute text-xs rounded-lg text-white py-0.5 px-2 opacity-0 tracking-wide translate-y-4 nav-text'>Sec{index}</span>
                                </a>
                            )
                        })
                    }
                    <div className='absolute w-16 h-16 bg-white rounded-full -top-9 indicator' ref={indicatorRef}>

                    </div>
                </div>
            </div>
            <div className='section-container' ref={sectionContainerRef}>
                {
                    Array.from({length: 5}).map((item, index) => {
                        return (
                            <div 
                                className={`min-h-screen ${index % 2 == 0 ? "bg-slate-800": "bg-slate-700"} flex justify-center items-center text-white text-4xl font-bold section-box`} 
                                id={`section${index}`}
                                key={index}
                            >
                                {index}
                            </div>
                        )
                    })
                }
            </div>
        </>
  )
}
