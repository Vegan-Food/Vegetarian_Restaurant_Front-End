"use client"
import { Row, Col, Card, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { appTheme } from "../../constant/color_constants"
import "./Dashboard.css"

const Dashboard = () => {
  const navigate = useNavigate()

  const dashboardCards = [
    {
      title: "Pending Orders",
      count: "12",
      icon: "📋",
      color: appTheme.accent,
      path: "/orders",
    },
    {
      title: "Support Requests",
      count: "5",
      icon: "🎧",
      color: appTheme.primary,
      path: "/support",
    },
    {
      title: "Food Items",
      count: "48",
      icon: "🍽️",
      color: appTheme.secondary,
      path: "/food",
    },
    {
      title: "Customer Feedback",
      count: "23",
      icon: "⭐",
      color: "#ff6b6b",
      path: "/support",
    },
  ]

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        {/* <Header title="Staff Dashboard" /> */}
        <div className="content-wrapper">
          <div className="p-4">
            <h2 style={{ color: appTheme.primary }} className="mb-4">
              Welcome Back, Staff Member!
            </h2>

            <Row>
              {dashboardCards.map((card, index) => (
                <Col md={6} lg={3} key={index} className="mb-4">
                  <Card
                    className="h-100 shadow-sm dashboard-card"
                    style={{
                      border: `1px solid ${card.color}`,
                      cursor: "pointer",
                      transition: "transform 0.2s",
                    }}
                    onClick={() => navigate(card.path)}
                  >
                    <Card.Body className="text-center">
                      <div style={{ fontSize: "2rem" }} className="mb-2">
                        {card.icon}
                      </div>
                      <h3 style={{ color: card.color }}>{card.count}</h3>
                      <p className="mb-0">{card.title}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <Row className="mt-4">
              <Col md={6}>
                <Card>
                  <Card.Header style={{ backgroundColor: appTheme.secondary }}>
                    <h5 className="mb-0">Recent Activities</h5>
                  </Card.Header>
                  <Card.Body>
                    <ul className="list-unstyled">
                      <li className="mb-2">✅ Order #1234 completed</li>
                      <li className="mb-2">📞 Support ticket #567 resolved</li>
                      <li className="mb-2">🍕 New menu item added</li>
                      <li className="mb-2">⭐ Customer feedback received</li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card>
                  <Card.Header style={{ backgroundColor: appTheme.secondary }}>
                    <h5 className="mb-0">Quick Actions</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-grid gap-2">
                      <Button variant="outline-primary" onClick={() => navigate("/orders")}>
                        View All Orders
                      </Button>
                      <Button variant="outline-success" onClick={() => navigate("/support")}>
                        Check Support Requests
                      </Button>
                      <Button variant="outline-info" onClick={() => navigate("/profile")}>
                        Update Profile
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
