import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { BlogPost } from '../types';
import { Calendar } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Replace with your WordPress site URL
        const response = await fetch('https://your-wordpress-site.com/wp-json/wp/v2/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
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
            {posts.map((post) => (
              <article key={post.id} className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors duration-300">
                <h2 className="text-2xl font-semibold mb-4">
                  <a href={post.link} className="text-blue-400 hover:text-blue-300 transition-colors">
                    {post.title.rendered}
                  </a>
                </h2>
                <div className="flex items-center text-gray-400 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
                </div>
                <div
                  className="prose prose-invert max-w-none text-gray-300"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <a
                  href={post.link}
                  className="inline-block mt-4 text-blue-400 hover:text-blue-300 font-medium group"
                >
                  Read more <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">→</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}