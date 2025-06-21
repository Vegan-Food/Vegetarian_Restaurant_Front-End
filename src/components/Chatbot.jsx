import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Xin chào! Tôi là trợ lý ảo của nhà hàng chay. Tôi có thể giúp gì cho bạn?",
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

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('menu') || input.includes('thực đơn')) {
      return "Chúng tôi có nhiều món chay ngon như: Phở chay, Burger chay, Cơm chay, và nhiều món khác. Bạn muốn xem món nào cụ thể không?";
    }
    
    if (input.includes('giá') || input.includes('price') || input.includes('bao nhiêu')) {
      return "Giá cả của chúng tôi rất hợp lý, từ 45,000đ - 150,000đ. Bạn có thể xem chi tiết giá trong menu hoặc tôi có thể tư vấn cụ thể hơn.";
    }
    
    if (input.includes('giao hàng') || input.includes('delivery') || input.includes('ship')) {
      return "Chúng tôi giao hàng trong vòng 30 phút với đơn từ 200,000đ trở lên. Phí ship chỉ 15,000đ cho đơn dưới 200,000đ.";
    }
    
    if (input.includes('giờ') || input.includes('mở cửa') || input.includes('open')) {
      return "Nhà hàng mở cửa từ 6:00 sáng đến 22:00 tối, 7 ngày trong tuần. Bạn có thể đặt hàng online 24/7.";
    }
    
    if (input.includes('chay') || input.includes('vegetarian')) {
      return "Tất cả món ăn của chúng tôi đều 100% thuần chay, không sử dụng thịt, cá hay các sản phẩm từ động vật. Nguyên liệu organic tươi sạch.";
    }
    
    if (input.includes('cảm ơn') || input.includes('thank')) {
      return "Rất vui được phục vụ bạn! Nếu cần thêm thông tin gì, đừng ngại hỏi nhé! 😊";
    }
    
    return "Xin lỗi, tôi chưa hiểu rõ câu hỏi của bạn. Bạn có thể hỏi về menu, giá cả, giao hàng, giờ mở cửa hoặc thông tin về món chay.";
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