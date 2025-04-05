/* eslint-disable no-unused-vars */
// src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub } from 'react-icons/fi';
import { SiQuora, SiCodepen } from "react-icons/si";

// Footer specific variants (simple fade-in)
const footerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 80, damping: 15, delay: 0.2 }
    }
}

const SocialLink = ({ href, icon: Icon, label }) => (
    <motion.a
        href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
        className="p-2 text-mid-gray dark:text-gray-400 hover:text-space-cadet dark:hover:text-columbia-blue transition-colors duration-200"
        whileHover={{ scale: 1.2, y: -2 }}
        whileTap={{ scale: 0.9 }}
    > <Icon size={20}/> </motion.a>
);

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const socialLinks = [
      { href: "https://www.linkedin.com/in/somshubhro-guha-46b892272/", icon: FiLinkedin, label: "LinkedIn"},
      { href: "https://github.com/Somshubhro07/", icon: FiGithub, label: "GitHub"},
      { href: "https://quora.com/profile/Somshubhro", icon: SiQuora, label: "Quora"},
      { href: "https://codepen.io/Somshubhro Guha", icon: SiCodepen, label: "CodePen"},
    ];

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} // Trigger once when 10% visible
      className="bg-off-white/50 dark:bg-near-black/50 border-t border-gray-300/30 dark:border-ultra-violet/20 mt-24 py-8" // Added margin-top
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Social Links */}
        <div className="flex justify-center space-x-5 mb-4">
            {socialLinks.map(link => <SocialLink key={link.label} {...link} />)}
        </div>

        {/* Copyright */}
        <p className="text-sm text-mid-gray dark:text-gray-500">
          &copy; {currentYear} Somshubhro Guha. All Rights Reserved.
        </p>
         {/* Optional: Fun fact or small quote */}
         <p className="mt-2 text-xs text-mid-gray/70 dark:text-gray-600">
            ( P.S. I'm left-handed! ⚡ )
         </p>
      </div>
    </motion.footer>
  );
};

export default Footer;