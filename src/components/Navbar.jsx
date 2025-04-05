// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

const hoverSpring = { type: "spring", stiffness: 400, damping: 15 };

const Navbar = () => {
  const [theme, setTheme] = useState(() => { /* Theme init logic */
    if (typeof window !== 'undefined') { const saved = localStorage.getItem('theme'); if (saved) return saved; if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'; } return 'dark';
  });
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Apply theme
  useEffect(() => { /* Theme update logic */
    if (theme === 'dark') { document.documentElement.classList.add('dark'); } else { document.documentElement.classList.remove('dark'); } localStorage.setItem('theme', theme);
  }, [theme]);

  // Detect Scroll
  useEffect(() => { /* Scroll detection logic */
    const handleScroll = () => setIsScrolled(window.scrollY > 10); window.addEventListener('scroll', handleScroll); handleScroll(); return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active Link Observer - SIMPLER ATTEMPT
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    let currentActiveId = ''; // Track locally

    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Target roughly the middle 10% of the viewport
      threshold: 0.1 // Need at least 10% visible in the zone
    };

    const observer = new IntersectionObserver((entries) => {
        let foundActive = false;
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id !== currentActiveId) {
                // Prioritize the one currently intersecting in the middle zone
                setActiveLink(entry.target.id);
                currentActiveId = entry.target.id;
                foundActive = true;
            }
        });

        // If scrolled near top, force 'hero'
        if (!foundActive && window.scrollY < window.innerHeight * 0.3 && currentActiveId !== 'hero') {
           setActiveLink('hero');
           currentActiveId = 'hero';
        }

    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []); // Run only once

  const handleThemeToggle = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const handleMenuToggle = () => setIsOpen(!isOpen);

  // Smooth Scroll Handler
  const handleNavLinkClick = (e, href) => { /* Smooth scroll logic */
    if (href.startsWith('#')) { e.preventDefault(); const id = href.substring(1); const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } setIsOpen(false);
  };

  const navLinks = [ { href: '#hero', label: 'Home' }, { href: '#about', label: 'About' }, { href: '#skills', label: 'Skills' }, { href: '#projects', label: 'Projects' }, { href: '#contact', label: 'Contact' }, ];

  return (
    <motion.nav
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full transition-colors duration-300 backdrop-blur-lg ${ isScrolled ? 'bg-off-white/80 dark:bg-brand-black/80 shadow-lg dark:shadow-space-cadet/30' : 'bg-off-white/50 dark:bg-brand-black/50 shadow-none' }`}
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex items-center justify-between h-16">
                 {/* Logo */}
                <motion.div whileHover={{ scale: 1.05, rotate: -1 }} transition={hoverSpring} className="flex-shrink-0">
                     <a href="#hero" onClick={(e) => handleNavLinkClick(e, '#hero')} className="text-2xl font-heading font-bold text-space-cadet dark:text-columbia-blue hover:opacity-80 transition-opacity"> Somshubhro </a>
                </motion.div>
                 {/* Desktop Links */}
                <div className="hidden md:flex md:items-center md:space-x-2 lg:space-x-4">
                    {navLinks.map((link) => (
                         <motion.div key={link.label} className="relative" whileHover="hover">
                             <motion.a href={link.href} onClick={(e) => handleNavLinkClick(e, link.href)}
                                 className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative z-10 ${ activeLink === link.href.substring(1) ? 'text-near-black dark:text-brand-white font-semibold' : 'text-mid-gray dark:text-gray-400 hover:text-near-black dark:hover:text-brand-white' }`}
                                 variants={{ hover: { y: -2 } }} transition={hoverSpring}> {link.label} </motion.a>
                            {activeLink === link.href.substring(1) && (<motion.div layoutId="activePill" className="absolute inset-0 bg-columbia-blue/50 dark:bg-ultra-violet/50 rounded-md -z-0" style={{ borderRadius: 6 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}/>)}
                             <motion.span className={`absolute bottom-0.5 left-0 w-full h-0.5 bg-space-cadet dark:bg-columbia-blue origin-center ${ activeLink === link.href.substring(1) ? 'scale-x-0' : '' }`} variants={{ initial: { scaleX: 0 }, hover: { scaleX: 1 } }} initial="initial" transition={{ duration: 0.2, ease: "easeOut" }}/>
                        </motion.div>
                     ))}
                 </div>
                 {/* Right Icons */}
                <div className="flex items-center">
                    {/* Theme Toggle */}
                    <motion.div whileHover={{ scale: 1.15 }} transition={hoverSpring}>
                         <motion.button onClick={handleThemeToggle} className="p-2 rounded-full text-mid-gray dark:text-gray-400 hover:text-near-black dark:hover:text-brand-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-off-white dark:focus:ring-offset-brand-black focus:ring-space-cadet dark:focus:ring-columbia-blue transition-colors duration-200" aria-label="Toggle theme" whileTap={{ scale: 0.9, rotate: 45 }}>
                             <AnimatePresence mode="wait" initial={false}> <motion.div key={theme} initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.25 }}> {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />} </motion.div> </AnimatePresence>
                         </motion.button>
                    </motion.div>
                    {/* Mobile Menu Button */}
                    <div className="ml-2 md:hidden">
                         <motion.button onClick={handleMenuToggle} className="inline-flex items-center justify-center p-2 rounded-md text-mid-gray dark:text-gray-400 hover:text-near-black dark:hover:text-brand-white hover:bg-columbia-blue/30 dark:hover:bg-ultra-violet/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-space-cadet dark:focus:ring-columbia-blue transition-all duration-200" aria-controls="mobile-menu" aria-expanded={isOpen} whileTap={{ scale: 0.85 }}>
                             <span className="sr-only">Open menu</span>
                             <AnimatePresence mode="wait" initial={false}> <motion.div key={isOpen ? 'XMark' : 'Bars3'} initial={{ opacity: 0, rotate: -180 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 180 }} transition={{ duration: 0.2 }}> {isOpen ? <XMarkIcon className="block h-6 w-6" /> : <Bars3Icon className="block h-6 w-6" />} </motion.div> </AnimatePresence>
                         </motion.button>
                     </div>
                </div>
            </div>
        </div>
        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
            {isOpen && ( <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="md:hidden origin-top absolute top-full left-0 w-full bg-off-white/95 dark:bg-space-cadet/95 backdrop-blur-sm shadow-lg border-t border-gray-200 dark:border-ultra-violet/50 rounded-b-lg" id="mobile-menu">
                 <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                     {navLinks.map((link) => ( <a key={link.label} href={link.href} onClick={(e) => handleNavLinkClick(e, link.href)} className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${ activeLink === link.href.substring(1) ? 'bg-columbia-blue/50 dark:bg-ultra-violet text-near-black dark:text-brand-white font-semibold' : 'text-gray-600 dark:text-gray-300 hover:bg-columbia-blue/30 dark:hover:bg-ultra-violet/70 hover:text-near-black dark:hover:text-brand-white' }`}> {link.label} </a> ))}
                 </div>
            </motion.div>)}
        </AnimatePresence>
    </motion.nav>
  );
};
export default Navbar;