"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Button, Form, Badge, Alert } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { appTheme } from "../../constant/color_constants"

const FoodDetailPage = () => {
  const { foodId } = useParams()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [foodData, setFoodData] = useState({
    id: foodId || "FOOD-001",
    name: "Margherita Pizza",
    category: "pizza",
    price: 15.99,
    description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
    status: "available",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.5,
    orders: 45,
    ingredients: ["Tomato Sauce", "Mozzarella Cheese", "Fresh Basil", "Olive Oil"],
    allergens: ["Dairy", "Gluten"],
    calories: 280,
    prepTime: "15 minutes",
  })

  const [customerFeedback] = useState([
    {
      id: 1,
      customer: "John Doe",
      rating: 5,
      comment: "Absolutely delicious! Best pizza in town.",
      date: "2024-01-14",
    },
    {
      id: 2,
      customer: "Jane Smith",
      rating: 4,
      comment: "Great taste, but could use more cheese.",
      date: "2024-01-13",
    },
    {
      id: 3,
      customer: "Mike Johnson",
      rating: 5,
      comment: "Perfect! Will order again.",
      date: "2024-01-12",
    },
  ])

  const handleSave = () => {
    setIsEditing(false)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  const getStatusBadge = (status) => {
    return status === "available"
      ? { variant: "success", text: "Available" }
      : { variant: "danger", text: "Unavailable" }
  }

  const renderStars = (rating) => {
    return "⭐".repeat(Math.floor(rating)) + (rating % 1 ? "⭐" : "")
  }

  return (
    <div style={{ backgroundColor: appTheme.background, minHeight: "100vh" }}>
      <Header title="Food Item Details" />
      <Container fluid>
        <Row>
          <Col md={3} lg={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={9} lg={10}>
            <div className="p-4">
              <Row className="mb-4">
                <Col>
                  <h2 style={{ color: appTheme.primary }}>Food Details - {foodData.id}</h2>
                </Col>
                <Col xs="auto">
                  <Button variant="outline-secondary" className="me-2" onClick={() => navigate("/food")}>
                    ← Back to Menu
                  </Button>
                  <Button
                    style={{
                      backgroundColor: isEditing ? appTheme.accent : appTheme.primary,
                      borderColor: isEditing ? appTheme.accent : appTheme.primary,
                      color: isEditing ? appTheme.primary : "white",
                    }}
                    onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  >
                    {isEditing ? "Save Changes" : "Edit Item"}
                  </Button>
                </Col>
              </Row>

              {showAlert && (
                <Alert variant="success" className="mb-4">
                  Food item updated successfully!
                </Alert>
              )}

              <Row>
                <Col md={6}>
                  <Card className="mb-4">
                    <Card.Img variant="top" src={foodData.image} style={{ height: "300px", objectFit: "cover" }} />
                    <Card.Body>
                      {isEditing ? (
                        <Form.Group>
                          <Form.Label>Item Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={foodData.name}
                            onChange={(e) => setFoodData({ ...foodData, name: e.target.value })}
                          />
                        </Form.Group>
                      ) : (
                        <Card.Title style={{ color: appTheme.primary }}>{foodData.name}</Card.Title>
                      )}

                      <div className="d-flex justify-content-between align-items-center mb-3">
                        {isEditing ? (
                          <Form.Group style={{ width: "100px" }}>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                              type="number"
                              step="0.01"
                              value={foodData.price}
                              onChange={(e) => setFoodData({ ...foodData, price: Number.parseFloat(e.target.value) })}
                            />
                          </Form.Group>
                        ) : (
                          <h4 style={{ color: appTheme.accent }}>${foodData.price}</h4>
                        )}

                        {isEditing ? (
                          <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                              value={foodData.status}
                              onChange={(e) => setFoodData({ ...foodData, status: e.target.value })}
                            >
                              <option value="available">Available</option>
                              <option value="unavailable">Unavailable</option>
                            </Form.Select>
                          </Form.Group>
                        ) : (
                          <Badge bg={getStatusBadge(foodData.status).variant}>
                            {getStatusBadge(foodData.status).text}
                          </Badge>
                        )}
                      </div>

                      {isEditing ? (
                        <Form.Group>
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={foodData.description}
                            onChange={(e) => setFoodData({ ...foodData, description: e.target.value })}
                          />
                        </Form.Group>
                      ) : (
                        <Card.Text>{foodData.description}</Card.Text>
                      )}
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card className="mb-4">
                    <Card.Header style={{ backgroundColor: appTheme.secondary }}>
                      <h5 className="mb-0">Item Information</h5>
                    </Card.Header>
                    <Card.Body>
                      <Row className="mb-3">
                        <Col sm={6}>
                          <strong>Category:</strong> {foodData.category}
                        </Col>
                        <Col sm={6}>
                          <strong>Prep Time:</strong> {foodData.prepTime}
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={6}>
                          <strong>Calories:</strong> {foodData.calories}
                        </Col>
                        <Col sm={6}>
                          <strong>Orders:</strong> {foodData.orders}
                        </Col>
                      </Row>
                      <div className="mb-3">
                        <strong>Rating:</strong> {renderStars(foodData.rating)} ({foodData.rating}/5)
                      </div>
                      <div className="mb-3">
                        <strong>Ingredients:</strong>
                        <ul className="mt-2">
                          {foodData.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong>Allergens:</strong>
                        <div className="mt-2">
                          {foodData.allergens.map((allergen, index) => (
                            <Badge key={index} bg="warning" className="me-1">
                              {allergen}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>

                  <Card>
                    <Card.Header style={{ backgroundColor: appTheme.secondary }}>
                      <h5 className="mb-0">Customer Feedback</h5>
                    </Card.Header>
                    <Card.Body style={{ maxHeight: "300px", overflowY: "auto" }}>
                      {customerFeedback.map((feedback) => (
                        <div key={feedback.id} className="mb-3 pb-3 border-bottom">
                          <div className="d-flex justify-content-between mb-2">
                            <strong>{feedback.customer}</strong>
                            <small className="text-muted">{feedback.date}</small>
                          </div>
                          <div className="mb-2">
                            {renderStars(feedback.rating)} ({feedback.rating}/5)
                          </div>
                          <p className="mb-0">{feedback.comment}</p>
                        </div>
                      ))}
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

export default FoodDetailPage
