import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  schema?: object;
}

export default function SEO({
  title,
  description,
  image,
  article = false,
  publishedTime,
  modifiedTime,
  schema
}: SEOProps) {
  const location = useLocation();
  const baseUrl = 'https://alvianzf.id';
  const currentUrl = `${baseUrl}${location.pathname}`;
  const defaultImage = `${baseUrl}/favicon.ico`; // Fallback image

  // Default values
  const siteTitle = 'Alvian Zachry Faturrahman - Program Manager | Technical Lead | Full Stack Engineer';
  const siteDescription = 'Program Manager, Technical Lead, and Full Stack Engineer with 13+ years of experience in software engineering, education, and technical hiring.';

  const finalTitle = title ? `${title} | Alvian Zachry Faturrahman` : siteTitle;
  const finalDescription = description || siteDescription;
  const finalImage = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : defaultImage;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

      {/* Article Specifics */}
      {article && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {article && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
