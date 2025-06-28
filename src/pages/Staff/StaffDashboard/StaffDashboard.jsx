"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Badge, Table } from "react-bootstrap"
import { appTheme } from "../../../constant/color_constants"
import StaffSidebar from "../StaffSidebar/StaffSidebar"

const StaffDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    assignedOrders: 12,
    completedToday: 8,
    pendingOrders: 4,
    customerSupport: 3,
  })

  const [recentOrders, setRecentOrders] = useState([
    { id: "#ORD001", customer: "Nguyen Van A", items: "Beef Pho, Fish Cake", status: "Preparing", amount: "150,000đ" },
    { id: "#ORD002", customer: "Tran Thi B", items: "Grilled Pork, Spring Rolls", status: "Ready", amount: "100,000đ" },
    { id: "#ORD003", customer: "Le Van C", items: "Chicken Pho, Fish Cake", status: "Delivering", amount: "130,000đ" },
    { id: "#ORD004", customer: "Pham Thi D", items: "Grilled Pork", status: "Pending", amount: "55,000đ" },
  ])

  const getStatusBadge = (status) => {
    const statusColors = {
      Preparing: "warning",
      Ready: "success",
      Delivering: "info",
      Pending: "secondary",
    }
    return <Badge bg={statusColors[status]}>{status}</Badge>
  }

  return (
    <div className="dashboard-container">
      <StaffSidebar />
      <div className="main-content" style={{ backgroundColor: appTheme.background }}>
        <Container fluid className="p-4">
          <Row className="mb-4">
            <Col>
              <h2 style={{ color: appTheme.primary }}>Staff Dashboard</h2>
              <p className="text-muted">Monitor your assigned tasks and orders.</p>
            </Col>
          </Row>

          {/* Statistics Cards */}
          <Row className="mb-4">
            <Col md={3}>
              <Card className="h-100" style={{ backgroundColor: "#E3F2FD", border: "none" }}>
                <Card.Body>
                  <h3 className="mb-1">{dashboardData.assignedOrders}</h3>
                  <p className="text-muted mb-0">Assigned Orders</p>
                  <small className="text-success">Today's assignments</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100" style={{ backgroundColor: appTheme.secondary, border: "none" }}>
                <Card.Body>
                  <h3 className="mb-1">{dashboardData.completedToday}</h3>
                  <p className="text-muted mb-0">Completed Today</p>
                  <small className="text-success">+2 from yesterday</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100" style={{ backgroundColor: "#FFF3E0", border: "none" }}>
                <Card.Body>
                  <h3 className="mb-1">{dashboardData.pendingOrders}</h3>
                  <p className="text-muted mb-0">Pending Orders</p>
                  <small className="text-warning">Needs attention</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100" style={{ backgroundColor: "#F3E5F5", border: "none" }}>
                <Card.Body>
                  <h3 className="mb-1">{dashboardData.customerSupport}</h3>
                  <p className="text-muted mb-0">Support Requests</p>
                  <small className="text-info">Active tickets</small>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recent Orders */}
          <Row>
            <Col>
              <Card>
                <Card.Header style={{ backgroundColor: appTheme.primary, color: "white" }}>
                  <h5 className="mb-0">My Assigned Orders</h5>
                </Card.Header>
                <Card.Body>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Status</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, index) => (
                        <tr key={index}>
                          <td>
                            <strong>{order.id}</strong>
                          </td>
                          <td>{order.customer}</td>
                          <td>{order.items}</td>
                          <td>{getStatusBadge(order.status)}</td>
                          <td>
                            <strong>{order.amount}</strong>
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
    </div>
  )
}

export default StaffDashboard
