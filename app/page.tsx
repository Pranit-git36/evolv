export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Hi, I’m Pranit.</h1>

      <p className="mt-4 text-gray-400">
        I’m a CSE student building MVPs and documenting my learning journey.
      </p>

      <p className="mt-2 text-gray-400">
        EVOLV is my public lab where I experiment, fail, learn, and grow.
      </p>

      <div className="mt-8 flex gap-4">
        <a href="/build-log" className="border px-4 py-2 rounded">
          View Build Log
        </a>

        <a href="/mvp-lab" className="border px-4 py-2 rounded">
          Explore MVP Lab
        </a>
      </div>
    </div>
  );
}
