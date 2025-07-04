"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { appTheme } from "../../../constant/color_constants"
import StaffSidebar from "../StaffSidebar/StaffSidebar"
import { getProfile } from "../../../api/customer_profile"

const StaffProfile = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    position: "Staff",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile()
        setProfileData((prev) => ({
          ...prev,
          fullName: res.name || "",
          email: res.email || "",
          phone: res.phoneNumber || "",
          address: res.address || "",
        }))
      } catch (err) {
        // Xử lý lỗi nếu cần
      }
    }
    fetchProfile()
  }, [])

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
            <Col md={12}>
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
                        <Form.Group className="mb-3">
                          <Form.Label>Position</Form.Label>
                          <Form.Control type="text" name="position" value={profileData.position} disabled />
                        </Form.Group>
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
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default StaffProfile
