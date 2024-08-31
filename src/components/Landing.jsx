import React from 'react'
import { Link } from 'react-router-dom';


const Landing = () => {
  return (
    <div className='flex justify-center m-48'>
      <div className='flex flex-col p-10 items-center justify-center'>
        <div className='flex'>
          <img className='w-20 mx-3' src="/logo.png" alt="logo" />
          <h1 className='font-sans font-bold text-7xl'>BUILDUP</h1>
        </div>
        <div className='p-10 w-[39rem] flex items-center justify-center text-center'>
          <p>Upload your files, and let Build Up transform them into powerful study tools, flashcards, and quizzes at your fingertips</p>
        </div>
        <Link className='m-8 border-2 px-8 py-3 rounded-3xl border-black' to="/home">Start now</Link>
      </div>
    </div>
  )
}

export default Landing
