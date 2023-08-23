import React, {useState, useRef, useEffect} from 'react'
import './style.css'
import Card from './card'

export default function Page() {

    return (
        <div className='min-h-screen bg-slate-950 flex flex-col justify-center items-center'>
            <div className='grid gap-1 bg-slate-800 border-2 border-slate-800 grid-cols-3 w-11/12 grid-flow-row-dense'>
                <Card></Card>
                <Card></Card>
                <Card></Card>

            </div>
        </div>
  )
}
