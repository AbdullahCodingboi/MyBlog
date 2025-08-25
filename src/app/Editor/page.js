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
// React Quill Component
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
  const [darkMode, setDarkMode] = useState(true);
  const [blogData, setBlogData] = useState({
    title: '',
    subtitle: '',
    content: '',
    featuredImage: '',
    tags: [],
    readTime: '',
    status: 'draft'
  });
  const [newTag, setNewTag] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleInputChange = (field, value) => {
    setBlogData(prev => ({
      ...prev,
      [field]: value
    }));
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

  const handleSave = async (status = 'draft') => {
    const dataToSave = {
      ...blogData,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Here you would call your API
    console.log('Saving blog:', dataToSave);
    
    // Example API call:
    // try {
    //   const response = await fetch('/api/blogs', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(dataToSave)
    //   });
    //   const result = await response.json();
    //   console.log('Blog saved:', result);
    // } catch (error) {
    //   console.error('Error saving blog:', error);
    // }
  };

  const handleImageUpload = () => {
    // Handle image upload logic
    console.log('Image upload clicked');
  };

  return (
    <div className={`min-h-screen bg-gray-900 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center gap-6">
              <Link href="/Mainpage" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                <ArrowLeft size={20} />
                <span className="font-medium">Back to Blog</span>
              </Link>
              <h1 className="text-2xl font-bold text-white font-mono">Create New Post</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsPreview(!isPreview)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors rounded-lg"
              >
                <Eye size={16} />
                {isPreview ? 'Edit' : 'Preview'}
              </button>
              
              <button
                onClick={() => handleSave('draft')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 transition-colors rounded-lg"
              >
                <Save size={16} />
                Save Draft
              </button>
              
              <button
                onClick={() => handleSave('published')}
                className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white hover:bg-purple-700 transition-colors rounded-lg font-medium"
              >
                Publish
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
                        onClick={() => handleInputChange('featuredImage', '')}
                        className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={handleImageUpload}
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
                  type="text"
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