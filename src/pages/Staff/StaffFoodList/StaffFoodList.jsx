"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Table, Badge, Button, Form, InputGroup, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { appTheme } from "../../../constant/color_constants"
import StaffSidebar from "../StaffSidebar/StaffSidebar"
import { getProducts } from "../../../api/product"

const StaffFoodList = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await getProducts()
        setFoods(data)
      } catch (err) {
        setFoods([])
      }
      setLoading(false)
    }
    fetchFoods()
  }, [])

  const getStatusBadge = (stock_quantity) => {
    if (stock_quantity > 0) return <Badge bg="success">Available</Badge>
    return <Badge bg="danger">Out of Stock</Badge>
  }

  const handleViewDetail = (foodId) => {
    navigate(`/staff-food-detail/${foodId}`)
  }

  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Spinner animation="border" variant="success" />
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
                      {filteredFoods.map((food) => (
                        <tr key={food.product_id}>
                          <td>
                            <img
                              src={food.image_url || "/placeholder.svg"}
                              alt={food.name}
                              style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
                            />
                          </td>
                          <td>
                            <strong>{food.name}</strong>
                          </td>
                          <td>{food.category}</td>
                          <td>
                            <strong>{food.price.toLocaleString()}đ</strong>
                          </td>
                          <td>{getStatusBadge(food.stock_quantity)}</td>
                          <td>{food.description}</td>
                          <td>
                            <Button variant="outline-primary" size="sm" onClick={() => handleViewDetail(food.product_id)}>
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
