
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Cursor from "@/components/Cursor";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Disable default cursor
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'default';
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-pink-purple bg-opacity-20">
      <Cursor />
      <NavBar />
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center px-4">
          <h1 className="text-7xl font-bold mb-4 text-nirvika-text font-loubag">404</h1>
          <p className="text-2xl text-nirvika-text mb-8">Oops! Page not found</p>
          <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <p className="text-nirvika-text mb-6">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link 
              to="/" 
              className="bg-nirvika-secondary hover:bg-nirvika-accent text-white font-medium px-6 py-3 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg inline-block"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
