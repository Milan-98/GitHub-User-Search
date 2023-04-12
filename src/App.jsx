import React, { useState } from 'react';

const API_URL = "https://api.github.com"

async function fetchQuery(query)
{
  let response = await fetch(`${API_URL}/search/users?q=${query}`);
  let data = await response.json();
  return data;
}

export default function App() {
  const [query,setQuery] = useState('');
  const [data,setData] = useState([]);

  async function sendQuery(query)
  {
    let response = await fetchQuery(query);
    setData(response.items);    
  }
  


  return (
    <div className='min-h-screen max-h-fit bg-slate-600 flex flex-col '>

      <div className='h-10 mt-10 mx-auto'> 
         <input type="text" onChange={(e)=> {
       let inputData = e.target.value;
        setQuery(inputData)}} value={query} className={`h-8 md:w-[40rem] md:font-medium md:h-12 pl-4 rounded-3xl `} placeholder='Enter Your GitHub Id' />
         
         <button onClick={()=>{
          if(query.length>0)
          {
            sendQuery(query)
            document.querySelector(".invalid").textContent="";
          }
            else{
              document.querySelector(".invalid").textContent="Enter Valid Input"
            }
          }} className='rounded-2xl px-3 ml-3 md:px-6 py-1 md:py-2 font-medium bg-sky-700'>Search</button> 
      </div>
       <p className='invalid text-red-600 ml-9 md:ml-80 md:mt-3 md:font-semibold '></p>
      <ul className='h-auto overflow-auto'>
        {

         data.map((i)=>{
          return(
            <li key={i.id} className='flex border-2 border-slate-900 border-solid mx-2 md:mx-32 my-3 rounded-full bg-slate-500  '>
              <img className='w-24 md:w-28 rounded-full cursor-pointer' src={i.avatar_url}  alt="User_Image" />
              <span className='flex flex-col  ml-6 md:ml-16 mt-4 md:mt-5 text-3xl md:text-4xl font-medium md:font-semibold text-slate-300 '>
                {i.login} 
              <a className='text-stone-950 mt-2 text-sm font-thin md:font-medium' href={i.html_url}>GitHub Profile  </a> 
              </span>
            </li>
         )})
        }

      </ul>

    </div>
  )
}