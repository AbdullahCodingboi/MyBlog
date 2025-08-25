// 'use client';

import Header from '../header/page';
import { Moon, Sun, ArrowLeft, Share2, Heart, MessageCircle, Bookmark, Twitter, Linkedin, Facebook } from 'lucide-react';
import Link from 'next/link';
export default function BlogPost() {
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const isDark = document.documentElement.classList.contains('dark');
//     setDarkMode(isDark);
//   }, []);

//   const toggleDarkMode = () => {
//     const newDarkMode = !darkMode;
//     setDarkMode(newDarkMode);
    
//     if (newDarkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   };

  const relatedArticles = [
    {
      id: 1,
      title: "Common mistakes with React Testing Library",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
      category: "react"
    },
    {
      id: 2,
      title: "Make small talk with anyone in 10 seconds",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop",
      category: "career"
    },
    {
      id: 3,
      title: "Stop Being a Junior Developer",
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop",
      category: "career"
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
      </header> */}
    <Header/>
      {/* Main Content */}
      <main className="pt-20">
        {/* Back Navigation */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
          <Link href={"/mainpage"} className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-medium">
            <ArrowLeft size={20} />
            Back to articles
          </Link>
        </section>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-6 lg:px-8">
          <header className="mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-8">
              AI is taking your job
            </h1>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <span className="text-lg text-purple-600 dark:text-purple-400 font-medium">November 21st, 2024 • 4 min read</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Heart size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <MessageCircle size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Bookmark size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Share2 size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
            
            {/* Featured Image */}
            <div className="relative rounded-2xl overflow-hidden mb-12">
              <img 
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=600&fit=crop" 
                alt="AI taking your job"
                className="w-full h-80 lg:h-96 object-cover"
              />
            </div>

            {/* Article Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-medium">career</span>
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium">ai</span>
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium">productivity</span>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              The rise of artificial intelligence has sparked debates across industries about job displacement, automation, and the future of work. While AI is indeed transforming how we work, the narrative isn't as simple as "AI will replace all jobs."
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Artificial Intelligence is not just a buzzword anymore—it's a reality that's reshaping industries at an unprecedented pace. From automated customer service to AI-powered code generation, we're witnessing a fundamental shift in how work gets done.
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              But here's the thing: while AI is indeed taking over certain tasks, it's also creating new opportunities and changing the nature of existing roles rather than simply eliminating them entirely.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
              What jobs are AI doing at AI tools and Core
            </h2>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              In the tech industry, AI tools are becoming increasingly sophisticated. Code generation, automated testing, and even design work are being augmented or handled by AI systems. However, this doesn't mean developers are becoming obsolete.
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              Instead, developers are evolving their skill sets to work alongside AI tools, focusing on higher-level problem-solving, architecture decisions, and creative solutions that AI cannot replicate.
            </p>

            {/* Embedded Content */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">▶</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Meet Full Stack Developer's Symfony vs PHP The World</h3>
                  <p className="text-gray-600 dark:text-gray-400">Watch on YouTube</p>
                </div>
              </div>
              <div className="aspect-video bg-black rounded-lg mb-4">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">▶</span>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
              The Human Advantage: What AI Can't Do
            </h2>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              While AI excels at pattern recognition, data processing, and automation, there are several areas where human skills remain irreplaceable:
            </p>

            <ul className="list-disc pl-6 mb-8 space-y-3 text-lg text-gray-700 dark:text-gray-300">
              <li>Creative problem-solving and innovation</li>
              <li>Emotional intelligence and empathy</li>
              <li>Complex decision-making in ambiguous situations</li>
              <li>Building relationships and trust</li>
              <li>Ethical reasoning and moral judgment</li>
            </ul>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-12">
              The key is not to compete with AI, but to complement it. The most successful professionals of the future will be those who learn to leverage AI tools while developing uniquely human skills.
            </p>

            {/* Author Bio */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 mb-12">
              <div className="flex items-start gap-6">
                <img 
                  src="/lumiHead.svg" 
                  alt="Abdullah Khalid" 
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Abdullah Khalid</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Full-stack developer and tech writer passionate about AI, web development, and the future of work. Sharing insights from 8+ years in the industry.
                  </p>
                  <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
                    Learn More About Author →
                  </button>
                </div>
              </div>
            </div>

            {/* Social Sharing */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-12">
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                If you found this article helpful, you will love these as well.
              </p>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <Twitter size={16} />
                  Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                  <Linkedin size={16} />
                  Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Facebook size={16} />
                  Share
                </button>
              </div>
            </div>

            {/* Related Articles */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {relatedArticles.map((article) => (
                <div key={article.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-tight">
                    {article.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </article>
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
                  <Facebook size={28} />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <Linkedin size={28} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-lg">Blog</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-lg">About</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-lg">Contact</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-lg">Privacy</a></li>
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