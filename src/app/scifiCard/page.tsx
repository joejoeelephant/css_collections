import React from 'react'
import CodeIcon from '@mui/icons-material/Code';
import './style.css'
export default function Page() {
  return (
    <div className='min-h-screen bg-slate-900 flex justify-center items-center'>
        <div className='grid grid-cols-3 w-10/12 gap-5 card-container'>
           <div className='min-h-[480px] flex justify-center items-center flex-col text-slate-900 cursor-pointer relative card-item' style={{"--color": "aqua"} as React.CSSProperties}>
                <span className='absolute  text-4xl card-icon'>
                    <CodeIcon className='w-36 h-36 text-slate-950'></CodeIcon>
                </span>
                <h2 className='text-4xl font-bold h-1/2 flex flex-col justify-between items-center'>
                    01
                    <br></br>
                    <small className="text-xl">Design</small>
                </h2>  
                <div className='absolute inset-5 clips'>
                    <span></span><span></span><span></span>
                </div>
           </div>
        </div>
    </div>
  )
}
