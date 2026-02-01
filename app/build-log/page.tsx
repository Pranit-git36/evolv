const logs = [
  {
    week: "Week 1",
    points: [
      "Deployed EVOLV v1",
      "Learned Next.js routing",
      "Understood layout and children",
      "Fixed npm + Windows issues",
      "Started EVOLV v2 planning",
    ],
  },
  {
    week: "Week 2",
    points: [
      "Built resuable MVP Card component",
      "Added dynamic MVP Lab",
      "Created Contact Page",
      "Practiced advanced debugging",
      "Shipped EVOLV v2",
      "Faced production deployment mismatch due to Vercel pointing to wrong GitHub repo. Debugged and fixed by reconnecting correct repository. Learned importance of single source of truth.",
      "StackRoute Mini v0 Shipped"
    ]
  },
  {
    week:"MVP Lab Architecture + StackRoute Mini Integration",
    points:[
      "Refactored Navigation Bar to Category Based Navigation",
      "Integrated StackRoute into MVP Lab",
      "Implemented Card Based Routing",
      "Deployed Updated Platform Structure"
    ]
  }
];

export default function BuildLog() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Build Log</h1>

      <div className="mt-8 grid gap-6">
        {logs.map((log, index) => (
          <div key={index} className="border border-gray-800 p-4 rounded">
            <p className="text-sm text-gray-500">{log.week}</p>

            <ul className="mt-2 text-gray-400 list-disc ml-6">
              {log.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
