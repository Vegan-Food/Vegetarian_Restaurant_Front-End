"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Badge, Button, Form, Alert } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { appTheme } from "../../constant/color_constants"

const OrderDetailPage = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [orderStatus, setOrderStatus] = useState("pending")
  const [showAlert, setShowAlert] = useState(false)

  // Mock order detail data
  const orderDetail = {
    id: orderId || "ORD-001",
    customer: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, City, State 12345",
    },
    items: [
      { name: "Margherita Pizza", quantity: 2, price: 15.99, total: 31.98 },
      { name: "Caesar Salad", quantity: 1, price: 8.99, total: 8.99 },
      { name: "Garlic Bread", quantity: 1, price: 5.99, total: 5.99 },
    ],
    subtotal: 46.96,
    tax: 3.76,
    total: 50.72,
    status: orderStatus,
    orderDate: "2024-01-15 14:30",
    estimatedTime: "25 minutes",
    notes: "Extra cheese on pizza, no croutons on salad",
  }

  const handleStatusUpdate = () => {
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: "warning", text: "Pending" },
      preparing: { variant: "info", text: "Preparing" },
      ready: { variant: "success", text: "Ready" },
      completed: { variant: "secondary", text: "Completed" },
    }
    return statusConfig[status] || { variant: "secondary", text: status }
  }

  return (
    <div style={{ backgroundColor: appTheme.background, minHeight: "100vh" }}>
      <Header title="Order Details" />
      <Container fluid>
        <Row>
          <Col md={3} lg={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={9} lg={10}>
            <div className="p-4">
              <Row className="mb-4">
                <Col>
                  <h2 style={{ color: appTheme.primary }}>Order Details - {orderDetail.id}</h2>
                </Col>
                <Col xs="auto">
                  <Button variant="outline-secondary" onClick={() => navigate("/orders")}>
                    ← Back to Orders
                  </Button>
                </Col>
              </Row>

              {showAlert && (
                <Alert variant="success" className="mb-4">
                  Order status updated successfully!
                </Alert>
              )}

              <Row>
                <Col md={8}>
                  <Card className="mb-4">
                    <Card.Header style={{ backgroundColor: appTheme.secondary }}>
                      <h5 className="mb-0">Order Items</h5>
                    </Card.Header>
                    <Card.Body>
                      {orderDetail.items.map((item, index) => (
                        <Row key={index} className="mb-2 pb-2 border-bottom">
                          <Col md={6}>
                            <strong>{item.name}</strong>
                          </Col>
                          <Col md={2} className="text-center">
                            Qty: {item.quantity}
                          </Col>
                          <Col md={2} className="text-center">
                            ${item.price}
                          </Col>
                          <Col md={2} className="text-end">
                            <strong>${item.total}</strong>
                          </Col>
                        </Row>
                      ))}
                      <Row className="mt-3 pt-3 border-top">
                        <Col md={8}></Col>
                        <Col md={4}>
                          <div className="d-flex justify-content-between">
                            <span>Subtotal:</span>
                            <span>${orderDetail.subtotal}</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span>Tax:</span>
                            <span>${orderDetail.tax}</span>
                          </div>
                          <div className="d-flex justify-content-between border-top pt-2">
                            <strong>Total:</strong>
                            <strong>${orderDetail.total}</strong>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>

                  <Card>
                    <Card.Header style={{ backgroundColor: appTheme.secondary }}>
                      <h5 className="mb-0">Special Notes</h5>
                    </Card.Header>
                    <Card.Body>
                      <p className="mb-0">{orderDetail.notes || "No special instructions"}</p>
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
                        <strong>Name:</strong> {orderDetail.customer.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {orderDetail.customer.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {orderDetail.customer.phone}
                      </p>
                      <p>
                        <strong>Address:</strong> {orderDetail.customer.address}
                      </p>
                    </Card.Body>
                  </Card>

                  <Card>
                    <Card.Header style={{ backgroundColor: appTheme.secondary }}>
                      <h5 className="mb-0">Order Status</h5>
                    </Card.Header>
                    <Card.Body>
                      <div className="mb-3">
                        <p>
                          <strong>Order Date:</strong> {orderDetail.orderDate}
                        </p>
                        <p>
                          <strong>Estimated Time:</strong> {orderDetail.estimatedTime}
                        </p>
                        <p>
                          <strong>Current Status:</strong>{" "}
                          <Badge bg={getStatusBadge(orderStatus).variant}>{getStatusBadge(orderStatus).text}</Badge>
                        </p>
                      </div>

                      <Form.Group className="mb-3">
                        <Form.Label>Update Status:</Form.Label>
                        <Form.Select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
                          <option value="pending">Pending</option>
                          <option value="preparing">Preparing</option>
                          <option value="ready">Ready for Pickup</option>
                          <option value="completed">Completed</option>
                        </Form.Select>
                      </Form.Group>

                      <Button
                        style={{
                          backgroundColor: appTheme.primary,
                          borderColor: appTheme.primary,
                        }}
                        className="w-100"
                        onClick={handleStatusUpdate}
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

export default OrderDetailPage
