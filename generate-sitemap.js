import fs from 'fs';

const baseUrl = 'https://alvianzf.id';
const API_KEY = 'AIzaSyCw9p4Ar_wc9h3zOuaPb7JcdH3Lj8Ail_4';
const BLOG_ID = '369044396031799467';
const staticPages = ['/', '/experience', '/blog', '/mentorship'];

async function generateSitemap() {
  try {
    console.log('Fetching blog posts...');
    const response = await fetch(
      `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=500`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const data = await response.json();
    const posts = data.items || [];
    
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