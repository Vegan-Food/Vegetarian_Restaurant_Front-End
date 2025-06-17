"use client"

import { useState, useEffect } from "react"
import { StarFill, Dash, Plus, Cart, Eye, Heart, Share, Shield, Truck, Award } from "react-bootstrap-icons"
import "./ProductDetails.css"
import placeholderImage from "../../../assets/image/placeholder.svg"
import { useParams } from "react-router-dom"
import mealData from "../../../data/meal_data.json"
import imgProduct from "../../../assets/image/foods/image1.png"
import { Container, Row, Col, Image, Button, Badge, ButtonGroup, Alert, Card, ListGroup } from "react-bootstrap"

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1)
  const [showAlert, setShowAlert] = useState(false)
  const { productId } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const foundProduct = mealData.products.find((p) => p.product_id === Number.parseInt(productId || "1"))
    setProduct(foundProduct)
  }, [productId])

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  const handleAddToCart = () => {
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  if (!product) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "500px" }}>
        <div className="text-center">
          <div className="spinner-border text-success" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted fs-5">Đang tải thông tin sản phẩm...</p>
        </div>
      </Container>
    )
  }

  return (
    <>
      {showAlert && (
        <Alert variant="success" className="position-fixed top-0 end-0 m-4 shadow-lg" style={{ zIndex: 1050 }}>
          <Cart className="me-2" />
          Đã thêm sản phẩm vào giỏ hàng thành công!
        </Alert>
      )}

      <section className="product-hero bg-light py-5 mt-4">
        <Container>
          <Row className="g-5 align-items-center">
            {/* Product Image - Left Side */}
            <Col lg={6}>
              <div className="product-image-wrapper position-relative">
                <div className="image-badges">
                </div>
                <div className="main-image-container bg-gradient-success p-4 rounded-4 shadow-lg">
                  <Image
                    src={imgProduct || placeholderImage}
                    alt={product.name}
                    className="img-fluid rounded-3 shadow"
                    style={{ maxHeight: "700px", width: "100%", objectFit: "contain" }}
                  />
                </div>
              </div>
            </Col>

            {/* Product Info - Right Side */}
            <Col lg={6}>
              <div className="product-info">
                {/* Category & Title */}
                <div className="mb-4">
                  <Badge bg="success" className="mb-3 px-3 py-2 fs-6 text-uppercase fw-bold">
                    {product.category}
                  </Badge>
                  <h1 className="display-4 fw-bold text-dark mb-3 lh-sm">{product.name}</h1>
                </div>

                {/* Rating */}
                <Card className="border-0 bg-warning bg-opacity-10 mb-4">
                  <Card.Body className="p-3">
                    <Row className="align-items-center">
                      <Col xs="auto">
                        <div className="d-flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarFill key={star} className="text-warning me-1" size={20} />
                          ))}
                        </div>
                      </Col>
                      <Col xs="auto">
                        <Badge bg="warning" text="dark" className="px-3 py-2 fs-6 fw-bold">
                          5.0
                        </Badge>
                      </Col>
                      <Col>
                        <span className="text-muted fs-6">({product.total_order} đánh giá)</span>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Price */}
                <div className="price-section mb-4">
                  <div className="d-flex align-items-baseline mb-2">
                    <h2 className="display-5 fw-bold text-danger me-3 mb-0">
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
                    </h2>
                    <span className="fs-4 text-muted text-decoration-line-through">
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                        product.price * 1.2,
                      )}
                    </span>
                  </div>
                </div>

                {/* Quantity & Actions */}
                <Row className="g-3 mb-4">
                  <Col md={6}>
                    <div className="quantity-section">
                      <label className="form-label fw-bold mb-2">Số lượng:</label>
                      <ButtonGroup size="lg" className="w-100">
                        <Button variant="outline-success" onClick={decrementQuantity} className="px-4">
                          <Dash size={20} />
                        </Button>
                        <Button variant="outline-success" disabled className="px-4 fw-bold">
                          {quantity}
                        </Button>
                        <Button variant="outline-success" onClick={incrementQuantity} className="px-4">
                          <Plus size={20} />
                        </Button>
                      </ButtonGroup>
                      <small className="text-muted d-block mt-2">
                        Còn <span className="fw-bold text-success">{product.stock_quantity}</span> sản phẩm
                      </small>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="action-buttons">
                      <label className="form-label fw-bold mb-2">Thao tác:</label>
                      <Button 
                        variant="success" 
                        size="lg" 
                        className="w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2" 
                        onClick={handleAddToCart}
                      >
                        <Cart size={24} />
                        Thêm vào giỏ
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Product Details Section */}
      <section className="product-details-section py-5 bg-white">
        <Container>
          <Row>
            <Col lg={8}>
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-light border-0 py-3">
                  <h4 className="mb-0 fw-bold">Thông tin chi tiết</h4>
                </Card.Header>
                <Card.Body className="p-4">
                  <ListGroup variant="flush">
                    <ListGroup.Item className="border-0 px-0 py-3">
                      <Row>
                        <Col sm={4} className="fw-semibold text-muted">
                          Danh mục:
                        </Col>
                        <Col sm={8}>
                          <span className="text-dark">
                            {product.category}
                          </span>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0 py-3">
                      <Row>
                        <Col sm={4} className="fw-semibold text-muted">
                          Tình trạng:
                        </Col>
                        <Col sm={8}>
                          <span className="text-dark">
                            Còn hàng
                          </span>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0 py-3">
                      <Row>
                        <Col sm={4} className="fw-semibold text-muted">
                          Mô tả:
                        </Col>
                        <Col sm={8}>
                          <p className="mb-0 text-muted lh-base">{product.description}</p>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-success text-white border-0 py-3">
                  <h5 className="mb-0 fw-bold">Chính sách bán hàng</h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <ListGroup variant="flush">
                    <ListGroup.Item className="border-0 px-0 py-2 d-flex align-items-center">
                      <Truck className="text-success me-3" size={20} />
                      <div>
                        <div className="fw-semibold">Miễn phí vận chuyển</div>
                        <small className="text-muted">Đơn hàng từ 200.000đ</small>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default ProductDetails
