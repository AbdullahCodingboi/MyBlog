
import { Moon, Sun, ArrowRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';

import Header from '../header/page';
import FeaturedBlogs from '../FeaturedBlog/page';
export default function Mainpage() {
  // const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   const isDark = document.documentElement.classList.contains('dark');
  //   setDarkMode(isDark);
  // }, []);

  // const toggleDarkMode = () => {
  //   const newDarkMode = !darkMode;
  //   setDarkMode(newDarkMode);
    
  //   if (newDarkMode) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }${darkMode ? 'dark' : ''}
  // };
  
  
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 `}>
     
  <Header/>
      {/* Main Content */}
      <main className="">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                Learn development
                <br />
                <span className="text-purple-600 dark:text-purple-400">with great articles</span>
              </h1>
              
              <p className="text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
                Discover insights, tutorials, and thoughts on modern web development
              </p>
              
              <div className="flex items-center gap-6 pt-4">
                <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl transition-colors font-medium text-lg">
                  Latest articles
                </button>
                <button className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-600 dark:hover:border-purple-400 rounded-2xl transition-colors font-medium text-lg">
                  All posts
                </button>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img 
                  src="/batBlog.svg" 
                  alt="Blog illustration" 
                  className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto object-contain drop-shadow-lg"  
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filter Tags */}
       
      <FeaturedBlogs/>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Abdullah Khalid</h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl">
                Building better web experiences through thoughtful development and sharing knowledge with the community.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <Twitter size={28} />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <Github size={28} />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <Linkedin size={28} />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <Mail size={28} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-lg">Blog</a></li>
                <li><a href="/About" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-lg">About</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-lg">Contact</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-lg">Privacy</a></li>
                <li><a href="/Editor" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-lg">Editor</a></li>

              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              © 2024 Abdullah Khalid. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}