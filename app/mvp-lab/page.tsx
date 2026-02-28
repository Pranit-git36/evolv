import MVPCard from "../components/MVPCard";
import Link from "next/link";
const mvps = [
  {
    title: "StackRoute",
    description: "AI-powered SaaS stack generator for developers.",
    status: "Active",
  },
  {
    title: "EVOLV",
    description: "Personal builder platform documenting my journey.",
    status: "Active",
  },
  {
    title: "ErrorBuddy",
    description: "Error explanation and solution providing platform for developers",
    status: "Upcoming"

  },
  {
    title: "Skillio",
    description: "Resume data extraction , simplified for HRs.",
    status: "Not Started"

  }
];

export default function MVPLab() {
  return (
    <div>
      <h1 className="text-3xl font-bold">MVP Lab</h1>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
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
