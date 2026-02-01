import "./globals.css";
import Link from "next/link";
import Image from "next/image";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <nav className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 px-8 py-4 border-b border-gray-800">
  <div className="flex items-center gap-2">
    <Image src="/logo.png" alt="EVOLV Logo" width={75} height={75} className="rounded-full"/>
    <span className="font-bold">EVOLV</span>
  </div>

  <div className="flex flex-wrap justify-center gap-6">
    <Link href="/" className="hover:text-gray-400 transition">Home</Link>
    <Link href="/build-log" className="hover:text-gray-400 transition">Build Log</Link>
    <Link href="/mvp-lab" className="hover:text-gray-400 transition">MVP Lab</Link> 
    <Link href="/about" className="hover:text-gray-400 transition">About</Link>
    <Link href="/contact" className="hover:text-gray-400 transition">Contact</Link>
  </div>
</nav>
        <main className="max-w-4xl mx-auto px-6 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
