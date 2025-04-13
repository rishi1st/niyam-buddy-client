import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Left side */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-white">Niyam Buddy</h2>
          <p className="text-sm italic mt-1 text-gray-400">"Discipline is the bridge between goals and accomplishment."</p>
          <p className="text-xs mt-2 text-gray-500">© {new Date().getFullYear()} Niyam Buddy. All rights reserved.</p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
          <a href="/privacy" target='_blank' className="hover:text-white transition">Privacy Policy</a>
          <a href="/terms" target='_blank' className="hover:text-white transition">Terms of Use</a>
          <a href="/contact" target='_blank' className="hover:text-white transition">Contact us</a>
        </div>

        {/* Socials */}
        <div className="flex space-x-4">
          <a href="https://github.com/rishi1st" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-white transition">
            <FaGithub />
          </a>
          <a href="https://x.com/Rishikesh178340" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-white transition">
            <FaTwitter />
          </a>
          <a href="https://www.linkedin.com/in/rishikesh-gupta2025/" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-white transition">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
