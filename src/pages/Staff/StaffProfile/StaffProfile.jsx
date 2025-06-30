"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { appTheme } from "../../../constant/color_constants"
import StaffSidebar from "../StaffSidebar/StaffSidebar"

const StaffProfile = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: "Nguyen Van Staff",
    email: "staff@veganfood.com",
    phone: "0123456789",
    address: "123 Main Street, Ho Chi Minh City",
    position: "Kitchen Staff",
    department: "Food Preparation",
    joinDate: "2023-01-15",
    employeeId: "EMP001",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle profile update logic here
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  return (
    <div className="dashboard-container">
      <StaffSidebar />
      <div className="main-content" style={{ backgroundColor: appTheme.background }}>
        <Container fluid className="p-4">
          <Row className="mb-4">
            <Col>
              <h2 style={{ color: appTheme.primary }}>Staff Profile</h2>
              <p className="text-muted">Manage your personal information and account settings.</p>
            </Col>
          </Row>

          {showAlert && (
            <Alert variant="success" className="mb-4">
              Profile updated successfully!
            </Alert>
          )}

          <Row>
            <Col lg={8}>
              <Card>
                <Card.Header style={{ backgroundColor: appTheme.primary, color: "white" }}>
                  <h5 className="mb-0">Personal Information</h5>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="fullName"
                            value={profileData.fullName}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Employee ID</Form.Label>
                          <Form.Control type="text" name="employeeId" value={profileData.employeeId} disabled />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={profileData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Position</Form.Label>
                          <Form.Control type="text" name="position" value={profileData.position} disabled />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Department</Form.Label>
                          <Form.Control type="text" name="department" value={profileData.department} disabled />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Join Date</Form.Label>
                      <Form.Control type="date" name="joinDate" value={profileData.joinDate} disabled />
                    </Form.Group>

                    <div className="d-flex gap-2">
                      <Button type="submit" style={{ backgroundColor: appTheme.primary, border: "none" }}>
                        Update Profile
                      </Button>
                      <Button variant="outline-secondary">Cancel</Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <Card>
                <Card.Header style={{ backgroundColor: appTheme.secondary }}>
                  <h5 className="mb-0">Account Settings</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-grid gap-2">
                    <Button variant="outline-primary">Change Password</Button>
                    <Button variant="outline-info">Notification Settings</Button>
                    <Button variant="outline-warning">Privacy Settings</Button>
                  </div>
                </Card.Body>
              </Card>

              <Card className="mt-3">
                <Card.Header style={{ backgroundColor: appTheme.accent }}>
                  <h5 className="mb-0">Work Statistics</h5>
                </Card.Header>
                <Card.Body>
                  <div className="mb-3">
                    <strong>Orders Completed Today:</strong>
                    <div className="text-success fs-4">8</div>
                  </div>
                  <div className="mb-3">
                    <strong>This Month:</strong>
                    <div className="text-primary fs-4">156</div>
                  </div>
                  <div className="mb-3">
                    <strong>Performance Rating:</strong>
                    <div className="text-warning fs-4">4.8/5.0</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default StaffProfile
