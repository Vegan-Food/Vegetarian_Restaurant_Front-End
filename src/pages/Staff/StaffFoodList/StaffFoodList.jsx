"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Table, Badge, Button, Form, InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { appTheme } from "../../../constant/color_constants"
import StaffSidebar from "../StaffSidebar/StaffSidebar"

const StaffFoodList = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [foods, setFoods] = useState([
    {
      id: 1,
      name: "Beef Pho",
      category: "Noodles",
      price: "75,000đ",
      status: "Available",
      description: "Traditional Vietnamese beef noodle soup",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Grilled Pork",
      category: "Main Course",
      price: "65,000đ",
      status: "Available",
      description: "Marinated grilled pork with rice",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Fish Cake",
      category: "Appetizer",
      price: "45,000đ",
      status: "Out of Stock",
      description: "Fresh fish cake with herbs",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 4,
      name: "Spring Rolls",
      category: "Appetizer",
      price: "35,000đ",
      status: "Available",
      description: "Fresh spring rolls with shrimp",
      image: "/placeholder.svg?height=60&width=60",
    },
  ])

  const getStatusBadge = (status) => {
    const statusColors = {
      Available: "success",
      "Out of Stock": "danger",
      Limited: "warning",
    }
    return <Badge bg={statusColors[status]}>{status}</Badge>
  }

  const handleViewDetail = (foodId) => {
    navigate(`/staff-food-detail/${foodId}`)
  }

  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="dashboard-container">
      <StaffSidebar />
      <div className="main-content" style={{ backgroundColor: appTheme.background }}>
        <Container fluid className="p-4">
          <Row className="mb-4">
            <Col>
              <h2 style={{ color: appTheme.primary }}>Food List</h2>
              <p className="text-muted">View available food items and their status.</p>
            </Col>
          </Row>

          {/* Search Bar */}
          <Row className="mb-4">
            <Col md={6}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search food items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline-secondary">🔍</Button>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <Card.Header style={{ backgroundColor: appTheme.primary, color: "white" }}>
                  <h5 className="mb-0">Available Food Items</h5>
                </Card.Header>
                <Card.Body>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFoods.map((food, index) => (
                        <tr key={index}>
                          <td>
                            <img
                              src={food.image || "/placeholder.svg"}
                              alt={food.name}
                              style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
                            />
                          </td>
                          <td>
                            <strong>{food.name}</strong>
                          </td>
                          <td>{food.category}</td>
                          <td>
                            <strong>{food.price}</strong>
                          </td>
                          <td>{getStatusBadge(food.status)}</td>
                          <td>{food.description}</td>
                          <td>
                            <Button variant="outline-primary" size="sm" onClick={() => handleViewDetail(food.id)}>
                              View Detail
                            </Button>
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

export default StaffFoodList
