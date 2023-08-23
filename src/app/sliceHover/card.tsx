'use client'
import React, {useState, useRef, useEffect} from 'react'
import './style.css'
import futureImg from '../../../public/future.jpg'
import gsap from 'gsap'
import { lettersAndSymbols } from './utils'

export default function Card() {
    const SLICE_NUMS = 5;
    const SLICE_DIRECTION = "vertical"
    const slices = Array.from({length: SLICE_NUMS}).map((item, index) => {
        return {
            index,
            clipPath: "",
            left: 0,
            top: 0,
            imageURL: futureImg.src
        }
    })

    slices.forEach((slice: any, index: number) => {
        let a1 = index*100/SLICE_NUMS;
        let b1 = index*100/SLICE_NUMS + 100/SLICE_NUMS;

        gsap.set(slice, {
            clipPath: SLICE_DIRECTION === 'vertical' ? 
                `polygon(${a1}% 0%, ${b1}% 0%, ${b1}% 100%, ${a1}% 100%)` :
                `polygon(0% ${a1}%, 100% ${a1}%, 100% ${b1}%, 0% ${b1}%)`
        });
        const isVertical = SLICE_DIRECTION === 'vertical';
        gsap.set(slice, { [isVertical ? 'left' : 'top']: index*-1 });
    })

    const cardImgRef = useRef<HTMLDivElement>(null)
    const cardImgWrapRef = useRef<HTMLDivElement>(null)
    const dateRef = useRef<HTMLSpanElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const linkRef = useRef<HTMLAnchorElement>(null)
    const dateText = "02/18/2074"
    const titleText = "Code CR-4519: Anomaly Detection in Array"
    const linkText = "Read the article"
    

    const shuffleChars = (arr: HTMLSpanElement[]) => {
        arr.forEach((char: HTMLSpanElement, position: number) => {
            if(char.textContent?.trim() !== "") {
                gsap.killTweensOf(char);
                gsap.fromTo(char, {
                    opacity: 0
                }, {
                    duration: 0.03,
                    innerHTML: () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
                    repeat: 3,
                    repeatRefresh: true,
                    opacity: 1,
                    repeatDelay: 0.05,
                    onComplete: () => {gsap.set(char, {innerHTML: char.dataset.initial, delay: 0.03})}
                })
            }
            
        });
    }
    
    const handleMouseEnter = () => {
        if(!cardImgRef.current || !cardImgWrapRef.current) {
            return;
        }
        const isVertical = SLICE_DIRECTION === 'vertical';
        const imgDom = cardImgRef.current;
        const imgWrap = cardImgWrapRef.current;
        const sliceDoms = imgWrap.children;
        gsap
        .timeline({
            defaults: {
                duration: 0.5,
                ease: "power3.inOut"
            }
        })
        .addLabel('start', 0)
        .fromTo(imgDom, {
            [isVertical ? 'yPercent' : 'xPercent']: 100,
            opacity: 0
        }, {
            [isVertical ? 'yPercent' : 'xPercent']: 0,
            opacity: 1
        }, 'start')
        .fromTo(imgWrap, {
            [isVertical ? 'yPercent' : 'xPercent']: -100
        }, {
            [isVertical ? 'yPercent' : 'xPercent']: 0
        }, 'start')
        .fromTo(sliceDoms, {
            [isVertical ? 'yPercent' : 'xPercent']: (pos: number) => pos % 2 ? gsap.utils.random(-75, -25) : gsap.utils.random(25, 75)
        }, {
            [isVertical ? 'yPercent' : 'xPercent']: 0
        }, 'start');

        if(dateRef.current) shuffleChars(Array.from(dateRef.current.children) as HTMLSpanElement[])
        if(titleRef.current) shuffleChars(Array.from(titleRef.current.children) as HTMLSpanElement[])
        if(linkRef.current) shuffleChars(Array.from(linkRef.current.children) as HTMLSpanElement[])

    }

    const handleMouseLeave = () => {
        if(!cardImgRef.current || !cardImgWrapRef.current) {
            return;
        }

        const isVertical = SLICE_DIRECTION === 'vertical';
        const imgDom = cardImgRef.current;
        const imgWrap = cardImgWrapRef.current;
        const sliceDoms = imgWrap.children;
        gsap
        .timeline({
            defaults: {
                duration: 0.5,
                ease: "power3.inOut"
            }
        })
        .addLabel('start', 0)
        .to(imgDom, {
            [isVertical ? 'yPercent' : 'xPercent']: 100,
            opacity: 0
        }, 'start')
        .to(imgWrap, {
            [isVertical ? 'yPercent' : 'xPercent']: -100
        }, 'start')
        .to(sliceDoms, {
            [isVertical ? 'yPercent' : 'xPercent']: (pos: number) => pos % 2 ? gsap.utils.random(-75, 25) : gsap.utils.random(25, 75)
        }, 'start')
    }

    return (
        <div className='bg-slate-900 text-white overflow-hidden relative grid-item' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className='w-full aspect-square bg-cover bg-center relative inset-0 overflow-hidden card-img opacity-0'
                style={{backgroundImage: `url("${futureImg.src}")`}}
                ref={cardImgRef}
                >
                <div className="absolute inset-0 overflow-hidden card__img-wrap" ref={cardImgWrapRef}>
                    {
                        slices.map((item, index) => {
                            return (
                                <div className="overflow-hidden absolute inset-0 bg-cover bg-center card__img-inner" 
                                style={{backgroundImage:`url("${item.imageURL}")`, clipPath: item.clipPath, left: item.left, top: item.top}}  
                                key={index}>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='absolute inset-0 p-10 grid card-text'>
                <span className="flex content-center items-center relative card__date" ref={dateRef}>
                    {
                        dateText.split("").map((item, index) => {
                            return (
                                <span key={index} data-initial={item}>
                                    {item}
                                </span>
                            )
                        })
                    }
                </span>
                <h2 className="font-bold mt-4 card__title" ref={titleRef}>
                    {
                        titleText.split("").map((item, index) => {
                            return (
                                <span key={index} data-initial={item}>
                                    {item}
                                </span>
                            )
                        })
                    }
                </h2>
                <div className='flex items-end'>
                    <a href="#" className=" text-sm card__link" ref={linkRef}>
                        {
                            linkText.split("").map((item, index) => {
                                return (
                                    <span key={index} data-initial={item}>
                                        {item}
                                    </span>
                                )
                            })
                        }
                    </a>
                </div>
            </div>
        </div>
  )
}
