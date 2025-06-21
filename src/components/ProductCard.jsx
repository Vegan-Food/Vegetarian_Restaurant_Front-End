import React from "react"
import { Card, Badge, Button } from "react-bootstrap"
import { Star, Heart, ShoppingCart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import "./ProductCard.css"
import mealData from "../data/meal_data.json"
import feedbackData from "../data/feedback_data.json"

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  // Lấy thông tin số lượng đã bán từ meal_data.json
  const soldCount = mealData.products.find(p => p.product_id === product.product_id)?.total_order || 0

  // Tính rating trung bình từ feedback_data.json
  const productFeedbacks = feedbackData.filter(feedback => feedback.product_id === product.product_id)
  const averageRating = productFeedbacks.length > 0 
    ? productFeedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / productFeedbacks.length 
    : 0

  const handleCardClick = () => {
    navigate(`/foodDetail/${product.product_id}`)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation() // Ngăn chặn sự kiện click lan ra card
    addToCart(product, 1)
  }

  const handleFavoriteClick = (e) => {
    e.stopPropagation() // Ngăn chặn sự kiện click lan ra card
    // Logic yêu thích có thể được thêm ở đây
  }

  return (
    <Card
      className="h-100 border-0 shadow-sm product-card-hover"
      style={{ cursor: "pointer", transition: "all 0.3s ease" }}
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div className="position-relative overflow-hidden">
        <div className="product-image-container">
          <Card.Img
            variant="top"
            src={product.image_url || product.image || "/placeholder.svg?height=200&width=200"}
            alt={product.name}
            className="product-image"
          />
        </div>
      </div>
      {/* Product Info */}
      <Card.Body className="p-4">
        <div className="mb-2">
          {product.category && (
            <Badge bg="success" className="mb-2 px-2 py-1 small">
              {product.category}
            </Badge>
          )}
        </div>
        <Card.Title className="h6 fw-bold text-dark mb-2 lh-sm" style={{ height: "2.5rem" }}>
          {product.name && product.name.length > 50 ? `${product.name.substring(0, 50)}...` : product.name}
        </Card.Title>
        {/* Rating & Sold Row */}
        <div className="d-flex align-items-center mb-3" style={{ fontWeight: 600 }}>
          <div className="d-flex align-items-center" style={{ flex: 1 }}>
            <span style={{ color: '#f6ad55', fontWeight: 700, fontSize: '1.2rem' }}>
              {Array.from({ length: 5 }, (_, index) => {
                const starValue = index + 1
                const isFilled = averageRating >= starValue
                
                return (
                  <Star 
                    key={index} 
                    size={14} 
                    className={isFilled ? "text-warning" : "text-muted"} 
                    fill={isFilled ? "currentColor" : "none"}
                  />
                )
              })}
            </span>
          </div>
          <div className="text-end" style={{ flex: 1, color: '#347928', fontWeight: 700, fontSize: '1rem' }}>
            {soldCount} lượt bán
          </div>
        </div>
        {/* Price */}
        <div className="mb-3">
          <h6 className="text-danger fw-bold mb-0">{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}</h6>
        </div>
        {/* Description */}
        <p className="text-muted small mb-3" style={{ height: "2.5rem" }}>
          {product.description && product.description.length > 60
            ? `${product.description.substring(0, 60)}...`
            : product.description}
        </p>
        {/* Add to Cart */}
        <Button
          variant="outline-success"
          size="sm"
          className="w-100"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={14} className="me-2" />
          Thêm vào giỏ
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
