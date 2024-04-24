import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import FormPage from './FormPage';
import ApiUsagePage from './ApiUsage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { 
        path: "",
        element: <Home />
      },
      {
        path: "form",
        element: <FormPage />,
      },
      {
        path: "usage",
        element: <ApiUsagePage />,
      },
    ],
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);


