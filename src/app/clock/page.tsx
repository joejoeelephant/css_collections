'use client'
import React, {useState, useEffect} from 'react'
import './style.css'

export default function Page() {
    const [hourAngle, setHourAngle] = useState(0)
    const [minuteAngle, setMinuteAngle] = useState(0)
    const [secondAngle, setSecondAngle] = useState(0)
    const [timeData, setTimeData] = useState<{seconds: number, minutes: number, hours: number}>({seconds: 0, minutes: 0, hours: 0})

    useEffect(() => {
        const timerId = setInterval(() => {
            const time = new Date();
            const hour = time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
            const minute = time.getMinutes();
            const second = time.getSeconds();

            setHourAngle(hour * 30 + 30 * (minute / 60))
            setMinuteAngle((minute * 6) + 6 * (second / 60))
            setSecondAngle((second * 6))

            setTimeData({seconds: second, minutes: minute, hours: time.getHours()})

        }, 1000)
        return () => clearInterval(timerId);
    }, [])

    return (
        <div className='min-h-screen  flex justify-center items-center bg-slate-500'>
            <div className='w-[450px] h-[550px] relative flex justify-center items-center clock'>
                <div className="numbers">
                    <div className='circle' style={{transform: `rotate(${secondAngle}deg)`}}><i></i></div>
                    <div className='circle' style={{transform: `rotate(${minuteAngle}deg) `}}><i></i></div>
                    <div className='circle' style={{transform: `rotate(${hourAngle}deg)`}}><i></i></div>
                    {
                        Array.from({length: 12}).map((item, index) => {
                            return (
                                <span key={index} style={{'--i': index + ''} as React.CSSProperties}><b>{index == 0 ? 12 : index}</b></span>
                            )
                        })
                    }
                </div>
                <div className='absolute bottom-10 flex gap-1 items-center text-3xl py-3 px-5 time-digit'>
                    <div className=' text-green-400 '>
                        {(timeData.hours < 10 || timeData.hours - 12 < 10) ? "0" : ""}{timeData.hours > 12 ? timeData.hours - 12 : timeData.hours}
                    </div>
                    <span className='text-white font-bold'>
                        :
                    </span>
                    <div className='text-blue-400 '>
                        {timeData.minutes < 10 ? 0 : ""}{timeData.minutes}
                    </div>
                    <span className='text-white font-bold blink'>
                        :
                    </span>
                    <div className=' text-rose-600'>
                        {timeData.seconds < 10 ? 0 : ""}{timeData.seconds}
                    </div>
                    <div className=' text-slate-400 '>
                        {(timeData.hours > 12) ? "PM" : "AM"}
                    </div>
                </div>
            </div>
        </div>
    )
}
