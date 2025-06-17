"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Heart, Star, Cart, Eye } from "react-bootstrap-icons"
import { useParams, useNavigate } from "react-router-dom"
import mealData from "../../../data/meal_data.json"
import feedbackData from "../../../data/feedback_data.json"
import { Container, Button, Badge, Card, Row, Col } from "react-bootstrap"

const SimilarProducts = () => {
  const [products, setProducts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [favorites, setFavorites] = useState(new Set())
  const navigate = useNavigate()
  const { productId } = useParams()
  const itemsPerPage = 4

  useEffect(() => {
    const allProducts = mealData.products
    const currentProductId = Number.parseInt(productId || "1")
    const currentProduct = allProducts.find((p) => p.product_id === currentProductId)

    if (currentProduct) {
      const similarItems = allProducts.filter(
        (p) => p.category === currentProduct.category && p.product_id !== currentProductId,
      )
      setProducts(similarItems.slice(0, 12)) // Limit for demo
    } else {
      setProducts(allProducts.slice(0, 12))
    }
  }, [productId])

  const calculateAverageRating = (productId) => {
    const productFeedbacks = feedbackData.filter((feedback) => feedback.product_id === productId)
    if (productFeedbacks.length === 0) return 0

    const totalRating = productFeedbacks.reduce((acc, review) => acc + (review.rating || 0), 0)
    return totalRating / productFeedbacks.length // Trả về số thập phân
  }

  const getFeedbackCount = (productId) => {
    return feedbackData.filter((feedback) => feedback.product_id === productId).length
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, products.length - itemsPerPage)
      return prev >= maxIndex ? 0 : prev + 1
    })
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, products.length - itemsPerPage)
      return prev === 0 ? maxIndex : prev - 1
    })
  }

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId)
    } else {
      newFavorites.add(productId)
    }
    setFavorites(newFavorites)
  }

  const handleProductClick = (productId) => {
    navigate(`/food-detail/${productId}`)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  const getDiscountPercentage = (index) => {
    const discounts = [15, 25, 20, 18, 12, 30, 8, 22, 16, 28, 14, 24]
    return discounts[index % discounts.length]
  }

  const getOriginalPrice = (price, discount) => {
    return Math.round(price / (1 - discount / 100))
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1
      const isFull = rating >= starValue
      const isHalf = rating >= starValue - 0.5 && rating < starValue
      
      if (isFull) {
        // Sao đầy
        return (
          <Star
            key={index}
            size={14}
            className="text-warning"
            fill="currentColor"
          />
        )
      } else if (isHalf) {
        // Sao nửa - sử dụng gradient hoặc clip-path
        return (
          <div key={index} className="position-relative d-inline-block">
            <Star
              size={14}
              className="text-muted"
              fill="none"
            />
            <div 
              className="position-absolute top-0 start-0 overflow-hidden"
              style={{ width: '50%' }}
            >
              <Star
                size={14}
                className="text-warning"
                fill="currentColor"
              />
            </div>
          </div>
        )
      } else {
        // Sao rỗng
        return (
          <Star
            key={index}
            size={14}
            className="text-muted"
            fill="none"
          />
        )
      }
    })
  }

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <section className="similar-products-section py-5 bg-light">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark mb-3">Sản phẩm tương tự</h2>
          <p className="fs-5 text-muted mb-0">Khám phá thêm những món ngon khác trong cùng danh mục</p>
        </div>

        {/* Products Carousel */}
        <div className="position-relative">
          {/* Navigation Buttons */}
          {products.length > itemsPerPage && (
            <>
              <Button
                variant="white"
                size="lg"
                className="position-absolute top-50 translate-middle-y start-0 rounded-circle shadow border-0"
                style={{ zIndex: 10, marginLeft: "-30px", width: "60px", height: "60px" }}
                onClick={prevSlide}
              >
                <ChevronLeft size={24} className="text-success" />
              </Button>

              <Button
                variant="white"
                size="lg"
                className="position-absolute top-50 translate-middle-y end-0 rounded-circle shadow border-0"
                style={{ zIndex: 10, marginRight: "-30px", width: "60px", height: "60px" }}
                onClick={nextSlide}
              >
                <ChevronRight size={24} className="text-success" />
              </Button>
            </>
          )}

          {/* Products Grid */}
          <Row className="g-4">
            {visibleProducts.map((product) => {
              return (
                <Col key={product.product_id} lg={3} md={6}>
                  <Card
                    className="h-100 border-0 shadow-sm product-card-hover"
                    style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                    onClick={() => handleProductClick(product.product_id)}
                  >
                    {/* Product Image */}
                    <div className="position-relative overflow-hidden">
                      <div className="product-image-container bg-light d-flex align-items-center justify-content-center p-4">
                        <Card.Img
                          variant="top"
                          src={product.image_url || "/placeholder.svg?height=200&width=200"}
                          alt={product.name}
                          className="img-fluid rounded"
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      </div>

                      {/* Favorite Button */}
                      <Button
                        variant="light"
                        size="sm"
                        className="position-absolute top-0 end-0 m-3 rounded-circle shadow-sm"
                        style={{ width: "40px", height: "40px" }}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(product.product_id)
                        }}
                      >
                        <Heart
                          size={16}
                          fill={favorites.has(product.product_id) ? "currentColor" : "none"}
                          className={favorites.has(product.product_id) ? "text-danger" : "text-muted"}
                        />
                      </Button>

                      {/* Quick View */}
                      <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 product-overlay">
                        <Button variant="success" size="sm" className="w-100">
                          <Eye size={14} className="me-2" />
                          Xem nhanh
                        </Button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <Card.Body className="p-4">
                      <div className="mb-2">
                        <Badge bg="success" className="mb-2 px-2 py-1 small">
                          {product.category}
                        </Badge>
                      </div>

                      <Card.Title className="h6 fw-bold text-dark mb-2 lh-sm" style={{ height: "2.5rem" }}>
                        {product.name.length > 50 ? `${product.name.substring(0, 50)}...` : product.name}
                      </Card.Title>

                      {/* Rating */}
                      <div className="d-flex align-items-center mb-3">
                        <div className="me-2">{renderStars(calculateAverageRating(product.product_id))}</div>
                        <small className="text-muted">
                          ({calculateAverageRating(product.product_id).toFixed(1)} - {getFeedbackCount(product.product_id)} đánh giá)
                        </small>
                      </div>

                      {/* Price */}
                      <div className="mb-3">
                        <h6 className="text-danger fw-bold mb-0">{formatPrice(product.price)}</h6>
                      </div>

                      {/* Description */}
                      <p className="text-muted small mb-3" style={{ height: "2.5rem" }}>
                        {product.description.length > 60
                          ? `${product.description.substring(0, 60)}...`
                          : product.description}
                      </p>

                      {/* Add to Cart */}
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="w-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Add to cart logic
                        }}
                      >
                        <Cart size={14} className="me-2" />
                        Thêm vào giỏ
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })}
          </Row>

          {/* Pagination Dots */}
          {products.length > itemsPerPage && (
            <div className="d-flex justify-content-center mt-5">
              {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, index) => (
                <Button
                  key={index}
                  variant={Math.floor(currentIndex / itemsPerPage) === index ? "success" : "outline-success"}
                  size="sm"
                  className="rounded-circle mx-1"
                  style={{ width: "12px", height: "12px", padding: "0" }}
                  onClick={() => setCurrentIndex(index * itemsPerPage)}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

export default SimilarProducts;