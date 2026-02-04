"use client";
import { useState } from "react";

export default function StackRouteMini() {
  const [idea, setIdea] = useState("");
  const [stack, setStack] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [projectType,setprojectType]=useState("")
  const examples = ["AI Chatbot", "Mobile App", "Portfolio Website", "SaaS Dashboard"];

  return (
    <div>
      <h1 className="text-3xl font-bold">StackRoute Mini</h1>
      <p className="text-gray-500 mt-2">Basic working version of StackRoute.</p>

      <textarea
        placeholder="Describe your project here...."
        className="mt-6 w-full bg-black border-gray-800 p-3 border rounded hover:border-yellow-400"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />

      {/* Error message (right under textarea) */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <p className="text-gray-500 text-sm mt-2">
  Examples (you can type anything):
</p>

      <div className="mt-1 flex flex-wrap gap-2 py-5">
  {examples.map((ex, i) => (
    <button
      key={i}
      onClick={() => {
        setIdea(ex);
        setError("");
      }}
      className="text-sm px-3 py-1 border border-gray-800 rounded hover:bg-blue-900 transition"
    >
      {ex}
    </button>
  ))}
</div>

      {/* Buttons */}
      <div className="mt-2 flex gap-4">
        <button
          className="px-4 py-2 rounded border border-gray-800 hover:bg-green-900 disabled:opacity-50"
          disabled={loading}
          onClick={() => {
            if (idea.trim() === "") {
              setError("Describe your project first");
              return;
            }

            setError("");
            setLoading(true);

            setTimeout(() => {const ideaLower=idea.toLowerCase();
              if (ideaLower.includes("saas")||ideaLower.includes("software as a service")||ideaLower.includes("service")){
                setStack([
                  "Frontend: Next.js + Tailwind",
                  "Backend: Node.js",
                  "Database: Supabase",
                  "Auth: Clerk",
                  "Deployment: Vercel",
                ]);
                setprojectType("SaaS Product");
              } else if (ideaLower.includes("mobile")||ideaLower.includes("ios")||ideaLower.includes("android")||ideaLower.includes("mobile app")){
                setStack([
                  "Frontend: React Native",
                  "Framework: Expo",
                  "Backend: Firebase",
                  "Auth: Firebase Auth",
                  "Deployment: Play Store/App Store",
                ]);
                setprojectType("Mobile Application")
              } else if (ideaLower.includes(" ai ")||ideaLower.includes("ml")||ideaLower.includes("machine learning")||ideaLower.includes("chatbot")||ideaLower.includes("artificial intelligence")){
                setStack([
                "Language: Python",
                "Backend: FastAPI",
                "AI API: OpenAI",
                "Vector DB: Pinecone",
                "Deployment: Railway"
                ]);
                setprojectType("Artificial Intelligence/Machine Learning Project")
              } else if (ideaLower.includes("portfolio")||ideaLower.includes("profile")||ideaLower.includes("resume")){
                setStack([
                  "Framework: Next.js",
                  "Styling: Tailwind CSS",
                  "Hosting: Vercel",
                  "Forms: Formspree",
                  "Analytics: Vercel Analytics"
                ]);
                setprojectType("Personal Portfolio Website")
              }  else if (ideaLower.includes("web app")||ideaLower.includes("website")||ideaLower.includes("platform")){
                setStack([
                  "Frontend: React",
                  "Backend: Express",
                  "Database: MongoDB",
                  "Hosting: Render",
                  "Deployment: Netlify"
                ]);
                setprojectType("General Web Application")
              }else if (ideaLower.includes("ecommerce")||ideaLower.includes("store")||ideaLower.includes("shop")||ideaLower.includes("e-commerce")){
                setStack([
                  "Frontend: Next.js",
                  "Backend: Node.js",
                  "Database: MongoDB",
                  "Payments: Stripe",
                  "Deployment: Vercel"
                ]);
                setprojectType("E-Commerce Site")
              }else if (ideaLower.includes("api")||ideaLower.includes("backend")){
                setStack([
                  "Runtime: Node.js",
                  "Framework: Express",
                  "Database: PostgreSQL",
                  "Auth: JWT",
                  "Deployment: Railway"
                ]);
                setprojectType("API/Backend Software")
              }else if (ideaLower.includes("extension")||ideaLower.includes("chrome")||ideaLower.includes("chrome extension")){
                setStack([
                  "Frontend: Vanilla JS / React",
                  "Styling: CSS",
                  "Storage: Chrome Storage",
                  "Build Tool: Vite",
                  "Distribution: Chrome Web Store"
                ]);
                setprojectType("Chrome Extension/Tool")
              }else if (ideaLower.includes("data analytics")||ideaLower.includes("statistics")||ideaLower.includes("dashboard")||ideaLower.includes("data")){
                setStack([
                  "Backend: Python",
                  "Framework: Streamlit",
                  "Database: PostgreSQL",
                  "Charts: Plotly",
                  "Deployment: Streamlit Cloud"
                ]);
                setprojectType("Data/Analytics App")
              }else if (ideaLower.includes("mvp")||ideaLower.includes("startup")||ideaLower.includes("prototype")){
                setStack([
                  "Frontend: Next.js",
                  "Backend: Node.js",
                  "Database: Supabase",
                  "Auth: Clerk",
                  "Deployment: Vercel"
                ]);
                setprojectType("MVP/Startup Prototype")
              }else {
                setError("Could not detect project type. Try keywords like: saas , mobile app, ai, e-commerce, portfolio");
                setStack(null);
              }
              setLoading(false);
            }, 2000);
          }}
        >
          {loading ? "Generating..." : "Generate Stack"}
        </button>

        {stack && (
          <button
            className="px-4 py-2 rounded border border-gray-800 hover:bg-red-900"
            onClick={() => {
              setIdea("");
              setStack(null);
              setError("");
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Stack Output */}
      {projectType && (<div className="mt-8 border-2 border-gray-500 rounded p-2 hover:border-blue-500 transition"><p>Detected: {projectType}</p></div>)}
      {stack && (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stack.map((item, index) => (
            <div key={index} className="mt-1 border-2 border-gray-500 rounded p-2 hover:border-green-500 transition"><p>{item}</p></div>
          ))}
        </div>
      )}
      {!stack && !loading && (
        <p className="mt-6 text-gray-500">
          Describe your project above to generate a tech stack.
        </p>
      )}
    </div>
  );
}
