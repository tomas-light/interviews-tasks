import { createRoot } from 'react-dom/client';
import { App } from './App';

const element = document.querySelector('html > body');
if (element) {
  const root = createRoot(element);
  root.render(<App />);
} else {
  console.warn('root element is not found in document');
}
