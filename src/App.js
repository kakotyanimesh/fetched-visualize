import React, { useState } from 'react';
import { FaGithub } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";

import './App.css';

function App() {
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState(null)
  const [err, seterr] = useState(null)
  const [dataclear, setDataClear] = useState(false)
  const [url, seturl] = useState("")
  
  const handleClick = async () => {
    setIsFetching(true)
    seterr(null) // for clearing my previous errors
    setDataClear(false)
    try {
      const response = await fetch(`${url}`)

      const datas = await response.json()

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setData(datas)
    } catch (error) {
      console.log(`error is ${error}`);
      seterr(error.message)
    } finally{
      setIsFetching(false); 
    }
  }

  const handleClearData = () => {
    setData(null)
    setDataClear(true)
    // isFetching(false)
  }

  return (
    <div>

    <nav className='flex justify-between m-4'>
      <div>
          <a href='https://bento.me/animeshkakoty' target='_blank'><h1 className='bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text font-[1000] text-lg'>DataSnap</h1>
          </a>
      </div>
      <div className='flex space-x-4'>
        
        <a href='https://github.com/kakotyanimesh' target='_blank' className='text-[1.5rem]'><FaGithub /></a>
        <a href='https://x.com/_animeshkakoty' target='_blank' className='text-[1.5rem]'><FaTwitterSquare /></a>
        <a href="https://bento.me/animeshkakoty" target='_blank' className='text-[1.5rem]'><FiMessageCircle /></a>
        
      </div>
      </nav>  
    <div className="flex justify-center bg-white ">
      <h1 className="text-3xl font-bold text-blue-900 items-center mt-10 p-4 ">
        Fetch Your Data  
      </h1>
    </div>
    <div className=" p-4 w-f rounded flex flex-col items-center">
      <h1 className="flex justify-center text-blue-900 text-lg font-blod font-sans text-center uppercase md:font-mono">
      I know this isn’t a great project, but until yesterday, I had zero knowledge about React and Tailwind CSS and today i am still noob
        </h1>
        
        <div>
      
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        </div>
        <input
          id="url"
          name="url"
          type="text"
          value={url}
          onChange={(e) => seturl(e.target.value)}
          placeholder="enter Uniform Resource Locator"
          className="block w-96 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-6"
        />
        
      </div>
    </div>
        
        <button
          className="rounded-lg bg-gray-900 py-3 px-6 text-center w-auto mt-4 align-middle font-sans text-xs font-bold uppercase text-white"
          type="button"
          onClick={handleClick}

        >
          fetch data
        </button>
        <button
          className="rounded-lg bg-gray-900 py-3 px-6 text-center w-auto mt-4 align-middle font-sans text-xs font-bold uppercase text-white"
          type="button"
          onClick={handleClearData}

        >
          clear data 
        </button>

        <div className='text-center py-10 text-lg font-bold text-pink-600'>
        <div>
        { dataclear ? (
          <p>data cleared successfully</p>
        ) :err ? (
          <p>Error : {err}</p>
        )
        : isFetching ? (
          <p>data is fetching</p>
        )
        
          : data ? (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          ): (
            <p>click on fetch to display data</p>
          )}
          </div>
        </div>
        
        

    </div>
    </div>
  );
}

export default App;
