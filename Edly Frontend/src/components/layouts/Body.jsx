import { Outlet } from 'react-router-dom';
import Header from '@/features/student/components/Header';
import Footer from '@/features/student/components/Footer';

const Body = () => {
  return (
    <div className="min-h-screen dark bg-background text-foreground">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
