"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { appTheme } from "../../constant/color_constants"

const ProfileEditPage = () => {
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(false)
  const [formData, setFormData] = useState({
    name: "John Smith",
    email: "john.smith@restaurant.com",
    phone: "+1 (555) 123-4567",
    address: "456 Oak Street, City, State 12345",
    emergencyContactName: "Jane Smith",
    emergencyContactRelationship: "Spouse",
    emergencyContactPhone: "+1 (555) 987-6543",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
      navigate("/profile")
    }, 2000)
  }

  const handleCancel = () => {
    navigate("/profile")
  }

  return (
    <div style={{ backgroundColor: appTheme.background, minHeight: "100vh" }}>
      <Header title="Edit Profile" />
      <Container fluid>
        <Row>
          <Col md={3} lg={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={9} lg={10}>
            <div className="p-4">
              <Row className="mb-4">
                <Col>
                  <h2 style={{ color: appTheme.primary }}>Edit Profile</h2>
                </Col>
                <Col xs="auto">
                  <Button variant="outline-secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Col>
              </Row>

              {showAlert && (
                <Alert variant="success" className="mb-4">
                  Profile updated successfully! Redirecting...
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Card className="mb-4">
                      <Card.Header style={{ backgroundColor: appTheme.secondary }}>
                        <h5 className="mb-0">Personal Information</h5>
                      </Card.Header>
                      <Card.Body>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Phone Number *</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={6}>
                    <Card className="mb-4">
                      <Card.Header style={{ backgroundColor: appTheme.secondary }}>
                        <h5 className="mb-0">Emergency Contact</h5>
                      </Card.Header>
                      <Card.Body>
                        <Form.Group className="mb-3">
                          <Form.Label>Contact Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="emergencyContactName"
                            value={formData.emergencyContactName}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Relationship *</Form.Label>
                          <Form.Select
                            name="emergencyContactRelationship"
                            value={formData.emergencyContactRelationship}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select Relationship</option>
                            <option value="Spouse">Spouse</option>
                            <option value="Parent">Parent</option>
                            <option value="Sibling">Sibling</option>
                            <option value="Child">Child</option>
                            <option value="Friend">Friend</option>
                            <option value="Other">Other</option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Contact Phone *</Form.Label>
                          <Form.Control
                            type="tel"
                            name="emergencyContactPhone"
                            value={formData.emergencyContactPhone}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Card.Body>
                    </Card>

                    <Card>
                      <Card.Header style={{ backgroundColor: appTheme.secondary }}>
                        <h5 className="mb-0">Profile Picture</h5>
                      </Card.Header>
                      <Card.Body>
                        <div className="text-center mb-3">
                          <img
                            src="/placeholder.svg?height=100&width=100"
                            alt="Current Profile"
                            className="rounded-circle"
                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                          />
                        </div>
                        <Form.Group>
                          <Form.Label>Upload New Picture</Form.Label>
                          <Form.Control type="file" accept="image/*" />
                          <Form.Text className="text-muted">Supported formats: JPG, PNG, GIF (Max 5MB)</Form.Text>
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col>
                    <Card>
                      <Card.Body>
                        <div className="d-flex justify-content-end gap-3">
                          <Button variant="outline-secondary" onClick={handleCancel}>
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            style={{
                              backgroundColor: appTheme.primary,
                              borderColor: appTheme.primary,
                            }}
                          >
                            Save Changes
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ProfileEditPage
