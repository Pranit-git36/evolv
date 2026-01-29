// export default function MVPLab() {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold">MVP Lab</h1>

//       <div className="mt-8 grid gap-6">

//         <div className="border border-gray-800 p-4 rounded">
//           <h2 className="font-bold">StackRoute</h2>
//           <p className="text-gray-400 mt-2">
//             AI-powered SaaS stack generator for developers.
//           </p>
//           <p className="text-sm text-gray-500 mt-1">Status: Paused</p>
//         </div>

//       </div>
//     </div>
//   );
// }

import MVPCard from "../components/MVPCard";

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
        {mvps.map((mvp, index) => (
          <MVPCard
            key={index}
            title={mvp.title}
            description={mvp.description}
            status={mvp.status}
          />
        ))}
      </div>
    </div>
  );
}
