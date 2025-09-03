'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Header from '../../header/page';
import { Moon, Sun, ArrowLeft, Share2, Heart, MessageCircle, Bookmark, Twitter, Linkedin, Facebook } from 'lucide-react';
import Link from 'next/link';

export default function BlogPost() {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`http://localhost:5000/api/blog/${id}`);
        setBlogPost(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch blog post');
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogPost();
    }
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setIsSubmittingComment(true);
      const response = await axios.post(`http://localhost:5000/api/blog/${id}/comment`, {
        content: newComment.trim()
      });
      
      // Update the blog post with the new comment
      setBlogPost(prev => ({
        ...prev,
        comments: [...prev.comments, response.data.comment]
      }));
      
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
      alert(err.response?.data?.message || 'Failed to add comment. Please try again.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-4 w-1/4"></div>
              <div className="h-16 bg-gray-300 dark:bg-gray-700 rounded mb-8"></div>
              <div className="h-80 bg-gray-300 dark:bg-gray-700 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Blog Post</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">{error}</p>
              <Link href="/mainpage" className="text-purple-600 hover:text-purple-700 font-medium">
                ← Back to articles
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Blog not found
  if (!blogPost) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main className="pt-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Blog Post Not Found</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
              <Link href="/mainpage" className="text-purple-600 hover:text-purple-700 font-medium">
                ← Back to articles
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      {/* Main Content */}
      <main className="pt-20">
        {/* Back Navigation */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
          <Link href="/mainpage" className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors font-medium">
            <ArrowLeft size={20} />
            Back to articles
          </Link>
        </section>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-6 lg:px-8">
          <header className="mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-8">
              {blogPost.title}
            </h1>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <span className="text-lg text-purple-600 dark:text-purple-400 font-medium">
                  {new Date(blogPost.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} • {blogPost.estimatedReadingTime || Math.ceil(blogPost.content.split(' ').length / 200)} min read
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Heart size={20} className="text-gray-600 dark:text-gray-400" />
                  <span className="ml-1 text-sm">{blogPost.likes?.length || 0}</span>
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <MessageCircle size={20} className="text-gray-600 dark:text-gray-400" />
                  <span className="ml-1 text-sm">{blogPost.comments?.length || 0}</span>
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
            {blogPost.featuredImage && (
              <div className="relative rounded-2xl overflow-hidden mb-12">
                <img 
                  src={blogPost.featuredImage} 
                  alt={blogPost.title}
                  className="w-full h-80 lg:h-96 object-cover"
                />
              </div>
            )}

            {/* Article Tags */}
            {blogPost.tags && blogPost.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-8">
                {blogPost.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div 
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />

            {/* Author Bio */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 mb-12 mt-12">
              <div className="flex items-start gap-6">
                <img 
                  src="/lumiHead.svg" 
                  alt="Author" 
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {blogPost.author?.username || 'Author'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Full-stack developer and tech writer passionate about AI, web development, and the future of work. Sharing insights from years in the industry.
                  </p>
                  <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
                    Learn More About Author →
                  </button>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-12 mb-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Comments ({blogPost.comments?.length || 0})
              </h3>
              
              {/* Add Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-12">
                <div className="mb-4">
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Add a comment
                  </label>
                  <textarea
                    id="comment"
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Share your thoughts..."
                    disabled={isSubmittingComment}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmittingComment || !newComment.trim()}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {isSubmittingComment ? 'Posting...' : 'Post Comment'}
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {blogPost.comments && blogPost.comments.length > 0 ? (
                  blogPost.comments.map((comment, index) => (
                    <div key={comment._id || index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <img 
                          src="/lumiHead.svg" 
                          alt={comment.author?.username || 'Anonymous'} 
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {comment.author?.username || 'Anonymous'}
                            </h4>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              }) : 'Just now'}
                            </span>
                          </div>
                          <div 
                            className="text-gray-700 dark:text-gray-300 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: comment.content || comment.text || comment }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageCircle size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  </div>
                )}
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