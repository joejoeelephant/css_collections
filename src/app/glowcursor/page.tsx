'use client'
import React, { useState, useRef, useEffect } from 'react'
import './styles.css'

export default function GlowCursor() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [cursorPosition, setCursorPosition] = useState<{x: number, y: number}>({x:0, y:0})
  const [backgroundPosition, setBackgroundPosition] = useState<{x: number, y: number}>({x:0, y:0})

  useEffect(() => {
    const {x, y} = cursorPosition
    setBackgroundPosition({x, y})
  }, [cursorPosition])
  
  const handleMouseMove = (event: React.MouseEvent) => {
    setCursorPosition({
      x: event.clientX,
      y: event.clientY,
    });
  }
  
  return (
    <div className='min-h-screen grid-background relative cursor-none' 
      onMouseMove={handleMouseMove} ref={containerRef} 
      style={{backgroundPositionX: backgroundPosition.x/-4+'px', backgroundPositionY: backgroundPosition.y/-4 + 'px'}}    
    >
      <div className='text-white'>{cursorPosition.x}||{cursorPosition.y}</div>

      <div ref={cursorRef} 
      className='
        fixed border-t-4
        border-t-green-400 border-l-4 
        border-l-green-400
        w-7 h-7 origin-center 
        rotate-12 -translate-x-px 
        translate-y-1 hover:scale-125 
        transition-transform
        duration-100
        pointer-events-none
        cursor
        after:bg-green-400
      '
      style={{top: cursorPosition.y + 'px', left: cursorPosition.x + 'px'}}
      >
      </div>
    </div>
  )
}
