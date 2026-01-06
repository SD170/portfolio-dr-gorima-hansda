import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Specializations from './components/Specializations';
import Services from './components/Services';
import TrustValues from './components/TrustValues';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Specializations />
      <Services />
      <TrustValues />
      <Gallery />
      <About />
      <Contact />
    </div>
  );
}

export default App;

