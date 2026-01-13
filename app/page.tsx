import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";


export default function Home() {
  return (
    <main className="min-h-screen h-screen overflow-y-scroll snap-y snap-mandatory bg-white">
      <Header />
      <Hero />
      <About />
    </main>
  );
}
