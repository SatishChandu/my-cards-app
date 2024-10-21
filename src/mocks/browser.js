import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Setup the service worker with the defined handlers
export const worker = setupWorker(...handlers);
