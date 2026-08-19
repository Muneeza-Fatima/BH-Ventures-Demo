import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
    </main>
  );
}