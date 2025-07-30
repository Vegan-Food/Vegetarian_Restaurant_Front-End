import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Form, Card, Container, Badge, InputGroup, ListGroup } from 'react-bootstrap';
import { MessageCircle, Send, Bot, User } from 'lucide-react';
import './Chatbot.css';
import { getProducts, getBestsellerProducts } from '../api/product';

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

async function callGeminiAPI(userInput, products, bestsellerProducts) {
  const productList = products.slice(0, 10).map(p => `${p.name}: ${p.description} - Price: ${p.price}₫ - Category: ${p.category}`).join('\n');
  
  const bestsellerList = bestsellerProducts.length > 0 
    ? bestsellerProducts.slice(0, 5).map(p => `${p.name} (Bestseller - ${p.total_order} orders): ${p.description} - Price: ${p.price}₫`).join('\n')
    : 'No bestseller data available yet.';

  const prompt = `
    RESTAURANT MENU:
    ${productList}
    
    BESTSELLING DISHES:
    ${bestsellerList}
    
    CUSTOMER MESSAGE: ${userInput}
    
    INSTRUCTIONS:
    - PRIMARY LANGUAGE: English (respond in English by default)
    - If customer writes in another language (Vietnamese, Japanese, Korean, Chinese, etc.), respond in THAT language
    - Only discuss topics related to: vegetarian food, vegan dishes, plant-based nutrition, our restaurant menu, cooking methods, ingredients, health benefits of vegan food
    - If asked about non-vegan topics, politely redirect to vegan alternatives
    - If asked about topics completely unrelated to food/restaurant, politely decline and redirect to menu discussion
    - Be friendly, knowledgeable, and passionate about vegan food
    - Recommend dishes from our menu when appropriate
    - Share benefits of plant-based eating when relevant
  `;

  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + GEMINI_API_KEY;
  const body = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are a multilingual virtual assistant for a Vegan Food restaurant. You are passionate about plant-based cuisine and knowledgeable about vegetarian/vegan cooking.

CORE PERSONALITY:
- Friendly, enthusiastic, and knowledgeable about vegan food
- PRIMARY LANGUAGE: English (use English as default language)
- Can communicate fluently in ANY language the customer uses
- If customer writes in non-English, respond in their language; otherwise use English
- Passionate advocate for plant-based eating and healthy lifestyle

TOPICS YOU CAN DISCUSS:
✅ Our restaurant menu items and recommendations
✅ Vegetarian and vegan cooking techniques
✅ Plant-based nutrition and health benefits
✅ Vegan ingredients and their properties
✅ Comparing vegan alternatives to non-vegan foods
✅ Environmental benefits of plant-based eating
✅ Vegan lifestyle tips and advice
✅ Food allergies and dietary restrictions (vegan solutions)

TOPICS TO POLITELY DECLINE:
❌ Non-food related topics (politics, sports, technology, etc.)
❌ Non-vegan restaurant recommendations
❌ Meat or dairy-based recipes
❌ Personal advice unrelated to food/health

RESPONSE STYLE:
- Default to English unless customer uses another language
- Be enthusiastic about vegan food
- Offer menu recommendations when appropriate
- Share interesting facts about plant-based ingredients
- Keep responses helpful and restaurant-focused`
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
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I can only assist with questions about our vegan restaurant and plant-based food. How can I help you with our menu today?";
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [bestsellerProducts, setBestsellerProducts] = useState([]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 Welcome to our Vegan Food restaurant! I'm your virtual assistant and I'm here to help you discover amazing plant-based dishes. I can communicate in multiple languages if you prefer! 🌱\n\nFeel free to ask me about our menu, nutritional information, or anything related to vegan cuisine. What would you like to know today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productData, bestsellerData] = await Promise.all([
          getProducts(),
          getBestsellerProducts()
        ]);
        
        setProducts(productData || []);
        setBestsellerProducts(bestsellerData || []);
      } catch (err) {
        console.error('Failed to load data for chatbot:', err);
        setProducts([]);
        setBestsellerProducts([]);
      }
    };
    loadData();
  }, []);

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

    try {
      const botResponse = await callGeminiAPI(inputMessage, products, bestsellerProducts);
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
          text: "Sorry, there was an error connecting to the AI assistant.",
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
      <Button
        className="chatbot-button"
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          background: 'linear-gradient(135deg, #347928, #2d5016)',
          border: 'none',
          borderRadius: '50px',
          padding: '15px 20px',
          zIndex: 1000,
          boxShadow: '0 8px 25px rgba(52, 121, 40, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: '600',
          fontSize: '14px'
        }}
      >
        <MessageCircle size={24} />
        <span>Chat With Virtual Assistant</span>
      </Button>

      <Modal
        show={isOpen}
        onHide={() => setIsOpen(false)}
        size="lg"
        centered
        className="chatbot-modal"
        backdrop="static"
      >
        <Modal.Header 
          closeButton 
          className="chatbot-header"
          style={{
            background: 'linear-gradient(135deg, #347928, #2d5016)',
            color: 'white'
          }}
        >
          <div className="d-flex align-items-center">
            <Badge 
              bg="light" 
              text="success" 
              className="me-3 p-2 rounded-circle"
              style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Bot size={20} />
            </Badge>
            <div>
              <Modal.Title className="mb-0">Virtual Assistant</Modal.Title>
              <small style={{ opacity: 0.8 }}>Vegan Restaurant</small>
            </div>
          </div>
        </Modal.Header>

        <Modal.Body className="p-0" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
          {/* Messages */}
          <Container 
            fluid 
            className="flex-grow-1 p-3" 
            style={{ 
              overflowY: 'auto', 
              maxHeight: '400px',
              backgroundColor: '#f8f9fa'
            }}
          >
            <ListGroup variant="flush">
              {messages.map((message) => (
                <ListGroup.Item 
                  key={message.id} 
                  className="border-0 bg-transparent p-2"
                >
                  <div className={`d-flex ${message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                    <div className={`d-flex align-items-start gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`} style={{ maxWidth: '80%' }}>
                      <Badge 
                        bg={message.sender === 'user' ? 'success' : 'light'} 
                        text={message.sender === 'user' ? 'white' : 'success'}
                        className="p-2 rounded-circle"
                        style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                      >
                        {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                      </Badge>
                      <Card 
                        className={`${message.sender === 'user' ? 'bg-success text-white' : 'bg-light'}`}
                        style={{ border: 'none', borderRadius: '18px' }}
                      >
                        <Card.Body className="p-3">
                          <div style={{ fontSize: '14px', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}>
                            {message.text}
                          </div>
                          <small className="d-block mt-1" style={{ opacity: 0.7, fontSize: '11px' }}>
                            {message.timestamp.toLocaleTimeString('vi-VN', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </small>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}

              {isTyping && (
                <ListGroup.Item className="border-0 bg-transparent p-2">
                  <div className="d-flex justify-content-start">
                    <div className="d-flex align-items-start gap-2" style={{ maxWidth: '80%' }}>
                      <Badge 
                        bg="light" 
                        text="success"
                        className="p-2 rounded-circle"
                        style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Bot size={16} />
                      </Badge>
                      <Card className="bg-light" style={{ border: 'none', borderRadius: '18px' }}>
                        <Card.Body className="p-3">
                          <div className="typing-indicator d-flex gap-1">
                            <div className="bg-secondary rounded-circle" style={{ width: '8px', height: '8px', animation: 'typing 1.4s infinite ease-in-out' }}></div>
                            <div className="bg-secondary rounded-circle" style={{ width: '8px', height: '8px', animation: 'typing 1.4s infinite ease-in-out', animationDelay: '-0.16s' }}></div>
                            <div className="bg-secondary rounded-circle" style={{ width: '8px', height: '8px', animation: 'typing 1.4s infinite ease-in-out', animationDelay: '-0.32s' }}></div>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </ListGroup.Item>
              )}
            </ListGroup>
            <div ref={messagesEndRef} />
          </Container>

          {/* Input */}
          <Container fluid className="p-3 border-top bg-white">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{
                  border: '2px solid #e9ecef',
                  borderRadius: '25px 0 0 25px',
                  fontSize: '14px'
                }}
              />
              <Button
                variant="success"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                style={{
                  background: '#347928',
                  border: 'none',
                  borderRadius: '0 25px 25px 0',
                  padding: '10px 15px'
                }}
              >
                <Send size={18} />
              </Button>
            </InputGroup>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Chatbot;