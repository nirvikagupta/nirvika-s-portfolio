
import React from 'react';
import Cursor from "@/components/Cursor";
import NavBar from "@/components/NavBar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Contact = () => {
  // Disable default cursor
  React.useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'default';
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-pink-purple bg-opacity-20">
      <Cursor />
      <NavBar />
      <div className="pt-20 pb-10 bg-nirvika-bg-light">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-5xl font-bold text-nirvika-text mb-6 font-loubag">Contact Me</h1>
          <p className="text-xl text-nirvika-text opacity-80 max-w-2xl mx-auto">
            Reach out to discuss projects, collaborations, or just to say hello
          </p>
        </div>
      </div>
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Contact;
