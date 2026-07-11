import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm your Career Guide Bot. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMsg = { text: input, isBot: false };
    setMessages([...messages, userMsg]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "That's interesting! Based on what you said, I recommend checking out our Career Quiz or exploring the Mentorship schemes on your Dashboard.";
      if (input.toLowerCase().includes("scholarship") || input.toLowerCase().includes("scheme")) {
        botResponse = "We have great schemes available for women in tech! Head over to your dashboard to view and save them.";
      } else if (input.toLowerCase().includes("roadmap")) {
        botResponse = "The roadmap section provides a step-by-step guide from Class 10th to finding a tech career. Check it out in the navigation menu!";
      }

      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat window */}
      {isOpen && (
        <div className="bg-white dark:bg-gray-800 w-80 sm:w-96 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 flex flex-col overflow-hidden mb-4 transition-all transform origin-bottom-right">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-full">
                <MessageCircle size={20} />
              </div>
              <span className="font-semibold">Career Guide Bot</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 h-80 overflow-y-auto bg-gray-50 dark:bg-gray-900 flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.isBot ? 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-white self-start shadow-sm rounded-tl-none' : 'bg-pink-500 text-white self-end shadow-sm rounded-tr-none'}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <form className="border-t border-gray-100 dark:border-gray-700 p-3 flex gap-2 bg-white dark:bg-gray-800" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 py-2 px-4 rounded-xl bg-gray-100 dark:bg-gray-900 border-transparent dark:border-gray-700 focus:bg-white dark:focus:bg-gray-800 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all text-sm dark:text-white"
            />
            <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white p-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center animate-bounce"
        >
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;
