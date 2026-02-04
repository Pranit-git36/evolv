export default function About() {
  return (
    <div>
    <div className="mt-10 py-4">
      <h1 className="inline-block text-3xl font-bold border border-gray-800 rounded-lg px-4 py-2 hover:border-gray-500 hover:bg-gray-900 hover:shadow hover:shadow-green-500/10
 transition">
        Hi, I'm Pranit.
      </h1>


      <p className="mt-3 text-gray-400">
        I’m a computer science student building real MVPs in public through EVOLV.
      </p>
      <p className="mt-3 text-gray-400">
        EVOLV is my personal lab where I turn ideas into working products and learn by shipping.
      </p>
      <p className="mt-3 text-gray-400">
        I focus on practical product development — from frontend to deployment — experimenting with SaaS, AI tools, and startup-style MVPs.
      </p>
      <p className="mt-3 text-gray-400">
        EVOLV exists to document this journey: building, breaking, improving, and evolving.
      </p>
    </div>
    
    <div className="mt-10 py-4">
      <h2 className="inline-block text-2xl font-semibold border border-gray-800 rounded-md px-3 py-1 hover:border-gray-500 hover:bg-gray-900 transition">
        How I Work
      </h2>
      <p className="mt-4 text-gray-400">
        ◉  Start with a rough idea and turn it into an MVP.
      </p>
      <p className="mt-5 text-gray-400">
        ◉  Ship early, even if it's imperfect.
      </p>
      <p className="mt-5 text-gray-400">
        ◉  Debug real problems instead of avoiding them.
      </p>
      <p className="mt-5 text-gray-400">
        ◉  Improve through iterations and feedback.
      </p>
      <p className="mt-5 text-gray-400">
        ◉  Learn by building, not just reading.
      </p>
    </div>
    <div className="mt-10">
      <h2 className="inline-block text-2xl font-semibold border border-gray-800 rounded-md px-3 py-1 hover:border-gray-500 hover:bg-gray-900 transition">
 Skills / Tools
</h2>

      <h3 className="mt-4 font-medium">Frontend</h3>
      <p className="mt-2 text-gray-400">Next.js</p>
      <p className="mt-2 text-gray-400">React</p>
      <p className="mt-2 text-gray-400">Tailwind CSS</p>
      <p className="mt-2 text-gray-400">TypeScript</p>

      <h3 className="mt-4 font-medium">Backend/Logic</h3>
      <p className="mt-2 text-gray-400">Node.js</p>
      <p className="mt-2 text-gray-400">Python</p>
      <p className="mt-2 text-gray-400">MongoDB / Supabase</p>

      <h3 className="mt-4 font-medium">Product / Deployment</h3>
      <p className="mt-2 text-gray-400">Vercel</p>
      <p className="mt-2 text-gray-400">MVP Development</p>
      <p className="mt-2 text-gray-400">Debugging Production Issues</p>
      <p className="mt-2 text-gray-400">Iterative Product Building</p>
    </div>
  </div>
  );
}
