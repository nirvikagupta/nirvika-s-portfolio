import React, { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { useToast } from "@/hooks/use-toast";

const greetingsByCountry: Record<string, string> = {
  US: "Hey!! What's up? Feel free to contact me ✨",
  FR: "Bonjour ! N'hésitez pas à me contacter 💬",
  IN: "Namaste! Let's connect 🙏",
  KR: "안녕!! 자유롭게 메시지를 보내주세요 📩",
  default: "Hello there! Feel free to drop a message 💌"
};

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { toast } = useToast();
  const [greeting, setGreeting] = useState("Hello there! Feel free to drop a message 💌");
  const [isVisible, setIsVisible] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light"); // NEW

  // Geolocation-based greeting + theme
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const userCountry = data?.country_code;
        const customGreeting = greetingsByCountry[userCountry] || greetingsByCountry["default"];
        setGreeting(customGreeting);

        const timezone = data.timezone || 'UTC';
        const hour = parseInt(
          new Date().toLocaleString('en-US', { hour: '2-digit', hour12: false, timeZone: timezone })
        );
        if (hour >= 22 || hour < 6) {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      })
      .catch(() => {
        setGreeting(greetingsByCountry["default"]);
        setTheme("light");
      });
  }, []);

  // Animate on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { 
      if (sectionRef.current) observer.unobserve(sectionRef.current); 
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    emailjs.send(
      'service_17xy0hd',
      'template_9odaqwg',
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'nirvika23351@iiitd.ac.in',
      },
      'wC2hDoSM0FNhGOoUz'
    ).then(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out ✨",
        variant: "default",
      });
      setFormData({ name: '', email: '', message: '' });
    }).catch(() => {
      toast({
        title: "Failed to send",
        description: "Please try again later",
        variant: "destructive",
      });
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`py-20 transition-all duration-500 ${
        theme === 'dark' ? 'bg-purple-950 text-white' : 'bg-purple-200 text-gray-800'
      }`}
    >
      <div 
        className={`container px-4 mx-auto transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-16">
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {greeting}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className={`rounded-lg shadow-lg p-8 ${
            theme === 'dark' ? 'bg-purple-800 text-white' : 'bg-pink-50'
          }`}>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className={`block font-medium mb-2 ${theme === 'dark' ? 'text-pink-200' : 'text-pink-700'}`}>Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className={`block font-medium mb-2 ${theme === 'dark' ? 'text-pink-200' : 'text-pink-700'}`}>Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className={`block font-medium mb-2 ${theme === 'dark' ? 'text-pink-200' : 'text-pink-700'}`}>Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
