import React, {useEffect, useRef} from 'react'
import './style.css'
import Sections from './Sections'
export default function Page() {
    return (
        <div className='min-h-screen bg-slate-950 relative' >
            <Sections></Sections>
        </div>
    )
}
