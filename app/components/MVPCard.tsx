type MVPCardProps = {
  title: string;
  description: string;
  status: string;
};

export default function MVPCard({ title, description, status }: MVPCardProps) {
  return (
    <div className="group border border-gray-800 rounded-xl p-5 transition-all hover:-translate-y-1 hover:border-gray-600 hover:shadow-lg hover:shadow-green-500/10 cursor-pointer">
      <h3 className="text-lg font-medium group-hover:text-green-400 transition">{title}</h3>

      <p className="text-gray-400 mt-2">{description}</p>
      <span
  className={`inline-block mt-3 text-xs px-2 py-1 rounded border ${
    status === "Active"
      ? "text-green-500 border-green-500"
      : status === "Not Started"
      ? "text-yellow-500 border-yellow-500"
      : status === "Upcoming"
      ? "text-blue-500 border-blue-500"
      : "text-gray-400 border-gray-700"
  }`}
>
  {status}
</span>
      {/* <p className="text-sm text-gray-500 mt-1">Status: {status}</p> */}
    </div>
  );
}
