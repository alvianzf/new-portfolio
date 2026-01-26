import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export default function SEO() {
  const location = useLocation();
  const baseUrl = 'https://alvianzf.id';
  const currentUrl = `${baseUrl}${location.pathname}`;

  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Alvian Zachry Faturrahman - Program Manager | Technical Lead | Full Stack Engineer';
      case '/experience':
        return 'Professional Experience - Alvian Zachry Faturrahman';
      case '/blog':
        return 'Blog - Alvian Zachry Faturrahman';
      default:
        return 'Alvian Zachry Faturrahman Portfolio';
    }
  };

  const getDescription = () => {
    switch (location.pathname) {
      case '/':
        return 'Program Manager, Technical Lead, and Full Stack Engineer with 13+ years of experience in software engineering, education, and technical hiring.';
      case '/experience':
        return 'Explore the professional journey of Alvian Zachry Faturrahman, from leading technical teams to designing scalable curricula and hiring top engineering talent.';
      case '/blog':
        return 'Technical articles covering software engineering, cloud infrastructure, DevOps, technical hiring, and curriculum development.';
      default:
        return 'Portfolio and professional insights of Alvian Zachry Faturrahman, an expert in software engineering, program management, and technical assessment.';
    }
  };

  return (
    <Helmet>
      <title>{getTitle()}</title>
      <meta name="description" content={getDescription()} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={getTitle()} />
      <meta property="og:description" content={getDescription()} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={getTitle()} />
      <meta name="twitter:description" content={getDescription()} />
    </Helmet>
  );
}
