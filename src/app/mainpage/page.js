
import { Moon, Sun, ArrowRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import Header from '../header/page';
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

  const articles = [
    {
      id: 1,
      title: "The next chapter: EpicAI.pro",
      date: "April 10th, 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      category: "announcement"
    },
    {
      id: 2,
      title: "AI is taking your job",
      date: "November 21st, 2024",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop",
      category: "career"
    },
    {
      id: 3,
      title: "How I increased my visibility",
      date: "October 29th, 2024",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop",
      category: "productivity"
    }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 `}>
      {/* Header */}
      {/* <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-mono">Abdullah Khalid</h1>
            
            <nav className="hidden md:flex items-center space-x-10">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">Blog</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">About</a>
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
 
  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 p-[1px] 
                   group-hover:animate-spin"></span>


  <span className="relative flex justify-center items-center bg-white dark:bg-gray-900 rounded-full w-10 h-10">
    <img src="/lumiHead.svg" alt="Description" className="w-10 h-10 rounded-full" />
  </span>
</button>


            </div>
          </div>
        </div>
      </header> */}
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
        <section className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex flex-wrap gap-4 justify-center">
            <span className="px-6 py-3 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-medium">react</span>
            <span className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300 transition-colors cursor-pointer">javascript</span>
            <span className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300 transition-colors cursor-pointer">typescript</span>
            <span className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300 transition-colors cursor-pointer">node</span>
            <span className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300 transition-colors cursor-pointer">career</span>
          </div>
        </section>

        {/* Featured Article */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Featured Article</h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5">
                <img 
                  src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop" 
                  alt="React Testing Library"
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-3/5 p-12">
                <div className="mb-6">
                  <span className="text-purple-600 dark:text-purple-400 font-medium text-lg">May 15th, 2024 • 12 min read</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  Common mistakes with React Testing Library
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  Learn about the most common mistakes developers make when using React Testing Library and how to avoid them for better test quality.
                </p>
                <Link href={"/Blogpost"} className="flex items-center gap-3 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors text-lg font-medium">
                  Read full article
                  <ArrowRight size={24} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-8 lg:px-12 py-32">
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
    {articles.map((article) => (
      <Link href={"/Blogpost"} key={article.id} className="group cursor-pointer">
        <div className="relative overflow-hidden rounded-3xl aspect-[4/3] mb-8">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {article.id === 1 && (
            <div className="absolute bottom-8 left-8">
              <span className="bg-black/80 text-white text-lg px-6 py-3 rounded-xl backdrop-blur-sm font-medium">
                Latest
              </span>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <p className="text-gray-500 dark:text-gray-400 font-semibold text-lg">
            {article.date} • {article.readTime}
          </p>
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-tight">
            {article.title}
          </h3>
        </div>
      </Link>
    ))}
  </div>
</section>

   
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