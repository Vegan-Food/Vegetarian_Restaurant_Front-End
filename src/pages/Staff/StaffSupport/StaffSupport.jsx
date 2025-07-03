"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Table, Badge, Button, Modal, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { appTheme } from "../../../constant/color_constants"
import StaffSidebar from "../StaffSidebar/StaffSidebar"

const StaffSupport = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [supportTickets, setSupportTickets] = useState([
    {
      id: "SUP001",
      customer: "Nguyen Van A",
      subject: "Order Delay Issue",
      priority: "High",
      status: "Open",
      createdTime: "2 hours ago",
      description: "My order ORD001 is delayed. When will it be delivered?",
    },
    {
      id: "SUP002",
      customer: "Tran Thi B",
      subject: "Food Quality Complaint",
      priority: "Medium",
      status: "In Progress",
      createdTime: "4 hours ago",
      description: "The food quality was not as expected. Need refund.",
    },
    {
      id: "SUP003",
      customer: "Le Van C",
      subject: "Order Tracking",
      priority: "Low",
      status: "Resolved",
      createdTime: "1 day ago",
      description: "Cannot track my order status. Please help.",
    },
    {
      id: "SUP004",
      customer: "Pham Thi D",
      subject: "Payment Issue",
      priority: "High",
      status: "Open",
      createdTime: "30 minutes ago",
      description: "Payment was deducted but order not confirmed.",
    },
  ])

  const getPriorityBadge = (priority) => {
    const priorityColors = {
      High: "danger",
      Medium: "warning",
      Low: "info",
    }
    return <Badge bg={priorityColors[priority]}>{priority}</Badge>
  }

  const getStatusBadge = (status) => {
    const statusColors = {
      Open: "primary",
      "In Progress": "warning",
      Resolved: "success",
      Closed: "secondary",
    }
    return <Badge bg={statusColors[status]}>{status}</Badge>
  }

  const handleViewDetail = (ticketId) => {
  navigate(`/staff-support-detail/${ticketId}`)
  }

  const openResponseModal = (ticket) => {
    setSelectedTicket(ticket)
    setShowModal(true)
  }

  const handleStatusUpdate = (ticketId, newStatus) => {
    setSupportTickets(
      supportTickets.map((ticket) => (ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket)),
    )
    setShowModal(false)
  }

  return (
    <div className="dashboard-container">
      <StaffSidebar />
      <div className="main-content" style={{ backgroundColor: appTheme.background }}>
        <Container fluid className="p-4">
          <Row className="mb-4">
            <Col>
              <h2 style={{ color: appTheme.primary }}>Customer Support</h2>
              <p className="text-muted">Manage customer inquiries and support requests.</p>
            </Col>
          </Row>

          {/* Support Statistics */}
          <Row className="mb-4">
            <Col md={3}>
              <Card className="h-100" style={{ backgroundColor: "#FFEBEE", border: "none" }}>
                <Card.Body>
                  <h3 className="mb-1">2</h3>
                  <p className="text-muted mb-0">Open Tickets</p>
                  <small className="text-danger">High Priority</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100" style={{ backgroundColor: "#FFF3E0", border: "none" }}>
                <Card.Body>
                  <h3 className="mb-1">1</h3>
                  <p className="text-muted mb-0">In Progress</p>
                  <small className="text-warning">Being handled</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100" style={{ backgroundColor: appTheme.secondary, border: "none" }}>
                <Card.Body>
                  <h3 className="mb-1">1</h3>
                  <p className="text-muted mb-0">Resolved Today</p>
                  <small className="text-success">Completed</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100" style={{ backgroundColor: "#E8F5E8", border: "none" }}>
                <Card.Body>
                  <h3 className="mb-1">95%</h3>
                  <p className="text-muted mb-0">Satisfaction Rate</p>
                  <small className="text-success">This month</small>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <Card.Header style={{ backgroundColor: appTheme.primary, color: "white" }}>
                  <h5 className="mb-0">Support Requests</h5>
                </Card.Header>
                <Card.Body>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Ticket ID</th>
                        <th>Customer</th>
                        <th>Subject</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supportTickets.map((ticket, index) => (
                        <tr key={index}>
                          <td>
                            <strong>{ticket.id}</strong>
                          </td>
                          <td>{ticket.customer}</td>
                          <td>{ticket.subject}</td>
                          <td>{getPriorityBadge(ticket.priority)}</td>
                          <td>{getStatusBadge(ticket.status)}</td>
                          <td>{ticket.createdTime}</td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                              onClick={() => handleViewDetail(ticket.id)}
                            >
                              View Detail
                            </Button>
                            <Button variant="outline-success" size="sm" onClick={() => openResponseModal(ticket)}>
                              Respond
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Response Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Respond to Support Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedTicket && (
              <div>
                <p>
                  <strong>Ticket:</strong> {selectedTicket.id}
                </p>
                <p>
                  <strong>Customer:</strong> {selectedTicket.customer}
                </p>
                <p>
                  <strong>Subject:</strong> {selectedTicket.subject}
                </p>
                <p>
                  <strong>Description:</strong> {selectedTicket.description}
                </p>

                <Form.Group className="mt-3">
                  <Form.Label>Response</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="Type your response here..." />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Update Status</Form.Label>
                  <Form.Select id="ticketStatusSelect">
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </Form.Select>
                </Form.Group>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                const newStatus = document.getElementById("ticketStatusSelect").value
                handleStatusUpdate(selectedTicket.id, newStatus)
              }}
            >
              Send Response
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default StaffSupport
