import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { alpha } from '@mui/material/styles';
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
      <Box sx={{ minHeight: '100vh', pt: 16, pb: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Stack alignItems="center" spacing={2}>
          <Skeleton variant="circular" width={16} height={16} sx={{ bgcolor: 'primary.main' }} />
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            Loading post...
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Box sx={{ minHeight: '100vh', pt: 16, pb: 10, display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ maxWidth: 448, width: '100%', textAlign: 'center', alignSelf: 'flex-start' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography sx={{ color: 'error.main', fontWeight: 500 }}>{error || 'Post not found'}</Typography>
            <Typography
              component={Link}
              to="/blog"
              sx={{
                color: 'primary.main',
                mt: 2,
                display: 'inline-block',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              ← Back to Blog
            </Typography>
          </CardContent>
        </Card>
      </Box>
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
    <Box sx={{ minHeight: '100vh', pt: 16, pb: 10 }}>
      <SEO
        title={post.title}
        description={description}
        image={image}
        article={true}
        publishedTime={post.published}
        modifiedTime={post.updated || post.published}
        schema={blogSchema}
      />
      <Container maxWidth="xl" sx={{ px: 3 }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid size={{ xs: 12, lg: 9 }} component="article">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Back Button */}
              <Button
                component={Link}
                to="/blog"
                startIcon={<ArrowLeft size={16} />}
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  px: 0,
                  '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
                }}
              >
                Back to Blog
              </Button>

              {/* Post Header */}
              <Box component="header" sx={{ mb: 4 }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '1.875rem', md: '2.25rem' },
                    fontWeight: 700,
                    color: 'text.primary',
                    mb: 2,
                    lineHeight: 1.25,
                  }}
                >
                  {post.title}
                </Typography>
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  alignItems="center"
                  gap={2}
                  sx={{ color: 'text.secondary', fontSize: '0.875rem' }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Calendar size={16} />
                    <time>{format(new Date(post.published), 'MMMM d, yyyy')}</time>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Clock size={16} />
                    <span>{calculateReadTime(post.content)}</span>
                  </Stack>
                </Stack>
              </Box>

              {/* Post Content */}
              <Card>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                  <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Sidebar - Other Posts */}
          <Grid size={{ xs: 12, lg: 3 }} component="aside">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Box sx={{ position: 'sticky', top: 112 }}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ fontSize: '1.125rem', fontWeight: 700, color: 'text.primary', mb: 2 }}
                >
                  Other Posts
                </Typography>
                <Stack spacing={2}>
                  {otherPosts.map((otherPost) => (
                    <Card
                      key={otherPost.id}
                      sx={{
                        '&:hover': { borderColor: (theme) => alpha(theme.palette.primary.main, 0.3) },
                        '&:hover .other-post-title': { color: 'primary.main' },
                      }}
                    >
                      <CardActionArea component={Link} to={`/blog/${otherPost.id}`}>
                        <CardContent sx={{ p: 2 }}>
                          <Typography
                            variant="h6"
                            component="h3"
                            className="other-post-title"
                            sx={{
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              color: 'text.primary',
                              transition: 'color 0.3s',
                              mb: 1,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {otherPost.title}
                          </Typography>
                          <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                            {format(new Date(otherPost.published), 'MMM d, yyyy')}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))}
                </Stack>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
