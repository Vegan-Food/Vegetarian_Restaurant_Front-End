"use client"

import { useEffect } from "react"
import { Container, Row, Col, Card, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { appTheme } from "../../constant/color_constants"
import Logo from "../../assets/image/Logo.png"

const Logout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Clear authentication data
    localStorage.removeItem("staffToken")

    // Clear any other stored user data
    localStorage.removeItem("userData")
    localStorage.removeItem("userPreferences")

    // Redirect to home page after a short delay
    const timer = setTimeout(() => {
      navigate("/", { replace: true })
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div style={{ backgroundColor: appTheme.background, minHeight: "100vh" }}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow text-center" style={{ border: `1px solid ${appTheme.secondary}` }}>
              <Card.Header style={{ backgroundColor: appTheme.primary, color: "white" }}>
                <img
                src={Logo}
                alt="Logo"
                className="logo"
                onError={(e) => {
                    e.target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23FCCD2A'/%3E%3Ctext x='20' y='25' textAnchor='middle' fill='%23347928' fontSize='16' fontWeight='bold'%3EL%3C/text%3E%3C/svg%3E"
                }}
                />
                <h4 className="mb-0">Logging Out</h4>
              </Card.Header>
              <Card.Body className="py-5">
                <Spinner animation="border" style={{ color: appTheme.primary }} className="mb-3" />
                <h5 style={{ color: appTheme.primary }}>You have been logged out</h5>
                <p className="text-muted mb-0">Thank you for using our system. Redirecting to home page...</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Logout
