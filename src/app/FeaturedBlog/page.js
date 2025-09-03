'use client'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link';
import { Moon, Sun, ArrowRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';
const FeaturedBlogs = () => {
const [articles, setArticles] = useState([
   
  ]);
  const ImportBlogs=async()=>{
    try{
      const response=await axios.get('http://localhost:5000/api/blog/');
      setArticles(response.data);
    }catch(error){
      console.error("Error fetching blogs:", error);
    }
  }
    
    useEffect(() => {
      ImportBlogs();
    }, [])
    
  return (
    <> <section className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
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
     {articles.map((article, index) => (
  <Link href={`/Blogpost/${article._id}`} key={article._id} className="group cursor-pointer">
    <div className="relative overflow-hidden rounded-3xl aspect-[4/3] mb-8">
      <img
        src={article.featuredImage || '/default-blog-image.jpg'}
        alt={article.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {index === 0 && (
        <div className="absolute bottom-8 left-8">
          <span className="bg-black/80 text-white text-lg px-6 py-3 rounded-xl backdrop-blur-sm font-medium">
            Latest
          </span>
        </div>
      )}
    </div>
    <div className="space-y-4">
      <p className="text-gray-500 dark:text-gray-400 font-semibold text-lg">
        {new Date(article.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })} • {article.estimatedReadingTime || 1} min read
      </p>
      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-tight">
        {article.title}
      </h3>
    </div>
  </Link>
))}
      </div>
    </section>
    </>
  )
}

export default FeaturedBlogs