# Architecture

The Alvian Zachry Faturrahman Portfolio Experience™ is built as a high-performance, Single Page Application (SPA) using modern web technologies.

## 🛠️ Tech Stack

### Frontend
- **React 19**: Leveraging the latest React features and improvements.
- **Vite**: Ultra-fast build tool and development server.
- **TypeScript**: Strict typing to catch errors early and improve maintainability.
- **Tailwind CSS**: Utility-first CSS framework for rapid and consistent styling.
- **Framer Motion**: Powering fluid animations and transitions.
- **React Router 6**: Client-side routing for seamless navigation.
- **React Helmet Async**: Managing dynamic head metadata for SEO/AIO.

### Infrastructure & Tools
- **Vercel**: Deployment and hosting.
- **Blogger API**: Used as a headless CMS for blog posts.
- **Custom Sitemap Generator**: A Node.js script to generate XML sitemaps.
- **Husky & Lint-Staged**: Pre-commit hooks for linting and testing.

## 🏗️ Project Structure

```text
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable UI components
│   ├── games/       # Arcade game components
│   └── __tests__/   # Component unit tests
├── context/         # React Context providers (Theme, etc.)
├── pages/           # Page components (Home, About, Experience)
├── stories/         # Storybook stories for components
├── types.ts         # Global TypeScript definitions
└── main.tsx         # Application entry point
```

## 🧪 Testing Strategy

The project follows a rigorous testing pyramid:

1.  **Unit Tests (Vitest)**: Testing individual components and utility functions in isolation.
2.  **Integration Tests**: Testing the interaction between multiple components.
3.  **End-to-End (E2E) Tests (Playwright)**: Verifying critical user flows across Chromium, Firefox, and WebKit.
4.  **Visual Testing (Storybook)**: Documenting components and catching visual regressions.

## 🎨 Theme Engine

The application features a custom theme engine implemented via React Context. It supports:
- **Light Mode**
- **Dark Mode**
- **Cyberpunk Mode**: A specialized high-contrast theme with distinct typography and color palettes.

## 🤖 SEO & AIO (AI Optimization)

The architecture includes a strong focus on being "AI-readable":
- **JSON-LD Schema**: Structured data to help search engines and AI models understand the content.
- **Semantic HTML5**: Proper usage of tags like `<header>`, `<footer>`, `<main>`, and `<section>`.
- **Dynamic Sitemap**: Ensuring all content is discoverable by crawlers.
