import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';

export const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          {component}
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export * from '@testing-library/react';
