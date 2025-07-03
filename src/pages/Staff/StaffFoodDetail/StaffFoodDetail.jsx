"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Row, Col, Card, Button, Badge, Table } from "react-bootstrap"
import { appTheme } from "../../../constant/color_constants"
import StaffSidebar from "../StaffSidebar/StaffSidebar"

const StaffFoodDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [food, setFood] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock data with additional fields - in real app, this would come from API
  const mockFoods = [
    {
      id: 1,
      name: "Beef Pho",
      category: "Noodles",
      price: "75,000đ",
      status: "Available",
      description: "Traditional Vietnamese beef noodle soup with tender beef slices, rice noodles, and aromatic herbs in a rich bone broth",
      image: "/placeholder.svg?height=300&width=300",
      total_order: 156,
      stock_quantity: 25,
      ingredients: "Beef, Rice noodles, Onions, Ginger, Star anise, Cinnamon, Fish sauce",
      preparation_time: "45 minutes",
      calories: 350,
    },
    {
      id: 2,
      name: "Grilled Pork",
      category: "Main Course",
      price: "65,000đ",
      status: "Available",
      description: "Marinated grilled pork served with jasmine rice, pickled vegetables, and fish sauce dip",
      image: "/placeholder.svg?height=300&width=300",
      total_order: 89,
      stock_quantity: 18,
      ingredients: "Pork shoulder, Lemongrass, Garlic, Sugar, Fish sauce, Rice",
      preparation_time: "30 minutes",
      calories: 420,
    },
    {
      id: 3,
      name: "Fish Cake",
      category: "Appetizer",
      price: "45,000đ",
      status: "Out of Stock",
      description: "Fresh fish cake made with local fish, herbs, and traditional spices, served with sweet chili sauce",
      image: "/placeholder.svg?height=300&width=300",
      total_order: 67,
      stock_quantity: 0,
      ingredients: "Fresh fish, Herbs, Chili, Garlic, Fish sauce, Cornstarch",
      preparation_time: "20 minutes",
      calories: 180,
    },
    {
      id: 4,
      name: "Spring Rolls",
      category: "Appetizer",
      price: "35,000đ",
      status: "Available",
      description: "Fresh spring rolls with shrimp, vegetables, and rice vermicelli wrapped in rice paper, served with peanut sauce",
      image: "/placeholder.svg?height=300&width=300",
      total_order: 123,
      stock_quantity: 32,
      ingredients: "Shrimp, Rice paper, Lettuce, Herbs, Rice vermicelli, Peanut sauce",
      preparation_time: "15 minutes",
      calories: 120,
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundFood = mockFoods.find(f => f.id === Number(id))
      setFood(foundFood)
      setLoading(false)
    }, 500)
  }, [id])

  const getStatusBadge = (status) => {
    const statusColors = {
      Available: "success",
      "Out of Stock": "danger",
      Limited: "warning",
    }
    return <Badge bg={statusColors[status]}>{status}</Badge>
  }

  const getStockBadge = (quantity) => {
    if (quantity === 0) return <Badge bg="danger">Out of Stock</Badge>
    if (quantity <= 10) return <Badge bg="warning">Low Stock</Badge>
    return <Badge bg="success">In Stock</Badge>
  }

  const handleBack = () => {
    navigate("/staff-food")
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <StaffSidebar />
        <div className="main-content" style={{ backgroundColor: appTheme.background }}>
          <Container fluid className="p-4">
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </Container>
        </div>
      </div>
    )
  }

  if (!food) {
    return (
      <div className="dashboard-container">
        <StaffSidebar />
        <div className="main-content" style={{ backgroundColor: appTheme.background }}>
          <Container fluid className="p-4">
            <Row className="mb-4">
              <Col>
                <h2 style={{ color: appTheme.primary }}>Food Detail</h2>
                <p className="text-muted">Food item not found.</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Body className="text-center">
                    <h5>Food Item Not Found</h5>
                    <p className="text-muted">The food item you're looking for doesn't exist.</p>
                    <Button variant="secondary" onClick={handleBack}>
                      Back to Food List
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <StaffSidebar />
      <div className="main-content" style={{ backgroundColor: appTheme.background }}>
        <Container fluid className="p-4">
          <Row className="mb-4">
            <Col>
              <h2 style={{ color: appTheme.primary }}>Food Detail - {food.name}</h2>
              <p className="text-muted">View detailed information about this food item.</p>
            </Col>
          </Row>

          {/* Main Food Information Card */}
          <Row className="mb-4">
            <Col>
              <Card>
                <Card.Header style={{ backgroundColor: appTheme.primary, color: "white" }}>
                  <h5 className="mb-0">Product Information</h5>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={4} className="text-center">
                      <img
                        src={food.image || "/placeholder.svg"}
                        alt={food.name}
                        style={{ 
                          width: "100%", 
                          maxWidth: "300px", 
                          height: "300px",
                          objectFit: "cover",
                          borderRadius: "12px",
                          border: "2px solid #e9ecef"
                        }}
                      />
                    </Col>
                    <Col md={8}>
                      <Row className="mb-3">
                        <Col md={6}>
                          <strong>Product ID:</strong> {food.id}
                        </Col>
                        <Col md={6}>
                          <strong>Status:</strong> {getStatusBadge(food.status)}
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={6}>
                          <strong>Name:</strong> {food.name}
                        </Col>
                        <Col md={6}>
                          <strong>Category:</strong> {food.category}
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={6}>
                          <strong>Price:</strong> 
                          <span style={{ color: appTheme.primary, fontSize: "1.2em", fontWeight: "bold", marginLeft: "8px" }}>
                            {food.price}
                          </span>
                        </Col>
                        <Col md={6}>
                          <strong>Stock Status:</strong> {getStockBadge(food.stock_quantity)}
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={6}>
                          <strong>Stock Quantity:</strong> {food.stock_quantity} units
                        </Col>
                        <Col md={6}>
                          <strong>Total Orders:</strong> {food.total_order} orders
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12}>
                          <strong>Description:</strong>
                          <p className="mt-2 text-muted">{food.description}</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Additional Details Card */}
          <Row className="mb-4">
            <Col>
              <Card>
                <Card.Header style={{ backgroundColor: appTheme.primary, color: "white" }}>
                  <h5 className="mb-0">Additional Details</h5>
                </Card.Header>
                <Card.Body>
                  <Table responsive>
                    <tbody>
                      <tr>
                        <td><strong>Ingredients:</strong></td>
                        <td>{food.ingredients}</td>
                      </tr>
                      <tr>
                        <td><strong>Preparation Time:</strong></td>
                        <td>{food.preparation_time}</td>
                      </tr>
                      <tr>
                        <td><strong>Calories:</strong></td>
                        <td>{food.calories} kcal</td>
                      </tr>
                      <tr>
                        <td><strong>Category:</strong></td>
                        <td>
                          <Badge bg="info">{food.category}</Badge>
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Popularity:</strong></td>
                        <td>
                          {food.total_order > 100 && <Badge bg="success" className="me-1">Popular</Badge>}
                          {food.total_order <= 50 && <Badge bg="warning" className="me-1">New Item</Badge>}
                          {food.total_order} total orders
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Statistics Card */}
          <Row className="mb-4">
            <Col md={4}>
              <Card className="text-center">
                <Card.Body>
                  <h3 style={{ color: appTheme.primary }}>{food.total_order}</h3>
                  <p className="text-muted mb-0">Total Orders</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center">
                <Card.Body>
                  <h3 style={{ color: food.stock_quantity > 10 ? "green" : food.stock_quantity > 0 ? "orange" : "red" }}>
                    {food.stock_quantity}
                  </h3>
                  <p className="text-muted mb-0">Stock Quantity</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center">
                <Card.Body>
                  <h3 style={{ color: appTheme.primary }}>{food.calories}</h3>
                  <p className="text-muted mb-0">Calories (kcal)</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Action Buttons */}
          <Row>
            <Col>
              <Button variant="secondary" onClick={handleBack} className="me-2">
                Back to Food List
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default StaffFoodDetail