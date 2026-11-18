import { ViteReactSSG } from 'vite-react-ssg/single-page';
import '@fontsource-variable/inter';
import '@fontsource-variable/outfit';
import '@fontsource-variable/jetbrains-mono';
import './index.css';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx';

// Pre-rendered at build time (vite-react-ssg) so crawlers and AI bots that do
// not execute JavaScript still receive the full portfolio HTML.
export const createRoot = ViteReactSSG(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
