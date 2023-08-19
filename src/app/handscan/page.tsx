import React from 'react'
import './style.css'
import hand1 from '../../../public/hand_01.png'
import hand2 from '../../../public/hand_02.png'
import lines from '../../../public/lines.png'
import points from '../../../public/points.png'
export default function Page() {
    return (
        <div className='min-h-screen flex justify-center items-center' style={{backgroundColor: "#111"}}>
            <div className='relative flex flex-col items-center '>
                <div className="relative w-[500px] h-[500px] bg-contain hand1" style={{backgroundImage: `url("${hand2.src}")`}}>
                    <div className="absolute top-0 left-0 w-full h-full hand2" style={{backgroundImage: `url("${hand1.src}")`}}></div>
                    <div className="absolute w-[500px] h-[500px] bg-contain lines" style={{backgroundImage: `url("${lines.src}")`}}></div>
                    <div className="absolute w-[500px] h-[500px] bg-contain points" style={{backgroundImage: `url("${points.src}")`}}></div>

                </div>
            </div>
        </div>
    )
}
