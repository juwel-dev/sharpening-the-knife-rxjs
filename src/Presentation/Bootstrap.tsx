import '@fontsource/roboto';
import './Style/main.css';

import { RouterProvider } from '@tanstack/react-router';
import type { FunctionComponent } from 'react';
import React, { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { router } from './Router/RouteDefinition';

const AppComponent: FunctionComponent = () => {
  return (
    <StrictMode>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </StrictMode>
  );
};

export const Bootstrap = {
  /**
   * initializes react and render main element
   */
  init: (): void => {
    const element = document.createElement('div');

    element.id = 'app';
    document.body.appendChild(element);

    createRoot(element).render(<AppComponent />);
  },
};
