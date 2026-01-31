"use client"
import {useState} from "react";
export default function StackRouteMini(){
    const [idea,setIdea]=useState("")
    const [stack,setStack]=useState(null)
    return(<div>
    <h1 className="text-3xl font-bold ">StackRoute Mini</h1>
    <p className="text-gray-500 mt-2">Basic working version of StackRoute.</p>
    <textarea 
    placeholder="Describe your project here...."
    className="mt-6 w-full bg-black border-gray-800 p-3 border rounded"
    value={idea} onChange={(e)=>setIdea(e.target.value)}/>
    <button onClick={()=>{if(idea.toLowerCase().includes("saas")){
                            setStack([
  "Frontend: Next.js + Tailwind",
  "Backend: Node.js",
  "Database: Supabase",
  "Auth: Clerk",
  "Deployment: Vercel"
]
)
}else{setStack([
  "Frontend: React",
  "Backend: Express",
  "Database: MongoDB",
  "Hosting: Render",
  "Deployment: Netlify"
]
)}}}>Generate Stack</button>
    {stack && stack.map((item,index)=>(<p key={index}>{item}</p>))}
    </div>)
}
