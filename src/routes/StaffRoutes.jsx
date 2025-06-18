"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Table, Badge, Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { appTheme } from "../../constant/color_constants"

const SupportRequestListPage = () => {
  const navigate = useNavigate()
  const [priorityFilter, setPriorityFilter] = useState("all")

  // Mock support request data
  const supportRequests = [
    {
      id: "SUP-001",
      customer: "Alice Johnson",
      subject: "Order delivery issue",
      priority: "high",
      status: "open",
      date: "2024-01-15",
      category: "delivery",
    },
    {
      id: "SUP-002",
      customer: "Bob Smith",
      subject: "Food quality complaint",
      priority: "medium",
      status: "in-progress",
      date: "2024-01-15",
      category: "quality",
    },
    {
      id: "SUP-003",
      customer: "Carol Davis",
      subject: "Refund request",
      priority: "high",
      status: "open",
      date: "2024-01-14",
      category: "billing",
    },
    {
      id: "SUP-004",
      customer: "David Wilson",
      subject: "Menu inquiry",
      priority: "low",
      status: "resolved",
      date: "2024-01-14",
      category: "general",
    },
  ]

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

  const getCategoryIcon = (category) => {
    const icons = {
      delivery: "🚚",
      quality: "🍽️",
      billing: "💳",
      general: "❓",
    }
    return icons[category] || "📝"
  }

  const filteredRequests =
    priorityFilter === "all"
      ? supportRequests
      : supportRequests.filter((request) => request.priority === priorityFilter)

  return (
    <div style={{ backgroundColor: appTheme.background, minHeight: "100vh" }}>
      <Header title="Support Management" />
      <Container fluid>
        <Row>
          <Col md={3} lg={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={9} lg={10}>
            <div className="p-4">
              <Row className="mb-4">
                <Col>
                  <h2 style={{ color: appTheme.primary }}>Support Requests</h2>
                </Col>
                <Col xs="auto">
                  <Form.Select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    style={{ minWidth: "150px" }}
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </Form.Select>
                </Col>
              </Row>

              <Card>
                <Card.Header style={{ backgroundColor: appTheme.secondary }}>
                  <h5 className="mb-0">Support Tickets ({filteredRequests.length})</h5>
                </Card.Header>
                <Card.Body className="p-0">
                  <Table responsive hover className="mb-0">
                    <thead style={{ backgroundColor: appTheme.background }}>
                      <tr>
                        <th>Ticket ID</th>
                        <th>Customer</th>
                        <th>Subject</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map((request) => (
                        <tr key={request.id}>
                          <td>
                            <strong style={{ color: appTheme.primary }}>{request.id}</strong>
                          </td>
                          <td>{request.customer}</td>
                          <td>{request.subject}</td>
                          <td>
                            <span className="me-1">{getCategoryIcon(request.category)}</span>
                            {request.category}
                          </td>
                          <td>
                            <span
                              style={{
                                color: getPriorityColor(request.priority),
                                fontWeight: "bold",
                              }}
                            >
                              {request.priority.toUpperCase()}
                            </span>
                          </td>
                          <td>
                            <Badge bg={getStatusBadge(request.status).variant}>
                              {getStatusBadge(request.status).text}
                            </Badge>
                          </td>
                          <td>{request.date}</td>
                          <td>
                            <Button
                              size="sm"
                              style={{
                                backgroundColor: appTheme.primary,
                                borderColor: appTheme.primary,
                              }}
                              onClick={() => navigate(`/support/${request.id}`)}
                            >
                              Handle
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SupportRequestListPage