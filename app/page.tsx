export default function Home() {
  return (
    <div>
      <section className="mt-10">
  <h1 className="text-4xl font-bold">
    Building in public. Shipping real MVPs.
  </h1>

  <p className="mt-4 text-gray-500 max-w-xl">
    EVOLV is my personal builder lab where I turn ideas into working products and document the journey.
  </p>

  <div className="mt-6 flex gap-4">
    <a href="/mvp-lab" className="px-4 py-2 border border-gray-800 rounded hover:bg-gray-900">
      Explore MVP Lab
    </a>

    <a href="/stackroute" className="px-4 py-2 border border-gray-800 rounded hover:bg-gray-900">
      Try StackRoute
    </a>
  </div>
</section>
<section className="mt-16">
  <h2 className="text-2xl font-semibold">What I’m Building</h2>

  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="border border-gray-800 rounded p-4">
      <h3 className="font-medium">StackRoute Mini</h3>
      <p className="text-gray-500 mt-1">
        Smart tech stack recommendations based on project type.
      </p>
      <span className="inline-block mt-2 text-green-500 text-sm">Live</span>
    </div>

    <div className="border border-gray-800 rounded p-4 opacity-60">
      <h3 className="font-medium">Next MVP</h3>
      <p className="text-gray-500 mt-1">
        Exploring the next problem to solve.
      </p>
      <span className="inline-block mt-2 text-yellow-500 text-sm">Coming soon</span>
    </div>
  </div>
</section>
<section className="mt-16">
  <h2 className="text-2xl font-semibold">Tech Stack</h2>

  <p className="text-gray-500 mt-2">
    Tools and technologies I’m actively building with.
  </p>

  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
    {[
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Python",
      "MongoDB / Supabase",
      "Vercel",
    ].map((tech, index) => (
      <div
        key={index}
        className="border border-gray-800 rounded p-3 text-center hover:bg-gray-900 transition"
      >
        {tech}
      </div>
    ))}
  </div>
</section>

    </div>
  );
}
