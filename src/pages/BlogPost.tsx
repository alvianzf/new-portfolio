import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
import ModernCard from '../components/ModernCard';
import SEO from '../components/SEO';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: string;
  updated: string;
  url: string;
}

export default function BlogPost() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [otherPosts, setOtherPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const API_KEY = 'AIzaSyCw9p4Ar_wc9h3zOuaPb7JcdH3Lj8Ail_4';
        const BLOG_ID = '369044396031799467';
        const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=500`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch posts');

        const data = await response.json();
        const allPosts = data.items || [];

        // Find the current post
        const currentPost = allPosts.find((p: BlogPost) => p.id === postId);
        if (!currentPost) {
          setError('Post not found');
          return;
        }

        setPost(currentPost);
        // Get other posts (exclude current)
        setOtherPosts(allPosts.filter((p: BlogPost) => p.id !== postId).slice(0, 6));
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [postId]);

  // Calculate read time
  const calculateReadTime = (content: string) => {
    const text = content.replace(/<[^>]+>/g, '');
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Extract first image from content
  const extractImage = (content: string) => {
    const div = document.createElement('div');
    div.innerHTML = content;
    const img = div.querySelector('img');
    return img ? img.src : undefined;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-4 bg-brand-red rounded-full mb-4 animate-bounce"></div>
          <span className="text-slate-400 font-medium">Loading post...</span>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex justify-center">
        <ModernCard className="bg-red-50 border-red-100 max-w-md w-full text-center p-8">
          <p className="text-red-600 font-medium">{error || 'Post not found'}</p>
          <Link to="/blog" className="text-brand-red mt-4 inline-block hover:underline">
            ← Back to Blog
          </Link>
        </ModernCard>
      </div>
    );
  }

  const cleanContent = post.content.replace(/<[^>]+>/g, '');
  const description = cleanContent.slice(0, 160) + '...';
  const image = extractImage(post.content);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": image || "https://alvianzf.id/favicon.ico",
    "datePublished": post.published,
    "dateModified": post.updated || post.published,
    "author": {
      "@type": "Person",
      "name": "Alvian Zachry Faturrahman",
      "url": "https://alvianzf.id"
    },
    "description": description
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEO
        title={post.title}
        description={description}
        image={image}
        article={true}
        publishedTime={post.published}
        modifiedTime={post.updated || post.published}
        schema={blogSchema}
      />
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3"
          >
            {/* Back Button */}
            <Link
              to="/blog"
              className="inline-flex items-center text-slate-500 hover:text-brand-red transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            {/* Post Header */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time>{format(new Date(post.published), 'MMMM d, yyyy')}</time>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{calculateReadTime(post.content)}</span>
                </div>
              </div>
            </header>

            {/* Post Content */}
            <ModernCard className="p-6 md:p-10">
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </ModernCard>
          </motion.article>

          {/* Sidebar - Other Posts */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-28">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Other Posts</h2>
              <div className="space-y-4">
                {otherPosts.map((otherPost) => (
                  <Link
                    key={otherPost.id}
                    to={`/blog/${otherPost.id}`}
                    className="block group"
                  >
                    <ModernCard className="p-4 hover:border-brand-red/30 transition-all">
                      <h3 className="text-sm font-semibold text-slate-900 group-hover:text-brand-red transition-colors line-clamp-2 mb-2">
                        {otherPost.title}
                      </h3>
                      <div className="text-xs text-slate-400">
                        {format(new Date(otherPost.published), 'MMM d, yyyy')}
                      </div>
                    </ModernCard>
                  </Link>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
