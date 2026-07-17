import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, ChevronRight, Sparkles } from 'lucide-react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import { alpha } from '@mui/material/styles';
import SEO from '../components/SEO';
import { BLOGGER_API_KEY, BLOG_ID } from '../blogConfig';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${BLOGGER_API_KEY}&maxResults=500`;

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

  // Featured posts (first 12) and remaining posts for sidebar
  const featuredPosts = posts.slice(0, 12);
  const allPosts = posts;

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', pt: 16, pb: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Stack alignItems="center" spacing={2}>
          <Skeleton variant="circular" width={16} height={16} sx={{ bgcolor: 'primary.main' }} />
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            Loading contents...
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', pt: 16, pb: 10, display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ maxWidth: 448, width: '100%', textAlign: 'center', alignSelf: 'flex-start' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography sx={{ color: 'error.main', fontWeight: 500 }}>{error}</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', pt: 16, pb: 10 }}>
      <SEO
        title="Blog"
        description="Articles on software engineering, leadership, and random musings from a Program Manager & Technical Lead."
        keywords={[
          "Tech Blog", "Software Engineering Articles", "Leadership Thoughts",
          "Programming Tutorials", "Career Advice", "Technology Trends"
        ]}
      />
      <Container maxWidth="xl" sx={{ px: 3 }}>
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip
              icon={<Sparkles size={12} />}
              label="Engineering & Musings"
              size="small"
              sx={{
                mb: 2,
                fontWeight: 700,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'primary.main',
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                '& .MuiChip-icon': { color: 'primary.main' },
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.25rem', md: '3rem' },
                fontWeight: 700,
                color: 'text.primary',
                mb: 3,
              }}
            >
              Latest Thoughts
            </Typography>
            <Typography sx={{ fontSize: '1.125rem', color: 'text.secondary', maxWidth: 672, mx: 'auto' }}>
              Writings on random things I thought at that moment.
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {/* Blog Posts Grid - 12 posts, 3 columns on large screens */}
          <Grid size={{ xs: 12, lg: 9 }}>
            <Grid container spacing={3}>
              {featuredPosts.length > 0 ? (
                featuredPosts.map((post, index) => (
                  <Grid key={post.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      style={{ height: '100%' }}
                    >
                      <Card
                        sx={{
                          height: '100%',
                          '&:hover': { borderColor: (theme) => alpha(theme.palette.primary.main, 0.3) },
                          '&:hover .blog-card-title': { color: 'primary.main' },
                        }}
                      >
                        <CardActionArea
                          component={Link}
                          to={`/blog/${post.id}`}
                          sx={{ height: '100%' }}
                        >
                          <CardContent
                            sx={{
                              p: 2.5,
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Box>
                              <Typography
                                variant="h6"
                                component="h2"
                                className="blog-card-title"
                                sx={{
                                  fontSize: '1rem',
                                  fontWeight: 700,
                                  color: 'text.primary',
                                  mb: 1,
                                  transition: 'color 0.3s',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                }}
                              >
                                {post.title}
                              </Typography>
                              <Box
                                sx={{
                                  fontSize: '0.875rem',
                                  color: 'text.secondary',
                                  lineHeight: 1.625,
                                  display: '-webkit-box',
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: post.content
                                    ? post.content.replace(/<[^>]+>/g, '').slice(0, 80) + '...'
                                    : ''
                                }}
                              />
                            </Box>
                            <Stack
                              direction="row"
                              alignItems="center"
                              sx={{
                                justifyContent: 'space-between',
                                gap: 1,
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                mt: 2,
                                pt: 1.5,
                                borderTop: '1px solid',
                                borderColor: 'divider',
                              }}
                            >
                              <Stack direction="row" alignItems="center" sx={{ color: 'text.secondary' }}>
                                <Calendar size={12} style={{ marginRight: 4 }} />
                                <time>{format(new Date(post.published), 'MMM d, yyyy')}</time>
                              </Stack>
                              <Typography
                                component="span"
                                sx={{
                                  fontSize: 'inherit',
                                  fontWeight: 'inherit',
                                  color: 'primary.main',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  minHeight: 44,
                                  px: 1.5,
                                  my: -1.5,
                                  mr: -1.5,
                                }}
                              >
                                Dive in →
                              </Typography>
                            </Stack>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </motion.div>
                  </Grid>
                ))
              ) : (
                <Grid size={12}>
                  <Card sx={{ textAlign: 'center', py: 10 }}>
                    <Typography sx={{ color: 'text.secondary' }}>No blog posts found at the moment.</Typography>
                  </Card>
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* All Posts Sidebar */}
          <Grid size={{ xs: 12, lg: 3 }} component="aside">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Box sx={{ position: 'sticky', top: 112 }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <Typography variant="h6" component="h2" sx={{ fontSize: '1.125rem', fontWeight: 700, color: 'text.primary' }}>
                    All Posts
                  </Typography>
                  <Typography component="span" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                    ({allPosts.length})
                  </Typography>
                </Stack>
                <Card sx={{ p: 2, maxHeight: '60vh', overflowY: 'auto' }}>
                  <Stack spacing={1}>
                    {allPosts.map((post) => (
                      <Box
                        key={post.id}
                        component={Link}
                        to={`/blog/${post.id}`}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 1,
                          mx: -1,
                          borderRadius: 2,
                          textDecoration: 'none',
                          transition: 'background-color 0.3s',
                          '&:hover': { bgcolor: 'background.default' },
                          '&:hover .sidebar-post-title': { color: 'primary.main' },
                        }}
                      >
                        <Box component={ChevronRight} size={12} sx={{ color: 'text.secondary', mr: 1, flexShrink: 0 }} />
                        <Typography
                          className="sidebar-post-title"
                          sx={{
                            fontSize: '0.875rem',
                            color: 'text.secondary',
                            transition: 'color 0.3s',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {post.title}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Card>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
