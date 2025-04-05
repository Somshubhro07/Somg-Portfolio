/* eslint-disable no-unused-vars */
// src/components/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { textVariant, fadeIn } from '../hoc/SectionWrapper';
import { FiLinkedin, FiGithub } from 'react-icons/fi';
import { SiQuora, SiCodepen } from "react-icons/si";

const SectionTitle = ({ title, subtitle }) => (
    <motion.div variants={textVariant(0.1)}>
        <p className="text-sm font-semibold uppercase tracking-wide text-space-cadet dark:text-columbia-blue">{subtitle}</p>
        <h2 className="mt-1 text-3xl font-heading font-extrabold text-near-black dark:text-brand-white sm:text-4xl lg:text-5xl">
            {title}
        </h2>
    </motion.div>
);

const InterestCard = ({ index, icon, text }) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.2, 0.6)}
    // Glassmorphic card with light/dark themes
    className="w-full xs:w-[250px] bg-gradient-to-br from-gray-100/70 to-columbia-blue/20 dark:from-space-cadet/70 dark:to-ultra-violet/50 backdrop-blur-md p-5 rounded-xl border border-gray-300/50 dark:border-ultra-violet/30 shadow-lg dark:shadow-space-cadet/20"
  >
     <div className='flex items-center space-x-4'>
        <span className='text-3xl text-space-cadet dark:text-columbia-blue'>{icon}</span>
        <p className='text-near-black dark:text-brand-white text-base font-medium'>{text}</p>
     </div>
  </motion.div>
);

const SocialLink = ({ href, icon: Icon, label }) => (
    <motion.a
        href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
        // Light/Dark icon colors
        className="p-2 text-mid-gray dark:text-gray-400 hover:text-space-cadet dark:hover:text-columbia-blue transition-colors duration-200"
        whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}
    > <Icon size={24}/> </motion.a>
);

const About = () => {
  const overview = "Highly motivated BCA student from The Heritage Academy, Kolkata, developing full-stack web apps with Python, SQL, and the MERN Stack. Proven success in high-pressure hackathons (Top 1% - Outlier UI Design 2025) and currently exploring Generative AI with Accenture. Passionate about blending design and technology, with foundational AI knowledge and eager to tackle challenging freelance UI and AI training projects.";
  const interests = [ { icon: "🔭", text: "Working on E-commerce framework" }, { icon: "👯", text: "Collab on Python backends" }, { icon: "🤝", text: "Need help with SQL" }, { icon: "🌱", text: "Learning coding & more" }, { icon: "💬", text: "Ask about code/finance" }, { icon: "⚡", text: "Fun fact: Left-handed!" }, ];
  const socialLinks = [ { href: "https://www.linkedin.com/in/somshubhro-guha-46b892272/", icon: FiLinkedin, label: "LinkedIn"}, { href: "https://github.com/Somshubhro07/", icon: FiGithub, label: "GitHub"}, { href: "https://quora.com/profile/Somshubhro", icon: SiQuora, label: "Quora"}, { href: "https://codepen.io/Somshubhro Guha", icon: SiCodepen, label: "CodePen"}, ]

  return (
    <>
        <SectionTitle subtitle="Introduction" title="Overview." />
        <motion.p variants={textVariant(0.3)} className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 font-sans"> {overview} </motion.p>
         <motion.div variants={textVariant(0.4)} className="mt-8 flex items-center space-x-4">
            {socialLinks.map(link => <SocialLink key={link.label} {...link} />)}
         </motion.div>
        <div className="mt-16 flex flex-wrap justify-center gap-8">
            {interests.map((item, index) => (<InterestCard key={index} index={index} {...item} />))}
        </div>
    </>
  );
};
export default About; // Wrap in App.jsx