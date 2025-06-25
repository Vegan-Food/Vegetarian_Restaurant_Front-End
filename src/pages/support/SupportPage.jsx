import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Modal, Alert } from 'react-bootstrap';
import { 
  MessageCircle, 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Phone,
  Mail,
  MapPin,
  Send,
  FileText,
  User,
  Calendar
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Chatbot from '../../components/Chatbot';
import './SupportPage.css';

const SupportPage = () => {
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'medium',
    description: '',
    email: '',
    phone: ''
  });

  // Mock data cho tickets
  useEffect(() => {
    const mockTickets = [
      {
        id: 1,
        title: 'Vấn đề với đơn hàng #12345',
        category: 'Đơn hàng',
        priority: 'high',
        status: 'open',
        description: 'Tôi đã đặt hàng nhưng chưa nhận được xác nhận email',
        email: 'customer@example.com',
        phone: '0123456789',
        createdAt: '2024-01-15T10:30:00',
        updatedAt: '2024-01-15T14:20:00',
        messages: [
          {
            id: 1,
            sender: 'customer',
            message: 'Tôi đã đặt hàng nhưng chưa nhận được xác nhận email',
            timestamp: '2024-01-15T10:30:00'
          },
          {
            id: 2,
            sender: 'support',
            message: 'Chào bạn! Chúng tôi đã kiểm tra và xác nhận đơn hàng của bạn. Email xác nhận đã được gửi. Bạn có thể kiểm tra trong hộp thư spam.',
            timestamp: '2024-01-15T14:20:00'
          }
        ]
      },
      {
        id: 2,
        title: 'Thắc mắc về thành phần dinh dưỡng',
        category: 'Sản phẩm',
        priority: 'medium',
        status: 'in_progress',
        description: 'Tôi muốn biết thêm thông tin về thành phần dinh dưỡng của món Phở chay',
        email: 'user@example.com',
        phone: '0987654321',
        createdAt: '2024-01-14T09:15:00',
        updatedAt: '2024-01-14T16:45:00',
        messages: [
          {
            id: 1,
            sender: 'customer',
            message: 'Tôi muốn biết thêm thông tin về thành phần dinh dưỡng của món Phở chay',
            timestamp: '2024-01-14T09:15:00'
          }
        ]
      },
      {
        id: 3,
        title: 'Góp ý về dịch vụ giao hàng',
        category: 'Dịch vụ',
        priority: 'low',
        status: 'closed',
        description: 'Dịch vụ giao hàng rất tốt, nhân viên thân thiện',
        email: 'feedback@example.com',
        phone: '0123456789',
        createdAt: '2024-01-13T15:20:00',
        updatedAt: '2024-01-13T17:30:00',
        messages: [
          {
            id: 1,
            sender: 'customer',
            message: 'Dịch vụ giao hàng rất tốt, nhân viên thân thiện',
            timestamp: '2024-01-13T15:20:00'
          },
          {
            id: 2,
            sender: 'support',
            message: 'Cảm ơn bạn đã góp ý! Chúng tôi rất vui khi được phục vụ bạn.',
            timestamp: '2024-01-13T17:30:00'
          }
        ]
      }
    ];
    setTickets(mockTickets);
  }, []);

  const handleCreateTicket = (e) => {
    e.preventDefault();
    const newTicket = {
      id: tickets.length + 1,
      ...formData,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: 1,
          sender: 'customer',
          message: formData.description,
          timestamp: new Date().toISOString()
        }
      ]
    };
    setTickets([newTicket, ...tickets]);
    setFormData({
      title: '',
      category: '',
      priority: 'medium',
      description: '',
      email: '',
      phone: ''
    });
    setShowCreateTicket(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <AlertCircle size={16} className="text-warning" />;
      case 'in_progress':
        return <Clock size={16} className="text-info" />;
      case 'closed':
        return <CheckCircle size={16} className="text-success" />;
      default:
        return <XCircle size={16} className="text-danger" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'open':
        return 'Chờ xử lý';
      case 'in_progress':
        return 'Đang xử lý';
      case 'closed':
        return 'Đã hoàn thành';
      default:
        return 'Không xác định';
    }
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      low: 'success',
      medium: 'warning',
      high: 'danger'
    };
    return <Badge bg={variants[priority]}>{priority === 'high' ? 'Cao' : priority === 'medium' ? 'Trung bình' : 'Thấp'}</Badge>;
  };

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'all') return true;
    return ticket.status === filter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="support-page">
      <Header />
      
      <div className="support-content">
        <Container>
          {/* Hero Section */}
          <div className="support-hero">
            <Row className="justify-content-center text-center">
              <Col lg={8}>
                <h1 className="support-title">
                  <MessageCircle size={48} className="me-3" />
                  Hỗ trợ khách hàng
                </h1>
                <p className="support-subtitle">
                  Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Hãy liên hệ với chúng tôi nếu bạn cần bất kỳ sự trợ giúp nào.
                </p>
              </Col>
            </Row>
          </div>

          {/* Contact Info Cards */}
          <Row className="mb-5">
            <Col md={4}>
              <Card className="contact-card">
                <Card.Body className="text-center">
                  <Phone size={32} className="contact-icon" />
                  <h5>Gọi điện thoại</h5>
                  <p className="mb-0">1900-6066</p>
                  <small className="text-muted">Hỗ trợ 24/7</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="contact-card">
                <Card.Body className="text-center">
                  <Mail size={32} className="contact-icon" />
                  <h5>Email</h5>
                  <p className="mb-0">support@veganfood.vn</p>
                  <small className="text-muted">Phản hồi trong 24h</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="contact-card">
                <Card.Body className="text-center">
                  <MapPin size={32} className="contact-icon" />
                  <h5>Địa chỉ</h5>
                  <p className="mb-0">123 Đường ABC, Q1, TP.HCM</p>
                  <small className="text-muted">Giờ làm việc: 8h-22h</small>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Support Actions */}
          <Row className="mb-5">
            <Col>
              <Card className="support-actions-card">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col md={8}>
                      <h4 className="mb-2">Cần hỗ trợ?</h4>
                      <p className="mb-0 text-muted">
                        Tạo ticket hỗ trợ mới để chúng tôi có thể giúp bạn giải quyết vấn đề một cách nhanh chóng.
                      </p>
                    </Col>
                    <Col md={4} className="text-end">
                      <Button 
                        variant="success" 
                        size="lg"
                        onClick={() => setShowCreateTicket(true)}
                        className="create-ticket-btn"
                      >
                        <Plus size={20} className="me-2" />
                        Tạo ticket mới
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Tickets Section */}
          <Row>
            <Col>
              <Card className="tickets-card">
                <Card.Header className="tickets-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">
                      <FileText size={24} className="me-2" />
                      Ticket hỗ trợ của bạn
                    </h4>
                    <div className="filter-buttons">
                      <Button
                        variant={filter === 'all' ? 'success' : 'outline-success'}
                        size="sm"
                        onClick={() => setFilter('all')}
                        className="me-2"
                      >
                        Tất cả
                      </Button>
                      <Button
                        variant={filter === 'open' ? 'success' : 'outline-success'}
                        size="sm"
                        onClick={() => setFilter('open')}
                        className="me-2"
                      >
                        Chờ xử lý
                      </Button>
                      <Button
                        variant={filter === 'in_progress' ? 'success' : 'outline-success'}
                        size="sm"
                        onClick={() => setFilter('in_progress')}
                        className="me-2"
                      >
                        Đang xử lý
                      </Button>
                      <Button
                        variant={filter === 'closed' ? 'success' : 'outline-success'}
                        size="sm"
                        onClick={() => setFilter('closed')}
                      >
                        Đã hoàn thành
                      </Button>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body className="p-0">
                  {filteredTickets.length === 0 ? (
                    <div className="text-center py-5">
                      <FileText size={64} className="text-muted mb-3" />
                      <h5 className="text-muted">Không có ticket nào</h5>
                      <p className="text-muted">Bạn chưa có ticket hỗ trợ nào hoặc không có ticket nào phù hợp với bộ lọc hiện tại.</p>
                    </div>
                  ) : (
                    <div className="tickets-list">
                      {filteredTickets.map((ticket) => (
                        <div key={ticket.id} className="ticket-item" onClick={() => {
                          setSelectedTicket(ticket);
                          setShowTicketDetail(true);
                        }}>
                          <div className="ticket-header">
                            <div className="ticket-title">
                              <h6 className="mb-1">{ticket.title}</h6>
                              <div className="ticket-meta">
                                <span className="ticket-category">{ticket.category}</span>
                                {getPriorityBadge(ticket.priority)}
                              </div>
                            </div>
                            <div className="ticket-status">
                              {getStatusIcon(ticket.status)}
                              <span className="ms-2">{getStatusText(ticket.status)}</span>
                            </div>
                          </div>
                          <div className="ticket-content">
                            <p className="ticket-description">{ticket.description}</p>
                            <div className="ticket-footer">
                              <small className="text-muted">
                                <Calendar size={14} className="me-1" />
                                Tạo lúc: {formatDate(ticket.createdAt)}
                              </small>
                              <small className="text-muted">
                                <User size={14} className="me-1" />
                                {ticket.email}
                              </small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Create Ticket Modal */}
      <Modal show={showCreateTicket} onHide={() => setShowCreateTicket(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <Plus size={24} className="me-2" />
            Tạo ticket hỗ trợ mới
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCreateTicket}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tiêu đề *</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Nhập tiêu đề vấn đề"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Danh mục *</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Chọn danh mục</option>
                    <option value="Đơn hàng">Đơn hàng</option>
                    <option value="Sản phẩm">Sản phẩm</option>
                    <option value="Dịch vụ">Dịch vụ</option>
                    <option value="Thanh toán">Thanh toán</option>
                    <option value="Giao hàng">Giao hàng</option>
                    <option value="Khác">Khác</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mức độ ưu tiên</Form.Label>
                  <Form.Select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                  >
                    <option value="low">Thấp</option>
                    <option value="medium">Trung bình</option>
                    <option value="high">Cao</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="0123456789"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả chi tiết *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreateTicket(false)}>
              Hủy
            </Button>
            <Button variant="success" type="submit">
              <Send size={16} className="me-2" />
              Gửi ticket
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Ticket Detail Modal */}
      <Modal show={showTicketDetail} onHide={() => setShowTicketDetail(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <FileText size={24} className="me-2" />
            Chi tiết ticket #{selectedTicket?.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTicket && (
            <div>
              <div className="ticket-detail-header mb-4">
                <h5>{selectedTicket.title}</h5>
                <div className="d-flex gap-2 mb-2">
                  <Badge bg="secondary">{selectedTicket.category}</Badge>
                  {getPriorityBadge(selectedTicket.priority)}
                  <Badge bg={selectedTicket.status === 'open' ? 'warning' : selectedTicket.status === 'in_progress' ? 'info' : 'success'}>
                    {getStatusText(selectedTicket.status)}
                  </Badge>
                </div>
                <p className="text-muted mb-0">
                  <Calendar size={14} className="me-1" />
                  Tạo lúc: {formatDate(selectedTicket.createdAt)}
                </p>
              </div>

              <div className="ticket-messages">
                <h6 className="mb-3">Lịch sử tin nhắn</h6>
                {selectedTicket.messages.map((message) => (
                  <div key={message.id} className={`message-item ${message.sender === 'customer' ? 'customer-message' : 'support-message'}`}>
                    <div className="message-header">
                      <strong>{message.sender === 'customer' ? 'Bạn' : 'Hỗ trợ'}</strong>
                      <small className="text-muted ms-2">
                        {formatDate(message.timestamp)}
                      </small>
                    </div>
                    <div className="message-content">
                      {message.message}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTicketDetail(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default SupportPage; 