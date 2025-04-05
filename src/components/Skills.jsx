/* eslint-disable no-unused-vars */
// src/components/Skills.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { textVariant, fadeIn } from '../hoc/SectionWrapper';

const SectionTitle = ({ title, subtitle }) => (
    <motion.div variants={textVariant(0.1)}>
        <p className="text-sm font-semibold uppercase tracking-wide text-space-cadet dark:text-columbia-blue">{subtitle}</p>
        <h2 className="mt-1 text-3xl font-heading font-extrabold text-near-black dark:text-brand-white sm:text-4xl lg:text-5xl"> {title} </h2>
    </motion.div>
);

const SkillCategory = ({ title, skills }) => (
  <div className="mb-10">
    <motion.h3 variants={fadeIn("right", "spring", 0.2, 0.6)} className="text-xl font-semibold font-heading text-space-cadet dark:text-columbia-blue mb-5">
        {title}
    </motion.h3>
    <div className="flex flex-wrap gap-3">
      {skills.map((skill, index) => (
        <motion.div
          key={skill}
          variants={fadeIn("up", "spring", index * 0.05 + 0.3, 0.5)}
          // Light/Dark Glassmorphic Pill Style
          className="bg-gradient-to-br from-gray-100/70 to-columbia-blue/20 dark:from-space-cadet/70 dark:to-ultra-violet/50 backdrop-blur-sm border border-gray-300/50 dark:border-ultra-violet/30 text-near-black dark:text-brand-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg dark:shadow-space-cadet/20 cursor-pointer"
          whileHover={{
             scale: 1.1,
             boxShadow: "0px 0px 20px rgba(93, 93, 129, 0.2)", // ultra-violet hint dark mode
             // Light mode shadow
             '.light &': { boxShadow: '0px 0px 20px rgba(191, 205, 224, 0.5)' }, // columbia-blue hint light mode
             background: 'linear-gradient(to bottom right, rgba(191, 205, 224, 0.4), rgba(93, 93, 129, 0.3))', // Light mode hover gradient
             '.dark &': { background: 'linear-gradient(to bottom right, rgba(93, 93, 129, 0.6), rgba(59, 51, 85, 0.4))' } // Dark mode hover gradient
            }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        > {skill} </motion.div>
      ))}
    </div>
  </div>
);

const Skills = () => {
  const skillData = [ { title: "Languages", skills: ["Python", "JavaScript", "SQL (Oracle)", "C++", "C"] }, { title: "Web Technologies", skills: ["React", "Node.js", "Express.js", "MongoDB", "MERN Stack", "HTML5", "CSS3", "Tailwind CSS", "Flask", "Framer Motion", "Vite"] }, { title: "AI & Data", skills: ["AI Model Training Concepts", "Prompt Engineering Basics", "Data Annotation", "Data Analysis", "Data Visualization", "Google BigQuery", "DBMS Concepts", /* "Pandas", "NumPy" ? */] }, { title: "Tools & Platforms", skills: ["Git", "VS Code", "NPM", "Render", "Figma", "Canva", "Ollama", "CrewAI", "SQLite"] }, ];

  return (
    <>
      <SectionTitle subtitle="What I Know" title="My Skills." />
       <motion.p variants={textVariant(0.2)} className="mt-6 mb-12 max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 font-sans">
           I'm proficient in a range of technologies, constantly seeking to learn and improve. Here are some of the key skills I utilize to build effective and engaging applications.
        </motion.p>
        {skillData.map((category) => (<SkillCategory key={category.title} {...category} />))}
    </>
  );
};
export default Skills; // Wrap in App.jsx