import React, { useState } from 'react';
import './App.css';

function App() {
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState(null)
  const [err, seterr] = useState(null)
  
  const handleClick = async () => {
    setIsFetching(true)
    seterr(null) // for clearing my previous errors
    try {
      const response = await fetch("https://dummyjson.com/users")

      const data = await response.json()

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setData(data)
    } catch (error) {
      console.log(`error is ${error}`);
      seterr(err.message)
    } finally{
      setIsFetching(false); 
    }
  }

  return (
    <div>
    <div className="flex justify-center bg-white ">
      <h1 className="text-3xl font-bold text-blue-900 items-center mt-10 p-4 ">
        Fetched visualization
      </h1>
    </div>
    <div className=" p-4 w-f rounded flex flex-col items-center">
      <h1 className="flex justify-center text-blue-900 text-lg font-blod font-sans md:font-mono">
        let's fetched some user's data from a dummy server
        </h1>
        <button
          className="rounded-lg bg-gray-900 py-3 px-6 text-center w-auto mt-4 align-middle font-sans text-xs font-bold uppercase text-white"
          type="button"
          onClick={handleClick}

        >
          fetch data
        </button>

        {/* <div className="flex justify-between w-full mt-10">
            <div className="border-2 border-white-200 w-34 h-56"></div>
            <div className="border-2 border-white-200 w-1/3 h-56 mx-2"></div>
            <div className="border-2 border-white-200 w-1/3 h-56"></div>

        </div> */}

<div className="flex flex-col md:flex-row justify-between w-full p-4 mt-8 space-y-4 md:space-y-0 md:space-x-4">
          <div className="border-2 border-blue-900 w-full md:w-1/4 h-48">
          {<p>fetched code</p>}
          </div>
          <div className="border-2 border-blue-900 w-full md:w-1/4 h-48 text-center">
            
          </div>
          <div className="border-2 border-blue-900 w-full md:w-1/4 h-48">
          {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>No data available</p>}
          </div>
        </div>

    </div>
    </div>
  );
}

export default App;
