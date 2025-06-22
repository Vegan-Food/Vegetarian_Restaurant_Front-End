import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import './Chatbot.css';
import mealData from '../data/meal_data.json';

const GEMINI_API_KEY = 'AIzaSyCaaYPKYiTeHXIHyU3OPHFWbCN8su3yL7E'; // Thay bằng API key thật

async function callGeminiAPI(userInput) {
  // Lấy danh sách sản phẩm (ví dụ 5 sản phẩm đầu)
  const productList = mealData.products.slice(0, 5).map(p => `${p.name}: ${p.description}`).join('\n');
  const prompt = `
    Dưới đây là danh sách món ăn chay của nhà hàng:
    ${productList}
    Câu hỏi của khách: ${userInput}
    Chỉ trả lời dựa trên danh sách trên.
  `;

  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + GEMINI_API_KEY;
  const body = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: "Bạn là trợ lý ảo theo phong cách GenZ của nhà hàng chay Vegan Food. Chỉ trả lời các câu hỏi liên quan đến thực phẩm chay, món ăn chay, dinh dưỡng chay, và không trả lời các chủ đề khác. Nếu câu hỏi không liên quan, hãy lịch sự từ chối."
          }
        ]
      },
      {
        role: "user",
        parts: [
          { text: prompt }
        ]
      }
    ]
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Xin lỗi, tôi chỉ hỗ trợ các câu hỏi về thực phẩm chay.";
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Xin chào! Tôi là trợ lý ảo của nhà hàng chay Vegan Food. Tôi có thể giúp gì cho bạn?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Gọi Gemini API thay vì generateBotResponse
    try {
      const botResponse = await callGeminiAPI(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: messages.length + 2,
          text: "Xin lỗi, có lỗi xảy ra khi kết nối đến AI.",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="chatbot-button" onClick={() => setIsOpen(true)}>
        <MessageCircle size={24} />
        <span className="chatbot-button-text">Chat với chúng tôi</span>
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <div className="chatbot-overlay" onClick={() => setIsOpen(false)}>
          <div className="chatbot-popup" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <div className="chatbot-avatar">
                  <Bot size={20} />
                </div>
                <div>
                  <h4 className="chatbot-title">Trợ lý ảo</h4>
                  <p className="chatbot-subtitle">Nhà hàng chay</p>
                </div>
              </div>
              <button className="chatbot-close" onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                >
                  <div className="message-avatar">
                    {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className="message-content">
                    <p className="message-text">{message.text}</p>
                    <span className="message-time">
                      {message.timestamp.toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="message bot-message">
                  <div className="message-avatar">
                    <Bot size={16} />
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chatbot-input">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="chatbot-input-field"
              />
              <button
                className="chatbot-send-btn"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;