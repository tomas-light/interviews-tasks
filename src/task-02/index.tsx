import { createRoot } from 'react-dom/client';
import { worker } from './mock-api/worker';
import { App } from './App';

await worker.start();

const element = document.querySelector('html > body');
if (element) {
  const root = createRoot(element);
  root.render(<App />);
} else {
  console.warn('root element is not found in document');
}
