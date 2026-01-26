import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import ModernCard from '../components/ModernCard';

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const API_KEY = 'AIzaSyCw9p4Ar_wc9h3zOuaPb7JcdH3Lj8Ail_4';
        const BLOG_ID = '369044396031799467';
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
      <div className="min-h-screen bg-slate-50 pt-32 pb-20 flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-4 bg-brand-red rounded-full mb-4 animate-bounce"></div>
          <span className="text-slate-400 font-medium">Loading contents...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-20 justify-center flex">
        <ModernCard className="bg-red-50 border-red-100 max-w-md w-full text-center p-8">
          <p className="text-red-600 font-medium">{error}</p>
        </ModernCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Latest Thoughts
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Writings on random things I thought at that moment.
          </p>
        </motion.div>

        {/* Blog Posts Grid - 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <motion.a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <ModernCard className="flex flex-col justify-between p-5 hover:border-brand-red/30 transition-all h-full">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <div
                      className="text-sm text-slate-500 leading-relaxed line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: post.content
                          ? post.content.replace(/<[^>]+>/g, '').slice(0, 80) + '...'
                          : ''
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs font-medium mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center text-slate-400">
                      <Calendar className="w-3 h-3 mr-1" />
                      <time>{format(new Date(post.published), 'MMM d, yyyy')}</time>
                    </div>
                    <span className="text-brand-red group-hover:underline">Dive in →</span>
                  </div>
                </ModernCard>
              </motion.a>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-slate-100">
              <p className="text-slate-400">No blog posts found at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}