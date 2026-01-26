import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { BookOpen, Calendar } from 'lucide-react';
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
            Writings on software architecture, leadership, and tech trends.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="max-w-4xl mx-auto space-y-8">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ModernCard className="group hover:border-brand-red/30 transition-all">
                  <article className="p-2">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-red transition-colors">
                      <a href={post.url} target="_blank" rel="noopener noreferrer">
                        {post.title}
                      </a>
                    </h2>

                    <div className="flex items-center text-slate-400 mb-6 text-sm font-medium">
                      <Calendar className="w-4 h-4 mr-2" />
                      <time>
                        {format(new Date(post.published), 'MMMM d, yyyy')}
                      </time>
                    </div>

                    <div
                      className="text-slate-600 leading-relaxed mb-6 line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: post.content
                          ? post.content.replace(/<[^>]+>/g, '').slice(0, 250) + '...'
                          : ''
                      }}
                    />

                    <div className="flex justify-end">
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-red font-medium hover:text-blue-700 inline-flex items-center"
                      >
                        Read Article <BookOpen className="w-4 h-4 ml-2" />
                      </a>
                    </div>
                  </article>
                </ModernCard>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
              <p className="text-slate-400">No blog posts found at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}