import React from 'react'
import './style.css'
export default function Page() {
  return (
    <div className='min-h-screen bg-slate-700 flex justify-center items-center'>
        <div className='w-[400px] h-[400px] login-box relative rounded-2xl'>
            <form action="#" className='flex flex-col justify-center items-center relative gap-5 px-10 z-10 pt-12'>
                <h2 className='text-white font-bold text-2xl'>Sign In</h2>
                <input className='relative bg-slate-600 w-10/12 py-3 px-4 border-0 outline-none rounded-lg text-white tracking-wider' type="text" placeholder='username' />
                <input className='relative bg-slate-600 w-10/12 py-3 px-4 border-0 outline-none rounded-lg text-white tracking-wider' type="text" placeholder='password' />
                <input 
                    className='relative bg-slate-50 flex justify-center items-center text-slate-800 font-bold w-10/12 rounded-lg py-3 px-4 hover:text-white hover:bg-rose-800 hover:cursor-pointer'
                    type="submit" value={'login'} />
                <div className='w-10/12 flex justify-between'>
                    <a href="#" className='text-slate-400 text-sm '>Forget Password</a>
                    <a href="#" className='text-slate-400 text-sm '>Sign Up</a>
                </div>
            </form>
        </div>
    </div>
  )
}
