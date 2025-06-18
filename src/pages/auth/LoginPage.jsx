"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { appTheme } from "../../constant/color_constants"
import Logo from "../../assets/image/Logo.png"

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Mock authentication - replace with real API call
    setTimeout(() => {
      if (credentials.username === "staff" && credentials.password === "password") {
        localStorage.setItem("staffToken", "mock-token")
        navigate("/dashboard")
      } else {
        setError("Invalid username or password")
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div style={{ backgroundColor: appTheme.background, minHeight: "100vh" }}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow" style={{ border: `1px solid ${appTheme.secondary}` }}>
              <Card.Header className="text-center" style={{ backgroundColor: appTheme.primary, color: "white" }}>
                <img
                    src={Logo}
                    alt="Logo"
                    className="logo"
                    onError={(e) => {
                        e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23FCCD2A'/%3E%3Ctext x='20' y='25' textAnchor='middle' fill='%23347928' fontSize='16' fontWeight='bold'%3EL%3C/text%3E%3C/svg%3E"
                    }}
                    />
                <h4 className="mb-0">Staff Login</h4>
              </Card.Header>
              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={credentials.username}
                      onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <div className="d-grid gap-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      style={{
                        backgroundColor: appTheme.primary,
                        borderColor: appTheme.primary,
                      }}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                  </div>
                </Form>
                <div className="text-center mt-3">
                  <small className="text-muted">Demo: username: staff, password: password</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default LoginPage
