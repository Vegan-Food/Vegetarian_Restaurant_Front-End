"use client"

import { useState, useEffect } from "react"
import { StarFill, Dash, Plus, Cart, Eye, Heart, Share, Shield, Truck, Award } from "react-bootstrap-icons"
import "./ProductDetails.css"
import placeholderImage from "../../../assets/image/placeholder.svg"
import { useParams } from "react-router-dom"
import { useCart } from "../../../context/CartContext"
import mealData from "../../../data/meal_data.json"
import feedbackData from "../../../data/feedback_data.json"
import { Container, Row, Col, Image, Button, Badge, ButtonGroup, Alert, Card, ListGroup } from "react-bootstrap"

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1)
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [rating, setRating] = useState(0)
  const [feedbackCount, setFeedbackCount] = useState(0)
  const { addToCart } = useCart()

  useEffect(() => {
    console.log('ProductDetails - Received productId:', productId);
    if (!productId) {
      console.log('No productId provided');
      setProduct(null);
      return;
    }

    const parsedId = Number(productId);
    console.log('Parsed productId:', parsedId);
    
    if (isNaN(parsedId)) {
      console.log('Invalid productId - not a number');
      setProduct(null);
      return;
    }

    const foundProduct = mealData.products.find((p) => p.product_id === parsedId);
    console.log('Found product:', foundProduct);
    
    if (!foundProduct) {
      console.log('No product found with ID:', parsedId);
    }
    
    setProduct(foundProduct);

    // Calculate average rating and feedback count
    if (foundProduct) {
      const productFeedbacks = feedbackData.filter(feedback => feedback.product_id === parsedId);
      const totalRating = productFeedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
      const averageRating = productFeedbacks.length > 0 ? totalRating / productFeedbacks.length : 0;
      setRating(averageRating);
      setFeedbackCount(productFeedbacks.length);
    }
  }, [productId]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  }

  if (!productId) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "500px" }}>
        <div className="text-center">
          <h3 className="text-muted">Vui lòng chọn sản phẩm để xem chi tiết</h3>
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "500px" }}>
        <div className="text-center">
          <h3 className="text-muted">Không tìm thấy sản phẩm</h3>
          <p className="text-muted">Vui lòng thử lại với sản phẩm khác</p>
        </div>
      </Container>
    );
  }

  return (
    <>
      {/* showAlert and Alert component are removed as per the code block */}

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
                    src={product.image_url || placeholderImage}
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

                {/* Price */}
                <div className="price-section mb-4">
                  <div className="d-flex align-items-baseline mb-2">
                    <h2 className="display-5 fw-bold text-danger me-3 mb-0">
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product?.price || 0)}
                    </h2>
                  </div>
                </div>

                {/* Rating */}
                <Card className="border-0 bg-warning bg-opacity-10 mb-4">
                  <Card.Body className="p-3">
                    <Row className="align-items-center">
                      <Col xs="auto">
                        <div className="d-flex">
                          {Array.from({ length: 5 }, (_, index) => {
                            const starValue = index + 1
                            const isFilled = rating >= starValue
                            
                            return (
                              <StarFill 
                                key={index} 
                                className={`me-1 ${isFilled ? 'text-warning' : 'text-muted'}`} 
                                size={20} 
                              />
                            )
                          })}
                        </div>
                      </Col>
                      <Col>
                        <span className="text-muted fs-6">({product?.total_order || 0} lượt bán)</span>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

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
                        Còn <span className="fw-bold text-success">{product?.stock_quantity || 0}</span> sản phẩm
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
