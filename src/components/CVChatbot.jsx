import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiSend, FiX } from "react-icons/fi";

// Önceden tanımlanmış yanıtlar
const predefinedResponses = {
  hello: ["Merhaba! Size nasıl yardımcı olabilirim?", "Merhaba! CV hazırlamanıza yardımcı olmak için buradayım."],
  cv: ["CV'nizi profesyonel bir şekilde hazırlamanıza yardımcı olabilirim.", "CV yazarken dikkat etmeniz gereken önemli noktalar: açık ve net olun, başarılarınızı vurgulayın, güncel bilgiler ekleyin."],
  experience: ["İş deneyimlerinizi kronolojik sırayla, en yeniden en eskiye doğru sıralayın.", "Her deneyim için somut başarılarınızı ve katkılarınızı belirtin."],
  education: ["Eğitim bilgilerinizi en son aldığınız dereceden başlayarak sıralayın.", "Önemli projelerinizi ve akademik başarılarınızı da ekleyebilirsiniz."],
  skills: ["Teknik becerilerinizi ve kişisel yeteneklerinizi ayrı bölümlerde listeleyebilirsiniz.", "Özellikle iş ilanında belirtilen becerileri öne çıkarın."],
  default: ["Üzgünüm, bu konuda size yardımcı olamıyorum.", "Daha spesifik bir soru sorabilir misiniz?"]
};

const CVChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Merhaba! Ben CV Asistanınızım. CV yazma konusunda size yardımcı olabilirim. Nasıl yardımcı olabilirim?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (message) => {
    const lowercaseMessage = message.toLowerCase();
    
    if (lowercaseMessage.includes("merhaba") || lowercaseMessage.includes("selam")) {
      return predefinedResponses.hello[Math.floor(Math.random() * predefinedResponses.hello.length)];
    }
    if (lowercaseMessage.includes("cv") || lowercaseMessage.includes("özgeçmiş")) {
      return predefinedResponses.cv[Math.floor(Math.random() * predefinedResponses.cv.length)];
    }
    if (lowercaseMessage.includes("deneyim") || lowercaseMessage.includes("tecrübe")) {
      return predefinedResponses.experience[Math.floor(Math.random() * predefinedResponses.experience.length)];
    }
    if (lowercaseMessage.includes("eğitim") || lowercaseMessage.includes("okul")) {
      return predefinedResponses.education[Math.floor(Math.random() * predefinedResponses.education.length)];
    }
    if (lowercaseMessage.includes("beceri") || lowercaseMessage.includes("yetenek")) {
      return predefinedResponses.skills[Math.floor(Math.random() * predefinedResponses.skills.length)];
    }
    
    return predefinedResponses.default[Math.floor(Math.random() * predefinedResponses.default.length)];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    // Botun yanıtını ekle
    setTimeout(() => {
      const botResponse = getResponse(userMessage);
      setMessages((prev) => [...prev, { role: "assistant", content: botResponse }]);
    }, 500);
  };

  return (
    <>
      {/* Chatbot Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiMessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 w-96 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold">CV Asistanı</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Mesajınızı yazın..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiSend className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CVChatbot;
