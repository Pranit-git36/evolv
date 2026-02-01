"use client"
import {useState} from "react";
export default function StackRouteMini(){
    const [idea,setIdea]=useState("")
    const [stack, setStack] = useState<string[] | null>(null);
    const [loading,setLoading]=useState(false)
    return(<div>
    <h1 className="text-3xl font-bold ">StackRoute Mini</h1>
    <p className="text-gray-500 mt-2">Basic working version of StackRoute.</p>
    <textarea 
    placeholder="Describe your project here...."
    className="mt-6 w-full bg-black border-gray-800 p-3 border rounded"
    value={idea} onChange={(e)=>setIdea(e.target.value)}/>
    <div className="mt-4 flex gap-4">
    <button className="mt-4 px-4 py-2 rounded border border-gray-800 hover:bg-gray-900 disabled:opacity-50"
 onClick={()=>{setLoading(true);setTimeout(()=>{if(idea.toLowerCase().includes("saas")){
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
)}},2000)}}>Generate Stack</button>
    {stack && (
  <div className="mt-6 flex flex-col gap-2">
    {stack.map((item, index) => (
      <p key={index}>{item}</p>
    ))}
  </div>
)}

    <button className="mt-4 px-4 py-2 rounded border border-gray-800 hover:bg-gray-900 disabled:opacity-50" onClick={()=>{setIdea("");setStack(null)}}>Clear</button>
    </div></div>)
}
