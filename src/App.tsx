import { lazy, Suspense, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ScrollIndicator from '@/components/layout/ScrollIndicator';
import Navbar from '@/components/layout/Navbar';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import Footer from '@/components/layout/Footer';
import { trackPageView } from '@/lib/analytics';

// Lazy-loaded pages
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const Artist = lazy(() => import('@/pages/Artist'));
const Services = lazy(() => import('@/pages/Services'));
const Reviews = lazy(() => import('@/pages/Reviews'));
const Contact = lazy(() => import('@/pages/Contact'));
const Admin = lazy(() => import('@/pages/Admin'));

function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
  return null;
}

function RootLayout() {
  const location = useLocation();

  return (
    <div className="overflow-x-hidden w-full">
      <ScrollIndicator />
      <Navbar />
      <main className="overflow-x-hidden w-full">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <WhatsAppButton />
      <Footer />
      <RouteTracker />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/portfolio', element: <Portfolio /> },
      { path: '/artist', element: <Artist /> },
      { path: '/services', element: <Services /> },
      { path: '/reviews', element: <Reviews /> },
      { path: '/contact', element: <Contact /> },
      { path: '/admin', element: <Admin /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
