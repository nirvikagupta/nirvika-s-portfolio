
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-nirvika-primary py-12">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="font-bold text-2xl text-nirvika-text font-loubag">
              Nirvika
            </Link>
            <p className="mt-2 text-nirvika-text opacity-80">
              Creating beautiful digital experiences
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-nirvika-text">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-nirvika-text opacity-80 hover:opacity-100 transition-opacity">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="text-nirvika-text opacity-80 hover:opacity-100 transition-opacity">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-nirvika-text opacity-80 hover:opacity-100 transition-opacity">
                    About Me
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-nirvika-text opacity-80 hover:opacity-100 transition-opacity">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-3 text-nirvika-text">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-nirvika-text opacity-80 hover:opacity-100 transition-opacity text-xl">
                  ✉️
                </a>
                <a href="#" className="text-nirvika-text opacity-80 hover:opacity-100 transition-opacity text-xl">
                  🔗
                </a>
                <a href="#" className="text-nirvika-text opacity-80 hover:opacity-100 transition-opacity text-xl">
                  📸
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-nirvika-text border-opacity-20 text-center">
          <p className="text-nirvika-text opacity-70">
            &copy; {new Date().getFullYear()} Nirvika's Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
