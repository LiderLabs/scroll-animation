import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CarSequence from "./components/CarSequence";
import Features from "./components/Features";
import Models from "./components/Models";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <CarSequence />

        <Features />

        <Models />
      </main>
    </>
  );
}

export default App;