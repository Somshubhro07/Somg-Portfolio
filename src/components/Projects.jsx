// src/components/Projects.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Ensure variants are imported from your HOC file
import { textVariant, fadeIn } from '../hoc/SectionWrapper';
import { FiGithub, FiExternalLink } from 'react-icons/fi'; // Ensure react-icons is installed

// --- IMPORT YOUR PROJECT IMAGES FROM src/assets ---
// (Make sure paths are correct relative to this file)
import ecomCheckout2 from '../assets/images/ecom-checkout-2.png';
import ecomCheckout3 from '../assets/images/ecom-checkout-3.png';
import ecomCheckout4 from '../assets/images/ecom-checkout-4.png';
import finDash1 from '../assets/images/financial-portfolio-dashboard-1.png';
import finDash2 from '../assets/images/financial-portfolio-dashboard-2.png';
import finDash3 from '../assets/images/financial-portfolio-dashboard-3.png';
import finDash4 from '../assets/images/financial-portfolio-dashboard-4.png';
import finDash5 from '../assets/images/financial-portfolio-dashboard-5.png';
import finDash6 from '../assets/images/financial-portfolio-dashboard-6.png';
import shopSync1 from '../assets/images/shop-sync-1.png';
import shopSync2 from '../assets/images/shop-sync-2.png';
import shopSync3 from '../assets/images/shop-sync-3.png';
import teaB1 from '../assets/images/tea-business-1.png';
import teaB2 from '../assets/images/tea-business-2.png';
import teaB3 from '../assets/images/tea-business-3.png';
import teaB4 from '../assets/images/tea-business-4.png';
import uber1 from '../assets/images/uber-clone-1.png';
import uber2 from '../assets/images/uber-clone-2.png';
import uber3 from '../assets/images/uber-clone-3.png';
import uber4 from '../assets/images/uber-clone-4.png';
import uber5 from '../assets/images/uber-clone-5.png';
import uber6 from '../assets/images/uber-clone-6.png';
import uber7 from '../assets/images/uber-clone-7.png';
import uber8 from '../assets/images/uber-clone-8.png';
import uber9 from '../assets/images/uber-clone-9.png';
import uber10 from '../assets/images/uber-clone-10.png';

// TODO: Import generated placeholder images for these two projects
// import retailOptImage from '../assets/images/retail-optimizer-placeholder.png';
// import flaskEcomImage from '../assets/images/flask-ecom-placeholder.png';
// Using temporary text placeholders until you generate the images
const retailOptImage = "placeholder_retail_opt";
const flaskEcomImage = "placeholder_flask_ecom";
// ---------------------------------

// Reusable Title Component with Theme Styles
const SectionTitle = ({ title, subtitle }) => (
    <motion.div variants={textVariant(0.1)}>
        <p className="text-sm font-semibold uppercase tracking-wide text-space-cadet dark:text-columbia-blue">{subtitle}</p>
        <h2 className="mt-1 text-3xl font-heading font-extrabold text-near-black dark:text-brand-white sm:text-4xl lg:text-5xl">
            {title}
        </h2>
    </motion.div>
);

// Updated Project Card with Image Gallery and object-contain
const ProjectCard = ({ index, name, description, tags, images = [], source_code_link, live_demo_link }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageCount = images.length;

  // Gallery animation variants for sliding
  const galleryVariants = {
    animate: {
        x: `-${currentImageIndex * 100}%`, // Slide based on index
        transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } // Smoother ease
    }
  };

  // Effect for auto-scrolling on hover
  useEffect(() => {
    let intervalId = null;
    if (isHovered && imageCount > 1) {
        // Set interval to advance the slide
        intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageCount);
        }, 2500); // Change image every 2.5 seconds
    }
    // Clear interval on unhover or unmount
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [isHovered, imageCount]); // Dependencies: run when hover state or image count changes


  return (
    <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        variants={fadeIn("up", "spring", index * 0.2, 0.7)}
        // Light/Dark Glassmorphic Card with Gradient Border Effect
        className="relative bg-gradient-to-br from-off-white/60 via-columbia-blue/10 to-off-white/60 dark:from-space-cadet/60 dark:via-ultra-violet/40 dark:to-space-cadet/60 backdrop-blur-lg p-5 rounded-2xl shadow-xl dark:shadow-space-cadet/30 w-full sm:w-[360px] overflow-hidden group border border-gray-300/30 dark:border-ultra-violet/30 before:absolute before:inset-0 before:p-px before:rounded-2xl before:pointer-events-none before:bg-gradient-to-b before:from-space-cadet/50 dark:before:from-columbia-blue/50 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100"
    >
        {/* Image Gallery Container */}
        <div className='relative w-full h-[230px] mb-4 rounded-xl overflow-hidden bg-near-black/10 dark:bg-brand-black/30'>
             {/* Inner container that slides */}
             <motion.div
                className='flex h-full w-full'
                variants={galleryVariants}
                animate="animate" // Use the animate prop which changes based on currentImageIndex
             >
                 {/* Map through images */}
                 {images && images.length > 0 && images[0] !== "placeholder_retail_opt" && images[0] !== "placeholder_flask_ecom" ? (
                    images.map((imgSrc, imgIndex) => (
                        <img
                            key={imgIndex}
                            src={imgSrc} // Use the imported variable
                            alt={`${name} screenshot ${imgIndex + 1}`}
                            // --- USE object-contain TO SHOW FULL IMAGE ---
                            className='h-full w-full min-w-full flex-shrink-0 object-contain object-center'
                            // --- END CHANGE ---
                            loading="lazy"
                        />
                    ))
                 ) : (
                     // Placeholder if no images are provided OR if it's the text placeholder
                     <div className="h-full w-full flex items-center justify-center bg-gray-200 dark:bg-ultra-violet/30">
                         <span className="text-mid-gray dark:text-gray-400 text-sm italic px-4 text-center">
                           {name === "Retail Inventory Optimizer" || name === "E-commerce Platform (Flask)"
                             ? "Visual coming soon (Backend focus)"
                             : "Image coming soon"}
                          </span>
                     </div>
                 )}
             </motion.div>

             {/* Pagination Dots */}
             {imageCount > 1 && (
                 <div className="absolute bottom-2.5 left-0 right-0 flex justify-center space-x-2 z-10">
                     {images.map((_, dotIndex) => (
                         <button
                             key={dotIndex}
                             onClick={() => {
                                 setIsHovered(false); // Pause auto-scroll on manual click
                                 setCurrentImageIndex(dotIndex);
                             }}
                             className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                                 currentImageIndex === dotIndex
                                    ? 'bg-brand-white dark:bg-columbia-blue scale-125 opacity-100' // Active dot
                                    : 'bg-white/40 dark:bg-ultra-violet/60 hover:bg-white/70 dark:hover:bg-ultra-violet opacity-70' // Inactive dot
                             }`}
                             aria-label={`Go to image ${dotIndex + 1}`}
                         />
                     ))}
                 </div>
             )}

             {/* Links Overlay (Appears on card hover) */}
             <div className='absolute top-0 right-0 flex justify-end items-start p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10'>
                 {live_demo_link && (
                    <a href={live_demo_link} target="_blank" rel="noopener noreferrer"
                       className='bg-off-white dark:bg-columbia-blue w-9 h-9 rounded-full flex justify-center items-center cursor-pointer shadow-md hover:brightness-95 dark:hover:brightness-110 transition-all transform hover:scale-110 mr-2'
                       title="Live Demo">
                        <FiExternalLink className="w-1/2 h-1/2 text-brand-black" />
                    </a>
                 )}
                 {source_code_link && (
                    <a href={source_code_link} target="_blank" rel="noopener noreferrer"
                       className='bg-near-black/80 dark:bg-brand-black/80 w-9 h-9 rounded-full flex justify-center items-center cursor-pointer shadow-md hover:bg-near-black dark:hover:bg-brand-black transition-all transform hover:scale-110'
                       title="GitHub Repository">
                        <FiGithub className="w-1/2 h-1/2 text-brand-white" />
                    </a>
                 )}
             </div>
        </div>

        {/* Text Content */}
        <div className='relative z-0'>
            <h3 className='text-near-black dark:text-brand-white font-heading font-bold text-xl sm:text-2xl'>{name}</h3>
            <p className='mt-3 text-gray-600 dark:text-gray-300 font-sans text-sm leading-relaxed min-h-[60px]'>{description}</p>
        </div>

        {/* Tags */}
        <div className='mt-4 flex flex-wrap gap-2 relative z-0'>
             {tags.map((tag) => (
                <span key={tag.name} className={`text-xs font-medium px-3 py-1 rounded-full ${tag.colorClass || 'bg-gray-200 dark:bg-ultra-violet/70 text-gray-700 dark:text-gray-200'}`}>
                    {tag.name}
                </span>
            ))}
        </div>
    </motion.div>
  );
};
// --- END Project Card Component ---


// --- Main Projects Component Definition ---
const Projects = () => {
    // --- Full Project Data using imported images ---
     const projectsData = useMemo(() => [ // Use useMemo if data is static
        {
          name: "Retail Inventory Optimizer", description: "Multi-agent AI system using Ollama & CrewAI...",
          tags: [ { name: "Python" }, { name: "Flask" }, { name: "AI/ML" },{ name: "SQLite"} ],
          images: [retailOptImage], // Use placeholder variable
          source_code_link: "https://github.com/Somshubhro07/RetailAgentOpt", live_demo_link: null
        },
         {
          name: "ShopSync Inventory Mgmt", description: "Full-stack MERN solution for SMEs...",
          tags: [ { name: "React" }, { name: "Node.js" }, { name: "MongoDB" }, { name: "JWT" } ],
          images: [shopSync1, shopSync2, shopSync3], // Use imported images
          source_code_link: "https://github.com/Somshubhro07/shop-sync", live_demo_link: null
        },
        {
          name: "Uber Clone (MERN)", description: "MERN stack ride-sharing prototype...",
          tags: [ { name: "React" }, { name: "Node.js" }, { name: "MongoDB" }, { name: "MERN" }, { name: "Real-Time"} ],
          images: [uber1, uber2, uber3, uber4, uber5, uber6, uber7, uber8, uber9, uber10], // Use imported images
          source_code_link: "https://github.com/Somshubhro07/Uber-Clone", live_demo_link: null
        },
         {
          name: "Tea Business Platform", description: "MERN stack e-commerce base for tea business...",
          tags: [ { name: "React" }, { name: "Node.js" }, { name: "MongoDB" }, { name: "MERN" }, { name: "E-commerce"} ],
          images: [teaB1, teaB2, teaB3, teaB4], // Use imported images
          source_code_link: "https://github.com/Somshubhro07/tea-business", live_demo_link: null
        },
         {
          name: "Financial Portfolio Dashboard", description: "React-based dashboard UI for viewing portfolios...",
          tags: [ { name: "React" }, { name: "TailwindCSS" }, { name: "Framer Motion" }, { name: "Recharts" } ],
          images: [finDash1, finDash2, finDash3, finDash4, finDash5, finDash6], // Use imported images
          source_code_link: "https://github.com/Somshubhro07/Financial-Portfolio-Dashboard", live_demo_link: "https://financial-portfolio-dashboard.onrender.com/"
        },
        {
          name: "E-commerce Checkout UI", description: "Functional e-commerce frontend UI focusing on UX...",
          tags: [ { name: "React" }, { name: "TailwindCSS" }, { name: "Framer Motion" }],
          images: [ecomCheckout2, ecomCheckout3, ecomCheckout4], // Use imported images
          source_code_link: "https://github.com/Somshubhro07/Checkout-frontend", live_demo_link: "https://checkout-frontend-34rz.onrender.com/"
        },
        {
          name: "E-commerce Platform (Flask)", description: "Full-featured platform using Flask/SQLite...",
          tags: [ { name: "Python" }, { name: "Flask" }, { name: "SQLite"}, { name: "JavaScript" } ],
          images: [flaskEcomImage], // Use placeholder variable
          source_code_link: "https://github.com/Somshubhro07/Ecom_project", live_demo_link: null
        },
     ], []); // Empty dependency array for useMemo
    // --- End Project Data ---

    // Function to assign themed color classes for tags
    const getTagColor = (tagName) => {
      const lowerTag = tagName.toLowerCase();
      // Define light and dark classes separately
      let lightClass = 'bg-gray-200 text-gray-700'; // Default light
      let darkClass = 'dark:bg-ultra-violet/70 dark:text-gray-200'; // Default dark

      if (['react', 'framer motion', 'recharts'].includes(lowerTag)) { lightClass = 'bg-sky-100 text-sky-800'; darkClass = 'dark:bg-sky-900/70 dark:text-sky-200'; }
      else if (['python', 'flask', 'sqlite'].includes(lowerTag)) { lightClass = 'bg-blue-100 text-blue-800'; darkClass = 'dark:bg-blue-900/70 dark:text-blue-200'; }
      else if (['node.js', 'mongodb', 'mern'].includes(lowerTag)) { lightClass = 'bg-green-100 text-green-800'; darkClass = 'dark:bg-green-900/70 dark:text-green-200'; }
      else if (['tailwindcss'].includes(lowerTag)) { lightClass = 'bg-teal-100 text-teal-800'; darkClass = 'dark:bg-teal-900/70 dark:text-teal-100'; }
      else if (['ai/ml'].includes(lowerTag)) { lightClass = 'bg-purple-100 text-purple-800'; darkClass = 'dark:bg-purple-900/70 dark:text-purple-200'; }
      else if (['jwt'].includes(lowerTag)) { lightClass = 'bg-pink-100 text-pink-800'; darkClass = 'dark:bg-pink-900/70 dark:text-pink-200'; }
      else if (['javascript', 'real-time', 'real-time concepts'].includes(lowerTag)) { lightClass = 'bg-yellow-100 text-yellow-800'; darkClass = 'dark:bg-yellow-900/70 dark:text-yellow-100'; }
      else if (['e-commerce'].includes(lowerTag)) { lightClass = 'bg-red-100 text-red-800'; darkClass = 'dark:bg-red-900/70 dark:text-red-200'; }

      return `${lightClass} ${darkClass}`; // Combine both classes
    };

    // Apply colors to tags - useMemo for slight performance optimization
    const projectsWithColors = useMemo(() => projectsData.map(proj => ({
        ...proj,
        tags: proj.tags.map(tag => ({ ...tag, colorClass: getTagColor(tag.name) })),
        // Ensure images is always an array
        images: proj.images || []
    // eslint-disable-next-line react-hooks/exhaustive-deps
    })), [projectsData]); // Recalculate if projectsData changes


  return (
    <>
      <SectionTitle subtitle="My Work" title="Projects." />
       <motion.p variants={textVariant(0.2)} className="mt-6 mb-12 max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 font-sans">
          Following projects showcase my skills through real-world examples. Hover over a card to see more visuals (if available) and click the icons for links!
        </motion.p>
      {/* Project Cards Grid */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 place-items-center md:place-items-stretch">
          {projectsWithColors.map((project, index) => (
             // Pass 'images' array
             <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
      </div>
    </>
  );
};

// Export wrapped component if using HOC in App.jsx, otherwise export default Projects
export default Projects;