'use client'
import React, {useState} from 'react'
import './style.css'
export default function Page() {
    const [templateCols, setTemplateCols] = useState(["1fr","1fr","1fr","1fr","1fr"])

    const mouseOverHandle = (key: number) => {
        setTemplateCols((prev) => {
            const temp =  [...prev].map(item => '0.5fr')
            temp[key] = "2fr"
            return temp
        })
    }

    return (
        <div className='min-h-screen bg-slate-950 flex justify-center items-center'>
            <div className='relative w-4/5 grid grid-flow-row-dense gap-3 transition-all cars-container' style={{gridTemplateColumns: templateCols.join(' ')}}>
                {
                    Array.from({length: 5}).map((ite, index) => {
                        return (
                            <div key={index} 
                            className='h-[500px] bg-center bg-cover grayscale transition duration-300 hover:grayscale-0 brightness-125 card-item relative even:translate-y-3 odd:-translate-y-3' 
                            style={{backgroundImage: `url("/card${index+1}.jpeg")`}}
                            onMouseOver={() => {mouseOverHandle(index)}}
                            onMouseLeave={() => {setTemplateCols(["1fr","1fr","1fr","1fr","1fr"])}}
                            ></div>
                        )
                    })
                }
            </div>
        </div>
    )
}
