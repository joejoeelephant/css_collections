'use client'
import React, {useState, useEffect, useRef} from 'react'
import './style.css'

const CLOUD_WIDTH = 320;
const TEXT_NUMS = 220;

const getContent = () => {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const charArr = chars.split('')
  const length = charArr.length
  return charArr[Math.floor(Math.random() * length)]
}

class TextElement {
  x: number
  count: number
  width: number
  isfinished: boolean
  content: string
  fontSize: number
  delay: number
  constructor(width: number) {
    this.x = 40 + Math.floor(Math.random() * (width - 80));
    this.width = width
    this.count = 0
    this.content = getContent()
    this.isfinished = false
    this.delay = (Math.random()*20)
    this.fontSize = 16 + Math.floor(Math.random() * 8)
  }

  update() {
    if(this.count > 3 + this.delay) {
      this.isfinished = true;
      this.x = 40 + Math.floor(Math.random() * (this.width - 80));
      this.delay = (Math.random()*20)
      this.count = 0
      return;
    }
    this.isfinished = false;
    this.count++  
  }
}

export default function Page() {

  const [textElements, setTextElements] = useState<TextElement[]>([]);

   // 1. Set up a ref
   const textElementsRef = useRef<TextElement[]>([]);
  
   // 2. Update the ref every time textElements changes
   useEffect(() => {
     textElementsRef.current = textElements;
   }, [textElements]);

   useEffect(() => {
    const elements = Array.from(
      { length: TEXT_NUMS },
      () => new TextElement(CLOUD_WIDTH)
    );
    setTextElements(elements);

    const intervalId = setInterval(() => {
      // 3. Use the ref within your interval
      textElementsRef.current.forEach(el => el.update());
      setTextElements(prev => [...prev])
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='min-h-screen flex justify-center items-center bg-slate-900'>
        <div className="h-[320px] w-full flex justify-center border-b-2 border-b-slate-800 cloud-container">
          <div className="cloud w-[320px] h-[100px] bg-white rounded-full relative z-50">
            {
              textElements.map((el, index) => {
                if(!el.isfinished) {
                  return (
                    <div className="text falling absolute" key={index} style={{left: `${el.x}px`, fontSize: `${el.fontSize}px`, animationDelay: `${el.delay}s`}}>
                      {el.content}
                    </div>
                  )
                }else {
                  return (
                    <div className="text" key={index} style={{left: `${el.x}px`,fontSize: `${el.fontSize}px`,animationDelay: `${el.delay}s`}}>
                      {el.content}
                    </div>
                  )
                }
              })
            }
          </div>
        </div>
    </div>
  )
}
