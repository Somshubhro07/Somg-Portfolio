/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
// src/hoc/SectionWrapper.jsx
import React from 'react';
import { motion } from 'framer-motion';

// --- Animation Variants ---
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const textVariant = (delay = 0) => ({
    hidden: { y: 50, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', duration: 0.8, delay, stiffness: 100, damping: 14 }},
});

export const slideIn = (direction, type = "spring", delay = 0, duration = 0.6) => ({
  hidden: { x: direction === "left" ? -100 : direction === "right" ? 100 : 0, y: direction === "up" ? 100 : direction === "down" ? -100 : 0, opacity: 0 },
  show: { x: 0, y: 0, opacity: 1, transition: { type, delay, duration, ease: "easeOut", stiffness: 100, damping: 14 }},
});

export const fadeIn = (direction, type = "spring", delay = 0, duration = 0.6) => ({
  hidden: { x: direction === "left" ? 50 : direction === "right" ? -50 : 0, y: direction === "up" ? 50 : direction === "down" ? -50 : 0, opacity: 0 }, // Subtle start position
  show: { x: 0, y: 0, opacity: 1, transition: { type, delay, duration, ease: "easeOut" }},
});
// --- End Animation Variants ---

// The HOC
const SectionWrapper = (Component, idName) =>
  function HOC(props) {
    return (
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.15 }} // Replay animation, trigger earlier
        // Consistent padding, max-width, relative for z-index & anchor
        className={`relative z-0 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8`}
      >
        {/* Anchor link target - adjusted offset */}
        <span className="absolute -top-[70px] md:-top-[90px]" id={idName}>
          &nbsp;
        </span>
        <Component {...props} />
      </motion.section>
    );
  };

export default SectionWrapper;