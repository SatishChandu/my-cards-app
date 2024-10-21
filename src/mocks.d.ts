import { RestHandler } from 'msw';
import { SetupWorkerApi } from 'msw';

// Correct relative path for handlers.js
declare module '../mocks/handlers' {
  const handlers: RestHandler[];
  export { handlers };
}

// Correct relative path for browser.js
declare module './mocks/browser' {
  export const worker: SetupWorkerApi;
}
