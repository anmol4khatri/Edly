import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/features/student/components/Header';
import Footer from '@/features/student/components/Footer';

const Body = () => {
  // Initialize dark mode on mount (default to dark)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
