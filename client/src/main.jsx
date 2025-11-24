import React, { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';

const App = React.lazy(() => import('./App.jsx'));

const RootFallback = () => (
  <div className="h-screen flex items-center justify-center text-gray-500">
    Loading...
  </div>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<RootFallback />}>
        <App />
      </Suspense>
    </Provider>
  </StrictMode>
);
