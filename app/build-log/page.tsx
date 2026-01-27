export default function BuildLog() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Build Log</h1>

      <div className="mt-8 border border-gray-800 p-4 rounded">
        <p className="text-sm text-gray-500">Week 1</p>

        <ul className="mt-2 text-gray-400 list-disc ml-6">
          <li>Setup Next.js + Tailwind</li>
          <li>Created EVOLV structure</li>
          <li>Learned routing and layouts</li>
          <li>Faced npm issues and fixed them</li>
        </ul>
      </div>
    </div>
  );
}
