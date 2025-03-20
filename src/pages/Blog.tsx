import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Blogger API key and blog ID
        const API_KEY = 'AIzaSyCw9p4Ar_wc9h3zOuaPb7JcdH3Lj8Ail_4';
        const BLOG_ID = '369044396031799467';
        
        // Blogger API URL
        const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch posts');
        
        const data = await response.json();
        setPosts(data.items || []);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-blue-400">Blog Posts</h1>
          <div className="space-y-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <article key={post.id} className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors duration-300">
                  <h2 className="text-2xl font-semibold mb-4">
                    <a href={post.url} className="text-blue-400 hover:text-blue-300 transition-colors">
                      {post.title}
                    </a>
                  </h2>
                  <div className="flex items-center text-gray-400 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <time>{format(new Date(post.published), 'MMMM d, yyyy')}</time>
                  </div>
                  <div
                    className="prose prose-invert max-w-none text-gray-300"
                    dangerouslySetInnerHTML={{ 
                      __html: post.content 
                        ? post.content.slice(0, 300) + (post.content.length > 300 ? '...' : '')
                        : ''
                    }}
                  />
                  <a
                    href={post.url}
                    className="inline-block mt-4 text-blue-400 hover:text-blue-300 font-medium group"
                  >
                    Read more <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">→</span>
                  </a>
                </article>
              ))
            ) : (
              <p className="text-center text-gray-400">No posts found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}