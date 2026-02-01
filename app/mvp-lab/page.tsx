import MVPCard from "../components/MVPCard";
import Link from "next/link";
const mvps = [
  {
    title: "StackRoute",
    description: "AI-powered SaaS stack generator for developers.",
    status: "Paused",
  },
  {
    title: "EVOLV",
    description: "Personal builder platform documenting my journey.",
    status: "Active",
  },
  {
    title: "The AI Shop",
    description: "One site, multiple AI models for specific tasks.",
    status: "Not Started"

  }
];

export default function MVPLab() {
  return (
    <div>
      <h1 className="text-3xl font-bold">MVP Lab</h1>

      <div className="mt-8 grid gap-6">
        {mvps.map((mvp, index) => (mvp.title==='StackRoute'?(
          <Link key={index} href="/stackroute">
            <MVPCard key={index} title={mvp.title} description={mvp.description} status={mvp.status}/>
          </Link>
        ):(
          <MVPCard
            key={index}
            title={mvp.title}
            description={mvp.description}
            status={mvp.status}
          />
        )))}
      </div>
    </div>
  );
}
