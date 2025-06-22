"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Table, Badge, Button, Modal, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { appTheme } from "../../../constant/color_constants"
import StaffSidebar from "../StaffSidebar/StaffSidebar"

const StaffOrderList = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orders, setOrders] = useState([
    {
      id: "#ORD001",
      customer: "Nguyen Van A",
      items: "Beef Pho, Fish Cake",
      status: "Preparing",
      amount: "150,000đ",
      orderTime: "10:30 AM",
      phone: "0123456789",
    },
    {
      id: "#ORD002",
      customer: "Tran Thi B",
      items: "Grilled Pork, Spring Rolls",
      status: "Ready",
      amount: "100,000đ",
      orderTime: "11:15 AM",
      phone: "0987654321",
    },
    {
      id: "#ORD003",
      customer: "Le Van C",
      items: "Chicken Pho, Fish Cake",
      status: "Delivering",
      amount: "130,000đ",
      orderTime: "11:45 AM",
      phone: "0456789123",
    },
    {
      id: "#ORD004",
      customer: "Pham Thi D",
      items: "Grilled Pork",
      status: "Pending",
      amount: "55,000đ",
      orderTime: "12:00 PM",
      phone: "0789123456",
    },
  ])

  const getStatusBadge = (status) => {
    const statusColors = {
      Preparing: "warning",
      Ready: "success",
      Delivering: "info",
      Pending: "secondary",
      Completed: "primary",
    }
    return <Badge bg={statusColors[status]}>{status}</Badge>
  }

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    setShowModal(false)
  }

  const handleViewDetail = (orderId) => {
    navigate(`/staff-order-detail/${orderId}`)
  }

  const openStatusModal = (order) => {
    setSelectedOrder(order)
    setShowModal(true)
  }

  return (
    <div className="d-flex">
      <StaffSidebar />
      <div className="flex-grow-1" style={{ backgroundColor: appTheme.background }}>
        <Container fluid className="p-4">
          <Row className="mb-4">
            <Col>
              <h2 style={{ color: appTheme.primary }}>Order Management</h2>
              <p className="text-muted">View and update assigned orders status.</p>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <Card.Header style={{ backgroundColor: appTheme.primary, color: "white" }}>
                  <h5 className="mb-0">Assigned Orders</h5>
                </Card.Header>
                <Card.Body>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Items</th>
                        <th>Order Time</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr key={index}>
                          <td>
                            <strong>{order.id}</strong>
                          </td>
                          <td>{order.customer}</td>
                          <td>{order.phone}</td>
                          <td>{order.items}</td>
                          <td>{order.orderTime}</td>
                          <td>{getStatusBadge(order.status)}</td>
                          <td>
                            <strong>{order.amount}</strong>
                          </td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                              onClick={() => handleViewDetail(order.id)}
                            >
                              View Detail
                            </Button>
                            <Button variant="outline-success" size="sm" onClick={() => openStatusModal(order)}>
                              Update Status
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
      </div>

      {/* Status Update Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div>
              <p>
                <strong>Order:</strong> {selectedOrder.id}
              </p>
              <p>
                <strong>Customer:</strong> {selectedOrder.customer}
              </p>
              <p>
                <strong>Current Status:</strong> {getStatusBadge(selectedOrder.status)}
              </p>

              <Form.Group className="mt-3">
                <Form.Label>New Status</Form.Label>
                <Form.Select id="statusSelect">
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Ready">Ready</option>
                  <option value="Delivering">Delivering</option>
                  <option value="Completed">Completed</option>
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
              const newStatus = document.getElementById("statusSelect").value
              handleStatusUpdate(selectedOrder.id, newStatus)
            }}
          >
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default StaffOrderList
