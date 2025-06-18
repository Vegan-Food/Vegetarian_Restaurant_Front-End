"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Badge, Button, Form, Alert } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { appTheme } from "../../constant/color_constants"

const SupportDetailPage = () => {
  const { supportId } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState("open")
  const [response, setResponse] = useState("")
  const [showAlert, setShowAlert] = useState(false)

  // Mock support ticket detail
  const ticketDetail = {
    id: supportId || "SUP-001",
    customer: {
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      phone: "+1 (555) 987-6543",
      orderHistory: 15,
    },
    subject: "Order delivery issue",
    description:
      "My order was supposed to be delivered at 7 PM but it never arrived. I tried calling but no one answered. This is very disappointing as I had guests waiting.",
    priority: "high",
    status: status,
    category: "delivery",
    createdDate: "2024-01-15 18:30",
    orderId: "ORD-456",
    previousMessages: [
      {
        sender: "Customer",
        message: "My order was supposed to be delivered at 7 PM but it never arrived.",
        timestamp: "2024-01-15 18:30",
      },
      {
        sender: "Staff",
        message: "We apologize for the inconvenience. Let me check with our delivery team.",
        timestamp: "2024-01-15 18:45",
      },
    ],
  }

  const handleResponseSubmit = () => {
    if (response.trim()) {
      setShowAlert(true)
      setResponse("")
      setTimeout(() => setShowAlert(false), 3000)
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: { variant: "danger", text: "Open" },
      "in-progress": { variant: "warning", text: "In Progress" },
      resolved: { variant: "success", text: "Resolved" },
      closed: { variant: "secondary", text: "Closed" },
    }
    return statusConfig[status] || { variant: "secondary", text: status }
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: "#dc3545",
      medium: "#ffc107",
      low: "#28a745",
    }
    return colors[priority] || "#6c757d"
  }

  return (
    <div style={{ backgroundColor: appTheme.background, minHeight: "100vh" }}>
      <Header title="Support Ticket Details" />
      <Container fluid>
        <Row>
          <Col md={3} lg={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={9} lg={10}>
            <div className="p-4">
              <Row className="mb-4">
                <Col>
                  <h2 style={{ color: appTheme.primary }}>Support Ticket - {ticketDetail.id}</h2>
                </Col>
                <Col xs="auto">
                  <Button variant="outline-secondary" onClick={() => navigate("/support")}>
                    ← Back to Support
                  </Button>
                </Col>
              </Row>

              {showAlert && (
                <Alert variant="success" className="mb-4">
                  Response sent successfully!
                </Alert>
              )}

              <Row>
                <Col md={8}>
                  <Card className="mb-4">
                    <Card.Header style={{ backgroundColor: appTheme.secondary }}>
                      <Row>
                        <Col>
                          <h5 className="mb-0">{ticketDetail.subject}</h5>
                        </Col>
                        <Col xs="auto">
                          <Badge bg={getStatusBadge(status).variant}>{getStatusBadge(status).text}</Badge>
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      <p>
                        <strong>Description:</strong>
                      </p>
                      <p className="mb-3">{ticketDetail.description}</p>

                      {ticketDetail.orderId && (
                        <p>
                          <strong>Related Order:</strong>{" "}
                          <Button
                            variant="link"
                            className="p-0"
                            onClick={() => navigate(`/orders/${ticketDetail.orderId}`)}
                          >
                            {ticketDetail.orderId}
                          </Button>
                        </p>
                      )}
                    </Card.Body>
                  </Card>

                  <Card className="mb-4">
                    <Card.Header style={{ backgroundColor: appTheme.secondary }}>
                      <h5 className="mb-0">Conversation History</h5>
                    </Card.Header>
                    <Card.Body>
                      {ticketDetail.previousMessages.map((msg, index) => (
                        <div key={index} className="mb-3 pb-3 border-bottom">
                          <div className="d-flex justify-content-between mb-2">
                            <strong
                              style={{
                                color: msg.sender === "Staff" ? appTheme.primary : "#666",
                              }}
                            >
                              {msg.sender}
                            </strong>
                            <small className="text-muted">{msg.timestamp}</small>
                          </div>
                          <p className="mb-0">{msg.message}</p>
                        </div>
                      ))}
                    </Card.Body>
                  </Card>

                  <Card>
                    <Card.Header style={{ backgroundColor: appTheme.secondary }}>
                      <h5 className="mb-0">Send Response</h5>
                    </Card.Header>
                    <Card.Body>
                      <Form.Group className="mb-3">
                        <Form.Control
                          as="textarea"
                          rows={4}
                          placeholder="Type your response here..."
                          value={response}
                          onChange={(e) => setResponse(e.target.value)}
                        />
                      </Form.Group>
                      <Button
                        style={{
                          backgroundColor: appTheme.primary,
                          borderColor: appTheme.primary,
                        }}
                        onClick={handleResponseSubmit}
                        disabled={!response.trim()}
                      >
                        Send Response
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="mb-4">
                    <Card.Header style={{ backgroundColor: appTheme.secondary }}>
                      <h5 className="mb-0">Customer Information</h5>
                    </Card.Header>
                    <Card.Body>
                      <p>
                        <strong>Name:</strong> {ticketDetail.customer.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {ticketDetail.customer.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {ticketDetail.customer.phone}
                      </p>
                      <p>
                        <strong>Order History:</strong> {ticketDetail.customer.orderHistory} orders
                      </p>
                    </Card.Body>
                  </Card>

                  <Card>
                    <Card.Header style={{ backgroundColor: appTheme.secondary }}>
                      <h5 className="mb-0">Ticket Details</h5>
                    </Card.Header>
                    <Card.Body>
                      <p>
                        <strong>Created:</strong> {ticketDetail.createdDate}
                      </p>
                      <p>
                        <strong>Category:</strong> {ticketDetail.category}
                      </p>
                      <p>
                        <strong>Priority:</strong>{" "}
                        <span
                          style={{
                            color: getPriorityColor(ticketDetail.priority),
                            fontWeight: "bold",
                          }}
                        >
                          {ticketDetail.priority.toUpperCase()}
                        </span>
                      </p>

                      <Form.Group className="mb-3">
                        <Form.Label>Update Status:</Form.Label>
                        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                          <option value="open">Open</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </Form.Select>
                      </Form.Group>

                      <Button
                        variant="outline-primary"
                        className="w-100"
                        onClick={() => {
                          setShowAlert(true)
                          setTimeout(() => setShowAlert(false), 3000)
                        }}
                      >
                        Update Status
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SupportDetailPage
