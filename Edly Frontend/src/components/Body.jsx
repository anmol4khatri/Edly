import { Outlet } from 'react-router-dom';
import Header from './student/Header';
import Footer from './student/Footer';

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
