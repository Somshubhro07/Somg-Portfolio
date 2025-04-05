/* eslint-disable no-unused-vars */
// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';

const sentenceContainer = (delayChildren = 0.2) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren } },
});
const letterVariant = {
    hidden: { opacity: 0, y: 20, rotateX: -40, scale: 0.8 },
    visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { type: 'spring', damping: 12, stiffness: 150 } },
};
const itemFadeInUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15, delay: 1.2 } },
};

const Hero = () => {
    const line1 = "Hi, I'm ";
    const name = "Somshubhro";
    const line2 = "I craft beautiful and engaging digital experiences.";
    const line3 = "Let's build something amazing.";
    const splitLine1 = Array.from(line1); const splitName = Array.from(name);
    const splitLine2 = line2.split(" "); const splitLine3 = line3.split(" ");

  return (
    <section
      id="hero"
      className="relative w-full h-screen mx-auto overflow-hidden flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-off-white via-columbia-blue/30 to-ultra-violet/20 dark:from-brand-black dark:via-space-cadet dark:to-ultra-violet/70 animate-gradient-bg bg-[length:400%_400%]"
    >
      <div className="z-10 flex flex-col items-center">
        <motion.h1
          variants={sentenceContainer()} initial="hidden" animate="visible"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading text-near-black dark:text-brand-white leading-tight mb-4"
          aria-label={`${line1} ${name}`}
        >
          {splitLine1.map((char, i) => (<motion.span key={`c1-${i}`} variants={letterVariant} className="inline-block whitespace-pre">{char}</motion.span>))}
          <span className="text-space-cadet dark:text-columbia-blue inline-block">
             {splitName.map((char, i) => (<motion.span key={`n-${i}`} variants={letterVariant} className="inline-block">{char}</motion.span>))}
          </span>
        </motion.h1>
        <motion.p variants={sentenceContainer(0.6)} initial="hidden" animate="visible" className="mt-2 text-lg sm:text-xl md:text-2xl text-mid-gray dark:text-gray-300 max-w-2xl font-sans" aria-label={`${line2} ${line3}`}>
             {splitLine2.map((word, i) => (<motion.span key={`w2-${i}`} variants={letterVariant} className="inline-block mr-1.5">{word}</motion.span>))} <br className="hidden sm:block"/>
             {splitLine3.map((word, i) => (<motion.span key={`w3-${i}`} variants={letterVariant} className="inline-block mr-1.5">{word}</motion.span>))}
         </motion.p>
        <motion.div variants={itemFadeInUp} initial="hidden" animate="visible" className="mt-10 flex flex-wrap justify-center gap-4">
           <motion.a href="#projects" className="px-7 py-3 bg-space-cadet dark:bg-columbia-blue text-brand-white dark:text-brand-black font-semibold rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-105 hover:brightness-110 dark:hover:brightness-105" whileHover={{ scale: 1.08, transition: { type: 'spring', stiffness: 300 } }} whileTap={{ scale: 0.95 }}> View My Work </motion.a>
           <motion.a href="#contact" className="px-7 py-3 bg-gray-200 dark:bg-space-cadet text-near-black dark:text-brand-white font-semibold rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:scale-105 hover:bg-gray-300 dark:hover:bg-ultra-violet" whileHover={{ scale: 1.08, transition: { type: 'spring', stiffness: 300 } }} whileTap={{ scale: 0.95 }}> Get In Touch </motion.a>
        </motion.div>
      </div>
      <div className="absolute bottom-6 sm:bottom-10 w-full flex justify-center items-center z-20 pointer-events-none">
        <div className="w-[35px] h-[64px] rounded-3xl border-4 border-ultra-violet/50 dark:border-ultra-violet/70 flex justify-center items-start p-2">
            <motion.div animate={{ y: [0, 24, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop', ease: "easeInOut" }} className="w-3 h-3 rounded-full bg-space-cadet dark:bg-columbia-blue" />
          </div>
      </div>
    </section>
  );
};
export default Hero;