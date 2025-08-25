'use client';
import { useState } from 'react';
import Link from 'next/link';
import { 
  Sun, 
  Moon, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Github, 
  Youtube,
  ArrowRight
} from 'lucide-react';

export default function ContactPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', { firstName, email });
  };

  return (
    <div className={`min-h-screen bg-gray-900 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
 <Link href="/mainpage" className="relative text-2xl font-bold font-mono text-gray-900 dark:text-white group">
      Abdullah Khalid
      {/* Underline bar */}
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
    </Link>            
            <nav className="hidden md:flex items-center space-x-10">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">Blog</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">About</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">Contact</a>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="relative rounded-full p-2 flex justify-center items-center group">
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 p-[1px] group-hover:animate-spin"></span>
                <span className="relative flex justify-center items-center bg-white dark:bg-gray-900 rounded-full w-10 h-10">
                  <img src="/lumiHead.svg" alt="Profile" className="w-10 h-10 rounded-full" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-8 lg:px-28 py-32">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Send me an email.
                </h1>
                <p className="text-3xl lg:text-4xl text-gray-400 leading-relaxed">
                  Like in the old days.
                </p>
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img 
                  src="/lumiHead.svg" 
                  alt="Abdullah Khalid"
                  className="w-80 h-80 lg:w-96 lg:h-96 rounded-3xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Email Form Section */}
        <section className="max-w-4xl mx-auto px-8 lg:px-12 py-32">
          <div className="flex justify-center">
            {/* Form Content */}
            <div className="w-full max-w-2xl space-y-12">
              <div className="space-y-6 text-center">
                <h2 className="text-4xl lg:text-5xl font-bold text-white">
                  Email me
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed">
                                  I do my best to respond, but I can’t always reply to every email.
                                  If you’ve got a general question about web development, I recommend checking out
                                  docs, tutorials, or community forums first — you’ll usually find answers faster there.
                                  If it’s something personal or specific to my work, feel free to reach out and I’ll try
                                  to get back to you when I can. Thanks for understanding!
                </p>
                <p className="text-lg text-gray-500">
                  Note: due to spam issues, you have to confirm your email by signing up for an{' '}
                  <Link href="#" className="text-blue-400 hover:text-blue-300 underline">
                    account
                  </Link>{' '}
                  on my website first.
                </p>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="firstName" className="block text-lg font-medium text-white mb-3">
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-lg font-medium text-white mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 text-lg font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    Sign me up
                    <ArrowRight size={20} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-32">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            {/* Brand Section */}
            <div className="md:col-span-2 space-y-8">
              <h3 className="text-3xl font-bold text-white">Abdullah Khalid</h3>
              <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                Full time educator making our world better through thoughtful development and sharing knowledge with the community.
              </p>
              <div className="flex space-x-6">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github size={32} />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube size={32} />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={32} />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin size={32} />
                </Link>
              </div>
            </div>
            
            {/* Contact Links */}
            <div className="space-y-8">
              <h4 className="text-xl font-bold text-white">Contact</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-lg">
                    Email Abdullah
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-lg">
                    Call Abdullah
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-lg">
                    Office hours
                  </Link>
                </li>
              </ul>
            </div>

            {/* General Links */}
            <div className="space-y-8">
              <h4 className="text-xl font-bold text-white">General</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-lg">
                    My Mission
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-lg">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-lg">
                    Terms of use
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors text-lg">
                    Code of conduct
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Newsletter Section */}
          {/* <div className="border-t border-gray-700 pt-16 mb-16">
            <div className="space-y-8">
              <h4 className="text-2xl font-bold text-white">Stay up to date</h4>
              <p className="text-lg text-gray-400 max-w-2xl">
                Subscribe to the newsletter to stay up to date with articles, courses and much more!
              </p>
              <Link href="#" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-lg">
                Learn more about the newsletter
                <ArrowRight size={20} />
              </Link>
            </div>
          </div> */}

          {/* Copyright */}
          <div className="border-t border-gray-700 pt-12 text-center">
            <p className="text-gray-500 text-lg">
              All rights reserved © Abdullah Khalid 2024
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}