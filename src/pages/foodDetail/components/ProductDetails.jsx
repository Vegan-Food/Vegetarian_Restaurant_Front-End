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
                  <span
                    style={{
                      background: '#347928',
                      color: '#FFFFFF',
                      border:'#347928',
                      borderRadius: 20,
                      fontWeight: 700,
                      padding: '0.5rem 1.5rem',
                      fontSize: '1rem',
                      letterSpacing: 1,
                      display: 'inline-block'
                    }}
                    className="mb-3 text-uppercase"
                  >
                    {product.category}
                  </span>
                  <h1
                    style={{
                      color: product.name === 'Cơm chiên rau củ' ? '#000' : '#000000',
                      fontWeight: 700,
                      fontSize: '2.5rem'
                    }}
                    className="mb-3 lh-sm"
                  >
                    {product.name}
                  </h1>
                </div>

                {/* Price */}
                <div className="price-section mb-4">
                  <div className="mb-2" style={{ textAlign: 'left', width: '100%' }}>
                    <h2 style={{ color: '#e53e3e', fontWeight: 700, fontSize: '2rem', margin: 0 }}>
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product?.price || 0)}
                    </h2>
                  </div>
                </div>

                {/* Rating */}
                <Card className="mb-4" style={{ border: '1.5px solid #FCCD2A', boxShadow: '0 4px 18px 0 rgba(52, 121, 40, 0.10)', background: '#fff', borderRadius: 16 }}>
                  <Card.Body className="p-3 rounded-3">
                    <Row className="align-items-center">
                      <Col xs="auto">
                        <div className="d-flex">
                          {Array.from({ length: 5 }, (_, index) => {
                            const starValue = index + 1
                            const isFilled = rating >= starValue
                            
                            return (
                              <StarFill 
                                key={index} 
                                className={`me-1`}
                                size={20}
                                style={{ color: isFilled ? '#FCCD2A' : '#E2E8F0' }}
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
                  <Col md={12}>
                    <div className="d-flex align-items-end gap-2">
                      <div className="quantity-section flex-grow-1" style={{ maxWidth: 300 }}>
                        <label className="form-label fw-bold mb-2">Số lượng:</label>
                        <ButtonGroup size="lg" className="w-100">
                          <Button variant="outline-success" onClick={decrementQuantity} className="px-3">
                            <Dash size={18} />
                          </Button>
                          <Button variant="outline-success" disabled className="px-3 fw-bold">
                            {quantity}
                          </Button>
                          <Button variant="outline-success" onClick={incrementQuantity} className="px-3">
                            <Plus size={18} />
                          </Button>
                        </ButtonGroup>
                      </div>
                      <Button 
                        size="lg" 
                        className="py-2 px-4 fw-bold d-flex align-items-center justify-content-center gap-2 border-0" 
                        style={{ minWidth: 180, background: '#FCCD2A', color: '#347928', borderRadius: 12, boxShadow: '0 2px 8px rgba(52,121,40,0.08)', fontWeight: 700 }}
                        onClick={handleAddToCart}
                      >
                        <Cart size={20} style={{ color: '#347928' }} />
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
              <Card className="border-0 shadow-sm" style={{ borderLeft: '6px solid #347928', borderRadius: 16 }}>
                <Card.Header className="border-0 py-3" style={{ background: '#347928', color: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                  <h5 className="mb-0 fw-bold" style={{ color: '#fff' }}>Thông tin chi tiết</h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <ListGroup variant="flush">
                    <ListGroup.Item className="border-0 px-0 py-3" style={{ background: '#F8FAF5', borderRadius: 12, marginBottom: 10 }}>
                      <Row>
                        <Col sm={4} className="fw-semibold" style={{ color: '#347928' }}>
                          Danh mục:
                        </Col>
                        <Col sm={8}>
                          <span
                            style={
                              ["Gạo", "Ngũ cốc"].includes(product.category)
                                ? { background: '#347928', color: '#fff', borderRadius: 8, padding: '4px 12px', display: 'inline-block' }
                                : { color: '#2d3748' }
                            }
                          >
                            {product.category}
                          </span>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0 py-3" style={{ background: '#F8FAF5', borderRadius: 12, marginBottom: 10 }}>
                      <Row>
                        <Col sm={4} className="fw-semibold" style={{ color: '#347928' }}>
                          Tình trạng:
                        </Col>
                        <Col sm={8}>
                          <span style={{ color: '#2d3748' }}>
                            Còn hàng
                          </span>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0 py-3" style={{ background: '#F8FAF5', borderRadius: 12 }}>
                      <Row>
                        <Col sm={4} className="fw-semibold" style={{ color: '#347928' }}>
                          Mô tả:
                        </Col>
                        <Col sm={8}>
                          <p className="mb-0" style={{ color: '#718096' }}>{product.description}</p>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card className="border-0 shadow-sm" style={{ borderLeft: '6px solid #347928', borderRadius: 16 }}>
                <Card.Header className="border-0 py-3" style={{ background: '#347928', color: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                  <h5 className="mb-0 fw-bold" style={{ color: '#fff' }}>Chính sách bán hàng</h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <ListGroup variant="flush">
                    <ListGroup.Item className="border-0 px-0 py-3 d-flex align-items-center" style={{ background: '#F8FAF5', borderRadius: 12 }}>
                      <Truck className="me-3" size={20} style={{ color: '#347928' }} />
                      <div>
                        <div className="fw-semibold" style={{ color: '#347928' }}>Miễn phí vận chuyển</div>
                        <small style={{ color: '#2d3748' }}>Đơn hàng từ 200.000đ</small>
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
