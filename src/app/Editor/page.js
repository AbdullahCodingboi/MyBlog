'use client'
import { useState, useEffect, useRef } from 'react';
import { 
  Sun, 
  Moon, 
  Save, 
  Eye, 
  ArrowLeft,
  Plus,
  X,
  Upload,
  Image
} from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

// React Quill Component (unchanged)
const ReactQuill = ({ value, onChange, placeholder }) => {
  const quillRef = useRef(null);
  const [quillLoaded, setQuillLoaded] = useState(false);

  useEffect(() => {
    const loadQuill = async () => {
      if (typeof window !== 'undefined') {
        // Load Quill CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.min.css';
        document.head.appendChild(link);

        // Load Quill JS
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js';
        script.onload = () => {
          setQuillLoaded(true);
        };
        document.head.appendChild(script);
      }
    };

    loadQuill();
  }, []);

  useEffect(() => {
    if (quillLoaded && quillRef.current && window.Quill) {
      const quill = new window.Quill(quillRef.current, {
        theme: 'snow',
        placeholder: placeholder,
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            [{ 'align': [] }],
            ['blockquote', 'code-block'],
            [{ 'color': [] }, { 'background': [] }],
            ['clean']
          ]
        }
      });

      // Set initial content
      if (value) {
        quill.root.innerHTML = value;
      }

      // Handle text changes
      quill.on('text-change', () => {
        const content = quill.root.innerHTML;
        onChange(content);
      });

      // Custom styles for dark theme
      const style = document.createElement('style');
      style.textContent = `
        .ql-snow {
          border: 1px solid #374151 !important;
          border-radius: 12px !important;
          background: #1f2937 !important;
        }
        .ql-toolbar.ql-snow {
          border-bottom: 1px solid #374151 !important;
          background: #111827 !important;
          border-top-left-radius: 12px !important;
          border-top-right-radius: 12px !important;
        }
        .ql-container.ql-snow {
          border: none !important;
          background: #1f2937 !important;
          border-bottom-left-radius: 12px !important;
          border-bottom-right-radius: 12px !important;
          min-height: 300px !important;
        }
        .ql-editor {
          color: #ffffff !important;
          font-size: 16px !important;
          line-height: 1.6 !important;
          min-height: 300px !important;
        }
        .ql-editor.ql-blank::before {
          color: #9ca3af !important;
        }
        .ql-snow .ql-tooltip {
          background: #1f2937 !important;
          border: 1px solid #374151 !important;
          color: #ffffff !important;
        }
        .ql-snow .ql-tooltip input[type=text] {
          background: #374151 !important;
          color: #ffffff !important;
          border: 1px solid #4b5563 !important;
        }
        .ql-snow .ql-picker-options {
          background: #1f2937 !important;
          border: 1px solid #374151 !important;
        }
        .ql-snow .ql-picker-item {
          color: #ffffff !important;
        }
        .ql-snow .ql-picker-item:hover {
          background: #374151 !important;
        }
        .ql-snow .ql-stroke {
          stroke: #d1d5db !important;
        }
        .ql-snow .ql-fill {
          fill: #d1d5db !important;
        }
        .ql-snow .ql-picker-label {
          color: #d1d5db !important;
        }
        .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
          border-color: #6366f1 !important;
        }
        .ql-toolbar.ql-snow button:hover .ql-stroke {
          stroke: #ffffff !important;
        }
        .ql-toolbar.ql-snow button:hover .ql-fill {
          fill: #ffffff !important;
        }
        .ql-toolbar.ql-snow button.ql-active .ql-stroke {
          stroke: #8b5cf6 !important;
        }
        .ql-toolbar.ql-snow button.ql-active .ql-fill {
          fill: #8b5cf6 !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, [quillLoaded, placeholder]);

  return (
    <div className="quill-wrapper">
      <div ref={quillRef} />
    </div>
  );
};

export default function BlogCreationPage() {
  // UI States
  const [darkMode, setDarkMode] = useState(true);
  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  
  // Form States
  const [blogData, setBlogData] = useState({
    title: '',
    subtitle: '',
    content: '',
    featuredImage: '',
    tags: [],
    readTime: '',
    status: 'draft', // 'draft' | 'published'
    author: {
      name: '', // You might want to get this from user context
      email: '', // You might want to get this from user context
      id: '' // You might want to get this from user context
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      slug: '' // Auto-generated from title or custom
    },
    publishDate: null, // Will be set when publishing
    category: '', // You might want to add category selection
    excerpt: '' // Auto-generated from content or custom
  });
  
  const [newTag, setNewTag] = useState('');

  // API Configuration - Replace with your actual endpoint
  const API_BASE_URL = 'http://localhost:5000'; // CHANGE THIS TO YOUR ACTUAL API URL
  const API_ENDPOINTS = {
    createBlog: `${API_BASE_URL}/api/blogs`,
    uploadImage: `${API_BASE_URL}/api/blog/68b33ab6b5caaff2577de81e/images`
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleInputChange = (field, value) => {
    setBlogData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-generate excerpt if content changes
    if (field === 'content') {
      const textContent = value.replace(/<[^>]*>/g, ''); // Strip HTML
      const excerpt = textContent.substring(0, 160) + (textContent.length > 160 ? '...' : '');
      setBlogData(prev => ({
        ...prev,
        excerpt: excerpt
      }));
    }

    // Auto-generate slug if title changes
    if (field === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
      
      setBlogData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          slug: slug,
          metaTitle: value // Also set as default meta title
        }
      }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !blogData.tags.includes(newTag.trim())) {
      setBlogData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setBlogData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Image Upload Function
 const handleImageUpload = async (input) => {
  try {
    setIsLoading(true);

    // Check if input is a file or a URL
    if (input instanceof File) {
      // It's a real file
      const formData = new FormData();
      formData.append('image', input);
      formData.append('folder', 'blog-images');

      const response = await axios.post(API_ENDPOINTS.uploadImage, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // <-- multipart for files
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YjQyMjI5ZDRmYzQwZDI2ZjVlZTgxNSIsImlhdCI6MTc1Njc0MjQxMSwiZXhwIjoxNzU2ODI4ODExfQ.WASeHzF4IVjyDVEPHqRs1SdunLBoH6ygbz7gqJ5MKgc',
        },
      });

      if (response.data.imageUrl) {
        handleInputChange('featuredImage', response.data.imageUrl);
        setSaveMessage('Image uploaded successfully!');
      }
    } else if (typeof input === 'string') {
      // It's a URL
      handleInputChange('featuredImage', input);
      setSaveMessage('Image URL set successfully!');
    } else {
      throw new Error('Invalid input type. Must be a File or URL string.');
    }

    setTimeout(() => setSaveMessage(''), 3000);
  } catch (error) {
    console.error('Error uploading image:', error);
    setSaveMessage('Failed to upload image. Please try again.');
    setTimeout(() => setSaveMessage(''), 3000);
  } finally {
    setIsLoading(false);
  }
};
const handleDeleteImage=async(id)=>{
  try{
    let response=await axios.delete(`http://localhost:5000/api/${id}/images/`,{
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YjQyMjI5ZDRmYzQwZDI2ZjVlZTgxNSIsImlhdCI6MTc1Njc0MjQxMSwiZXhwIjoxNzU2ODI4ODExfQ.WASeHzF4IVjyDVEPHqRs1SdunLBoH6ygbz7gqJ5MKgc',
      },
    });

    if (response.data.success) {
      setSaveMessage('Image deleted successfully!');
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    setSaveMessage('Failed to delete image. Please try again.');
  }finally{
    handleInputChange('featuredImage', '')
  }
}
  // Main Save Function
  const handleSave = async (status = 'draft') => {
    try {
      setIsLoading(true);
      setSaveMessage('');

      // Validate required fields
      if (!blogData.title.trim()) {
        setSaveMessage('Title is required!');
        setTimeout(() => setSaveMessage(''), 3000);
        return;
      }

      if (!blogData.content.trim()) {
        setSaveMessage('Content is required!');
        setTimeout(() => setSaveMessage(''), 3000);
        return;
      }

      // Prepare the data to send
      const dataToSend = {
        // Basic blog information
        title: blogData.title.trim(),
        subtitle: blogData.subtitle.trim(),
        content: blogData.content,
        excerpt: blogData.excerpt,
        featuredImage: blogData.featuredImage,
        tags: blogData.tags,
        readTime: blogData.readTime,
        category: blogData.category,
        
        // Status and dates
        status: status,
        publishDate: status === 'published' ? new Date().toISOString() : null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        
        // SEO data
        seo: {
          metaTitle: blogData.seo.metaTitle || blogData.title,
          metaDescription: blogData.seo.metaDescription || blogData.excerpt,
          slug: blogData.seo.slug
        },
        
        // Author information (you might get this from user context/auth)
        author: {
          name: blogData.author.name || 'Anonymous',
          email: blogData.author.email,
          id: blogData.author.id
        },
        
        // Additional metadata
        wordCount: blogData.content.replace(/<[^>]*>/g, '').split(' ').length,
        language: 'en', // You might want to make this dynamic
        featured: false, // You might want to add a toggle for this
        allowComments: true, // You might want to add a toggle for this
      };

      console.log('Sending blog data:', dataToSend);

      const response = await axios.post("http://localhost:5000/api/blog", dataToSend, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YjQyMjI5ZDRmYzQwZDI2ZjVlZTgxNSIsImlhdCI6MTc1Njc0NTg4MCwiZXhwIjoxNzU2ODMyMjgwfQ.FDpfVvR0UuZLdY-f7x0MpsowBTSSRPeIAxpOcsMjbXI"
          // Add authentication headers if needed
          // 'Authorization': `Bearer ${userToken}`,
        },
      });

      if (response.data.success) {
        setSaveMessage(`Blog ${status === 'published' ? 'published' : 'saved as draft'} successfully!`);
        
        // Optionally update the blogData with the response (like ID, etc.)
        if (response.data.blog) {
          setBlogData(prev => ({
            ...prev,
            id: response.data.blog.id,
            status: status
          }));
        }
      }

    } catch (error) {
      console.error('Error saving blog:', error);
      
      if (error.response) {
        // Server responded with error status
        setSaveMessage(`Error: ${error.response.data.message || 'Failed to save blog'}`);
      } else if (error.request) {
        // Request was made but no response received
        setSaveMessage('Network error. Please check your connection.');
      } else {
        // Something else happened
        setSaveMessage('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => setSaveMessage(''), 5000);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-900 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                <ArrowLeft size={20} />
                <span className="font-medium">Back to Blog</span>
              </Link>
              <h1 className="text-2xl font-bold text-white font-mono">Create New Post</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Save Message */}
              {saveMessage && (
                <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  saveMessage.includes('Error') || saveMessage.includes('Failed') || saveMessage.includes('required')
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : 'bg-green-500/20 text-green-300 border border-green-500/30'
                }`}>
                  {saveMessage}
                </div>
              )}

              <button
                onClick={() => setIsPreview(!isPreview)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors rounded-lg"
              >
                <Eye size={16} />
                {isPreview ? 'Edit' : 'Preview'}
              </button>
              
              <button
                onClick={() => handleSave('draft')}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 transition-colors rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={16} />
                {isLoading ? 'Saving...' : 'Save Draft'}
              </button>
              
              <button
                onClick={() => handleSave('published')}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white hover:bg-purple-700 transition-colors rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Publishing...' : 'Publish'}
              </button>

              <button
                onClick={toggleDarkMode}
                className="p-3 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition-all duration-200"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24">
        <div className="max-w-5xl mx-auto px-8 lg:px-12 py-16">
          {!isPreview ? (
            // Editor View
            <div className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-lg font-medium text-white mb-3">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={blogData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter your blog title..."
                    className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors placeholder-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="subtitle" className="block text-lg font-medium text-white mb-3">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    id="subtitle"
                    value={blogData.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    placeholder="Enter a brief subtitle or description..."
                    className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-lg font-medium text-white mb-3">
                  Featured Image
                </label>
                <div className="space-y-4">
                  {blogData.featuredImage ? (
                    <div className="relative rounded-xl overflow-hidden">
                      <img 
                        src={blogData.featuredImage} 
                        alt="Featured" 
                        className="w-full h-64 object-cover"
                      />
                      <button
                        onClick={() =>handleDeleteImage(featuredImage.imageId)}
                        className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            handleImageUpload(file);
                          }
                        };
                        input.click();
                      }}
                      className="border-2 border-dashed border-gray-600 rounded-xl p-12 text-center cursor-pointer hover:border-gray-500 transition-colors"
                    >
                      <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-400 text-lg">Click to upload featured image</p>
                      <p className="text-gray-500 text-sm mt-2">Or drag and drop an image here</p>
                    </div>
                  )}
                  
                  <input
                    type="url"
                    value={blogData.featuredImage}
                    onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                    placeholder="Or paste image URL..."
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-lg font-medium text-white mb-3">
                  Tags
                </label>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blogData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600 text-white rounded-full text-sm"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:bg-purple-700 rounded-full p-0.5"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag..."
                      className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors placeholder-gray-400"
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    />
                    <button
                      onClick={addTag}
                      className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Read Time */}
              <div>
                <label htmlFor="readTime" className="block text-lg font-medium text-white mb-3">
                  Estimated Read Time
                </label>
                <input
                  type="number"
                  id="readTime"
                  value={blogData.readTime}
                  onChange={(e) => handleInputChange('readTime', e.target.value)}
                  placeholder="e.g., 5 min read"
                  className="w-full max-w-xs px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors placeholder-gray-400"
                />
              </div>

              {/* Content Editor */}
              <div>
                <label className="block text-lg font-medium text-white mb-3">
                  Content *
                </label>
                <ReactQuill
                  value={blogData.content}
                  onChange={(value) => handleInputChange('content', value)}
                  placeholder="Start writing your blog post..."
                />
              </div>
            </div>
          ) : (
            // Preview View
            <div className="max-w-4xl mx-auto">
              <article className="space-y-8">
                <header className="space-y-6">
                  <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                    {blogData.title || 'Your Blog Title'}
                  </h1>
                  
                  {blogData.subtitle && (
                    <p className="text-xl text-gray-400 leading-relaxed">
                      {blogData.subtitle}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 text-lg text-purple-400">
                    <span>November 25th, 2024</span>
                    {blogData.readTime && (
                      <>
                        <span>•</span>
                        <span>{blogData.readTime}</span>
                      </>
                    )}
                  </div>

                  {blogData.featuredImage && (
                    <div className="rounded-2xl overflow-hidden">
                      <img 
                        src={blogData.featuredImage} 
                        alt={blogData.title}
                        className="w-full h-80 lg:h-96 object-cover"
                      />
                    </div>
                  )}

                  {blogData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {blogData.tags.map((tag, index) => (
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

                <div className="prose prose-lg prose-invert max-w-none">
                  <div 
                    className="text-lg text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blogData.content || '<p>Your blog content will appear here...</p>' }}
                  />
                </div>
              </article>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}