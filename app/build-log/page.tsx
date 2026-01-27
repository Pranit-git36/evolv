export default function BuildLog() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Build Log</h1>

      <div className="mt-8 border border-gray-800 p-4 rounded">
        <p className="text-sm text-gray-500">Week 1</p>

        <ul className="mt-2 text-gray-400 list-disc ml-6">
          <li>Today I deployed EVOLV v1</li>
          <li>Learnt Next.js routing</li>
          <li>Fixed npm + Windows issues</li>
          <li>Understood layouts and components</li>
        </ul>
      </div>
    </div>
  );
}
