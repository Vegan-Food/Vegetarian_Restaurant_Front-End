"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Button, Form, Badge } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { appTheme } from "../../constant/color_constants"

const FoodListPage = () => {
  const navigate = useNavigate()
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Mock food items data
  const foodItems = [
    {
      id: "FOOD-001",
      name: "Margherita Pizza",
      category: "pizza",
      price: 15.99,
      description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
      status: "available",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.5,
      orders: 45,
    },
    {
      id: "FOOD-002",
      name: "Caesar Salad",
      category: "salad",
      price: 8.99,
      description: "Fresh romaine lettuce with caesar dressing and croutons",
      status: "available",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.2,
      orders: 32,
    },
    {
      id: "FOOD-003",
      name: "Chicken Burger",
      category: "burger",
      price: 12.99,
      description: "Grilled chicken breast with lettuce, tomato, and mayo",
      status: "unavailable",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      orders: 67,
    },
    {
      id: "FOOD-004",
      name: "Pasta Carbonara",
      category: "pasta",
      price: 14.99,
      description: "Creamy pasta with bacon, eggs, and parmesan cheese",
      status: "available",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.3,
      orders: 28,
    },
  ]

  const getStatusBadge = (status) => {
    return status === "available"
      ? { variant: "success", text: "Available" }
      : { variant: "danger", text: "Unavailable" }
  }

  const filteredItems =
    categoryFilter === "all" ? foodItems : foodItems.filter((item) => item.category === categoryFilter)

  return (
    <div style={{ backgroundColor: appTheme.background, minHeight: "100vh" }}>
      <Header title="Food Management" />
      <Container fluid>
        <Row>
          <Col md={3} lg={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={9} lg={10}>
            <div className="p-4">
              <Row className="mb-4">
                <Col>
                  <h2 style={{ color: appTheme.primary }}>Food Menu</h2>
                </Col>
                <Col xs="auto">
                  <Form.Select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    style={{ minWidth: "150px" }}
                  >
                    <option value="all">All Categories</option>
                    <option value="pizza">Pizza</option>
                    <option value="burger">Burgers</option>
                    <option value="pasta">Pasta</option>
                    <option value="salad">Salads</option>
                  </Form.Select>
                </Col>
              </Row>

              <Row>
                {filteredItems.map((item) => (
                  <Col md={6} lg={4} key={item.id} className="mb-4">
                    <Card className="h-100 shadow-sm">
                      <Card.Img variant="top" src={item.image} style={{ height: "200px", objectFit: "cover" }} />
                      <Card.Body className="d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <Card.Title style={{ color: appTheme.primary }}>{item.name}</Card.Title>
                          <Badge bg={getStatusBadge(item.status).variant}>{getStatusBadge(item.status).text}</Badge>
                        </div>

                        <Card.Text className="flex-grow-1">{item.description}</Card.Text>

                        <div className="mb-3">
                          <Row>
                            <Col>
                              <strong style={{ color: appTheme.accent, fontSize: "1.2rem" }}>${item.price}</strong>
                            </Col>
                            <Col className="text-end">
                              <small className="text-muted">
                                ⭐ {item.rating} ({item.orders} orders)
                              </small>
                            </Col>
                          </Row>
                        </div>

                        <Button
                          style={{
                            backgroundColor: appTheme.primary,
                            borderColor: appTheme.primary,
                          }}
                          onClick={() => navigate(`/food/${item.id}`)}
                        >
                          View Details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              {filteredItems.length === 0 && (
                <Card>
                  <Card.Body className="text-center py-5">
                    <h5>No items found</h5>
                    <p className="text-muted">Try adjusting your filter criteria</p>
                  </Card.Body>
                </Card>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default FoodListPage
