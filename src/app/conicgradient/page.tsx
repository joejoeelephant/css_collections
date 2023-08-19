import React from 'react'
import './style.css'
export default function Page() {
  return (
    <div className='min-h-screen bg-slate-900 flex gap-4 flex-col justify-center items-center'>
        <div className='w-80 h-80 rounded-full loading relative' style={{"--color": "#f00"} as React.CSSProperties}>
            <span className='block rounded-full w-2 h-2 absolute loading-dot'></span>
        </div>

        <div className='w-64 h-24 text-white flex justify-center items-center font-bold animate-button relative' style={{"--color2": "#0f0", "--color1": "#00f"} as React.CSSProperties}>
            <span className='relative z-10 text-2xl'>
                Button
            </span>
        </div>

        <div className='w-80 h-80 rounded-full loading2 relative' style={{"--color1": "#f00", "--color2": "#00f"} as React.CSSProperties}>
            <span></span>
        </div>
    </div>
  )
}
