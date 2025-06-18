"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Table, Badge, Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { appTheme } from "../../constant/color_constants"

const OrderListPage = () => {
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock order data
  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      items: 3,
      total: "$45.99",
      status: "pending",
      date: "2024-01-15",
      priority: "high",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      items: 2,
      total: "$32.50",
      status: "preparing",
      date: "2024-01-15",
      priority: "medium",
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson",
      items: 5,
      total: "$78.25",
      status: "ready",
      date: "2024-01-14",
      priority: "low",
    },
    {
      id: "ORD-004",
      customer: "Sarah Wilson",
      items: 1,
      total: "$15.99",
      status: "completed",
      date: "2024-01-14",
      priority: "medium",
    },
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: "warning", text: "Pending" },
      preparing: { variant: "info", text: "Preparing" },
      ready: { variant: "success", text: "Ready" },
      completed: { variant: "secondary", text: "Completed" },
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

  const filteredOrders = statusFilter === "all" ? orders : orders.filter((order) => order.status === statusFilter)

  return (
    <div style={{ backgroundColor: appTheme.background, minHeight: "100vh" }}>
      <Header title="Order Management" />
      <Container fluid>
        <Row>
          <Col md={3} lg={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={9} lg={10}>
            <div className="p-4">
              <Row className="mb-4">
                <Col>
                  <h2 style={{ color: appTheme.primary }}>Order List</h2>
                </Col>
                <Col xs="auto">
                  <Form.Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{ minWidth: "150px" }}
                  >
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="completed">Completed</option>
                  </Form.Select>
                </Col>
              </Row>

              <Card>
                <Card.Header style={{ backgroundColor: appTheme.secondary }}>
                  <h5 className="mb-0">Orders ({filteredOrders.length})</h5>
                </Card.Header>
                <Card.Body className="p-0">
                  <Table responsive hover className="mb-0">
                    <thead style={{ backgroundColor: appTheme.background }}>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.id}>
                          <td>
                            <strong style={{ color: appTheme.primary }}>{order.id}</strong>
                          </td>
                          <td>{order.customer}</td>
                          <td>{order.items} items</td>
                          <td>
                            <strong>{order.total}</strong>
                          </td>
                          <td>
                            <Badge bg={getStatusBadge(order.status).variant}>{getStatusBadge(order.status).text}</Badge>
                          </td>
                          <td>
                            <span
                              style={{
                                color: getPriorityColor(order.priority),
                                fontWeight: "bold",
                              }}
                            >
                              {order.priority.toUpperCase()}
                            </span>
                          </td>
                          <td>{order.date}</td>
                          <td>
                            <Button
                              size="sm"
                              style={{
                                backgroundColor: appTheme.primary,
                                borderColor: appTheme.primary,
                              }}
                              onClick={() => navigate(`/orders/${order.id}`)}
                            >
                              View Details
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

export default OrderListPage
