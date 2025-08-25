 'use client';
import { Moon, Sun, ArrowRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';

import { useState, useEffect } from 'react';
import Link from 'next/link';
 export default function Header(){
      const [darkMode, setDarkMode] = useState(false);
    
      useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark');
        setDarkMode(isDark);
      }, []);
    
      const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        
        if (newDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      };
    
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/mainpage" className="relative text-2xl font-bold font-mono text-gray-900 dark:text-white group">
      Abdullah Khalid
      {/* Underline bar */}
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
    </Link>

            <nav className="hidden md:flex items-center space-x-10">
              <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">Blog</a>
              <a href="/About" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">About</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">Contact</a>
            </nav>
            <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
         <button className="relative rounded-full p-2 flex justify-center items-center group">
  {/* Gradient border */}
  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 p-[1px] 
                   group-hover:animate-spin"></span>

  {/* Inner content */}
  <span className="relative flex justify-center items-center bg-white dark:bg-gray-900 rounded-full w-10 h-10">
    <img src="/lumiHead.svg" alt="Description" className="w-10 h-10 rounded-full" />
  </span>
</button>


            </div>
          </div>
        </div>
      </header>
   ) }