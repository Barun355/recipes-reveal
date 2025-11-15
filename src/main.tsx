import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingLayout from './pages/landing/layout';
import Landing from './pages/landing';
import { RecipesPage } from './pages/landing/recipes';
import { RecipeDetailPage } from './pages/landing/recipe-detail-page';
import VerifyEmailPage from './pages/verify-email';
import { LoginPage } from './pages/login';
import { SignupPage } from './pages/signup';
import ErrorPage from './pages/error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/recipes",
        element: <RecipesPage />,
      },
      {
        path: "/recipes/:id",
        element: <RecipeDetailPage />,
      },
    ],
  },
  {
    path: "/verify-email",
    element: <VerifyEmailPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
