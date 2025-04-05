/* eslint-disable no-unused-vars */
// src/components/Contact.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Use variants from HOC
import { textVariant, fadeIn } from '../hoc/SectionWrapper';

// --- CORRECTED SectionTitle Definition ---
const SectionTitle = ({ title, subtitle }) => (
    <motion.div variants={textVariant(0.1)}>
        <p className="text-sm font-semibold uppercase tracking-wide text-space-cadet dark:text-columbia-blue">{subtitle}</p>
        <h2 className="mt-1 text-3xl font-heading font-extrabold text-near-black dark:text-brand-white sm:text-4xl lg:text-5xl">
            {title}
        </h2>
    </motion.div>
);
// --- END CORRECTION ---

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => { const { name, value } = e.target; setForm({ ...form, [name]: value }); };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setError("Please fill out all fields."); return; }
    setError(null); setLoading(true); setFormSubmitted(false); // Reset submission state if retrying
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/contact`;
    console.log(`Sending request to: ${apiUrl}`); // Adjust if needed

    try {
      const response = await fetch(apiUrl, {
        method: 'POST', headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || `HTTP error! status: ${response.status}`);

      setLoading(false); setFormSubmitted(true); setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setLoading(false); setError(err.message || "Something went wrong. Please try again later."); console.error("Submission Error:", err);
    }
  };

  return (
    <div className='relative'>
      <SectionTitle subtitle="Get in touch" title="Contact." />

      {/* Form container using simple fadeIn from HOC */}
      <motion.div
        variants={fadeIn("up", "spring", 0.2, 0.8)} // Simple fade/slide up via HOC
        // Glassmorphic container styles (same as before)
        className='mt-10 w-full max-w-3xl mx-auto bg-gradient-to-br from-gray-100/70 via-columbia-blue/20 to-gray-100/70 dark:from-space-cadet/70 dark:via-ultra-violet/50 dark:to-space-cadet/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-300/50 dark:border-ultra-violet/30'
      >
          <AnimatePresence mode="wait">
          {!formSubmitted ? (
              <motion.form
                  key="contactForm" ref={formRef} onSubmit={handleSubmit}
                  // Simple initial/animate for internal fade if needed, can be removed
                  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                  transition={{ duration: 0.4 }}
                  className='flex flex-col gap-6'
              >
                   {/* Inputs and Button (with light/dark styles) */}
                   <label className='flex flex-col'><span className='text-near-black dark:text-brand-white font-medium mb-2'>Your Name</span><input type='text' name='name' value={form.name} onChange={handleChange} placeholder="What's your name?" required className='bg-white/60 dark:bg-brand-black/30 py-3 px-4 placeholder:text-mid-gray dark:placeholder:text-gray-400 text-near-black dark:text-brand-white rounded-lg outline-none border border-gray-300/70 dark:border-ultra-violet/50 focus:border-space-cadet dark:focus:border-columbia-blue font-medium transition-colors' /></label>
                   <label className='flex flex-col'><span className='text-near-black dark:text-brand-white font-medium mb-2'>Your email</span><input type='email' name='email' value={form.email} onChange={handleChange} placeholder="What's your web address?" required className='bg-white/60 dark:bg-brand-black/30 py-3 px-4 placeholder:text-mid-gray dark:placeholder:text-gray-400 text-near-black dark:text-brand-white rounded-lg outline-none border border-gray-300/70 dark:border-ultra-violet/50 focus:border-space-cadet dark:focus:border-columbia-blue font-medium transition-colors' /></label>
                   <label className='flex flex-col'><span className='text-near-black dark:text-brand-white font-medium mb-2'>Your Message</span><textarea rows={5} name='message' value={form.message} onChange={handleChange} placeholder='What you want to say?' required className='bg-white/60 dark:bg-brand-black/30 py-3 px-4 placeholder:text-mid-gray dark:placeholder:text-gray-400 text-near-black dark:text-brand-white rounded-lg outline-none border border-gray-300/70 dark:border-ultra-violet/50 focus:border-space-cadet dark:focus:border-columbia-blue font-medium transition-colors resize-none' /></label>
                   {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}
                   <button type='submit' disabled={loading} className='bg-space-cadet dark:bg-columbia-blue hover:brightness-110 dark:hover:bg-opacity-80 py-3 px-8 rounded-xl outline-none w-fit text-brand-white dark:text-brand-black font-bold shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'> {loading ? 'Sending...' : 'Send Message'} </button>
              </motion.form>
           ) : ( // Success Message
              <motion.div key="successMessage" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 min-h-[300px] flex flex-col justify-center">
                   <h3 className="text-2xl font-bold font-heading text-space-cadet dark:text-columbia-blue">Thank You!</h3>
                   <p className="text-near-black dark:text-brand-white mt-4 text-lg">Your message has been sent. I'll get back to you soon!</p>
               </motion.div>
           )}
           </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Contact; // Remember to wrap in App.jsx