import React, { useEffect, useRef, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";

const AvatarSection = () => {
  const [greeting, setGreeting] = useState("Hi there! 👋");
  const [expression, setExpression] = useState("😊");
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const navigate = useNavigate();
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning! 🌞");
    else if (hour < 18) setGreeting("Good afternoon! ☀️");
    else setGreeting("Good evening! 🌙");
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog, isBotTyping]);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase().trim();

    if (msg.includes("hi") || msg.includes("hello")) {
      setExpression("😊");
      setOptions(["Learn about me", "Explore my work", "Get help with navigation"]);
      return "Hello there! 👋 How can I assist you today?";
    }

    if (msg.includes("work") || msg.includes("project")) {
      setExpression("🤖");
      setOptions(["Yes, take me there!", "Tell me more about your projects"]);
      return "You can check out my projects in the Projects section! Would you like to see them?";
    }

    if (msg.includes("help") || msg.includes("navigate")) {
      setExpression("🧭");
      setOptions(["About me", "My skills", "My projects", "Contact me"]);
      return "I can help you navigate! Choose an option below:";
    }

    if (msg.includes("about")) {
      navigate("/about");
      return "Heading to About!";
    }

    if (msg.includes("skills")) {
      navigate("/skills");
      return "Let's check out my skills!";
    }

    if (msg.includes("contact")) {
      navigate("/contact");
      return "Taking you to the Contact page!";
    }

    if (msg.includes("projects")) {
      navigate("/projects");
      return "Let's see my projects in detail!";
    }

    // Fallback response
    setOptions(["Help", "Projects", "About me", "Contact"]);
    return "I'm still learning how to respond to that 😅 Maybe try asking about 'projects' or say 'help'!";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input;
    setChatLog(prev => [...prev, `You: ${userMsg}`]);
    setInput("");
    setIsBotTyping(true);

    setTimeout(() => {
      const botMsg = getBotResponse(userMsg);
      setChatLog(prev => [...prev, `Bot: ${botMsg}`]);
      setIsBotTyping(false);
      speak(botMsg);
    }, 800); // Typing delay
  };

  const handleOptionClick = (option: string) => {
    setInput(option);
    handleSend();
  };

  return (
    <section className="bg-[#F8C8DC] text-black py-20 text-center">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4">Meet Your AI Guide</h2>
        <p className="text-xl mb-2">{greeting}</p>
        <p className="text-md mb-6">I'm here to chat with you! {expression}</p>

        <div className="flex justify-center mb-6">
          <Player
            autoplay
            loop
            src="/bear.json"
            style={{ height: '300px', width: '300px', background: 'transparent' }}
          />
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-xl mx-auto">
          {/* Chat log */}
          <div className="h-40 overflow-y-auto text-left mb-4 space-y-3">
            {chatLog.map((line, idx) => (
              <div key={idx} className={line.startsWith("You:") ? "flex justify-end" : "flex justify-start"}>
                <div className={`p-3 rounded-lg max-w-xs ${line.startsWith("You:") ? "bg-blue-400 text-white" : "bg-gray-300 text-black"}`}>
                  <p className="text-sm">{line}</p>
                </div>
              </div>
            ))}
            {isBotTyping && (
              <div className="flex justify-start">
                <div className="p-3 rounded-lg max-w-xs bg-gray-300 text-black text-sm italic animate-pulse">
                  Typing...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input field */}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me something..."
              className="flex-grow p-2 rounded border"
            />
            <button
              onClick={handleSend}
              className="bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-500 transition"
            >
              Send
            </button>
          </div>

          {/* Option buttons */}
          {options.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  className="bg-pink-300 text-white px-6 py-2 rounded-full text-lg font-semibold shadow-lg hover:bg-pink-400 transition"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AvatarSection;
