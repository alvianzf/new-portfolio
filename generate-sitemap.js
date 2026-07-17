import fs from 'fs';

// Minimal .env loader (node doesn't read .env; avoids a dotenv dependency)
if (fs.existsSync('.env')) {
  for (const line of fs.readFileSync('.env', 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const baseUrl = 'https://alvianzf.id';
// Set BLOGGER_API_KEY (or VITE_BLOGGER_API_KEY) in the environment; the key
// must be referrer/API-restricted in Google Cloud Console.
const API_KEY = process.env.BLOGGER_API_KEY || process.env.VITE_BLOGGER_API_KEY;
const BLOG_ID = '369044396031799467';
const staticPages = [
  '/',
  '/about',
  '/experience',
  '/blog', 
  '/mentorship', 
  '/tools/thesis-creator',
  '/tools/whatsapp-formatter',
  '/tools/markdown-to-pdf',
  '/tools/database-playground',
  '/games/bug-squash',
  '/games/quick-sync',
  '/games/elusive-deploy',
  '/games/learn-flex',
  '/games/learn-typescript'
];

async function generateSitemap() {
  try {
    let posts = [];
    if (!API_KEY) {
      console.warn('BLOGGER_API_KEY not set — generating sitemap without blog posts.');
    } else {
      console.log('Fetching blog posts...');
      const response = await fetch(
        `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=500`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }

      const data = await response.json();
      posts = data.items || [];
    }

    console.log(`Found ${posts.length} posts.`);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>daily</changefreq>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
  </url>`)
    .join('')}
  ${posts
    .map(post => `
  <url>
    <loc>${baseUrl}/blog/${post.id}</loc>
    <lastmod>${new Date(post.updated).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`)
    .join('')}
</urlset>`;

    fs.writeFileSync('public/sitemap.xml', sitemap);
    console.log('Sitemap generated successfully at public/sitemap.xml');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();