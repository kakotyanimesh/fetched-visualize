import React, { useState } from 'react';
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
      seterr(err.message)
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
    <div className="flex justify-center bg-white ">
      <h1 className="text-3xl font-bold text-blue-900 items-center mt-10 p-4 ">
        Fetched visualization
      </h1>
    </div>
    <div className=" p-4 w-f rounded flex flex-col items-center">
      <h1 className="flex justify-center text-blue-900 text-lg font-blod font-sans md:font-mono">
        let's fetched some user's data from a dummy server
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
          placeholder="enter user id"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

        <div className='text-center'>
        <div>
        { dataclear ? (
          <p>data cleared successfully</p>
        )
        : isFetching ? (
          <p>data is fetching</p>
        )
        
          : data ? (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          ) : (
            <p>Not yet fetched</p>
          )}
          </div>
        </div>
        
        

    </div>
    </div>
  );
}

export default App;
