import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import MarqueeBanner from "./components/MarqueeBanner";
import Experience from "./components/Experience";
import Projects from "./components/Projects";


export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <MarqueeBanner />
      <Projects />
    </main>
  );
}
