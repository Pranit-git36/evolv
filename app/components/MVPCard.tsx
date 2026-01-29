type MVPCardProps = {
  title: string;
  description: string;
  status: string;
};

export default function MVPCard({ title, description, status }: MVPCardProps) {
  return (
    <div className="border border-gray-800 p-4 rounded">
      <h2 className="font-bold">{title}</h2>
      <p className="text-gray-400 mt-2">{description}</p>
      <p className="text-sm text-gray-500 mt-1">Status: {status}</p>
    </div>
  );
}
