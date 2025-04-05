// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer'; // Import the Footer component
import SectionWrapper from './hoc/SectionWrapper';

// Wrap components that need section styling/animation
const WrappedAbout = SectionWrapper(About, "about");
const WrappedSkills = SectionWrapper(Skills, "skills");
const WrappedProjects = SectionWrapper(Projects, "projects");
const WrappedContact = SectionWrapper(Contact, "contact");

function App() {
  return (
    // Base background colors applied here ensure consistency
    <div className="relative z-0 bg-off-white dark:bg-brand-black">
      <Navbar />
      {/* Sections */}
      <Hero />
      <WrappedAbout />
      <WrappedSkills />
      <WrappedProjects />
      <WrappedContact />
      {/* --- Add the Footer component here --- */}
      <Footer />
      {/* ------------------------------------- */}
    </div>
  );
}

export default App;