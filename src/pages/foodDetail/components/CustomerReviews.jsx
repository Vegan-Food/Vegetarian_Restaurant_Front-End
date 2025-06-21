"use client"

import { useState, useEffect } from "react"
import { StarFill, Clock, PencilSquare } from "react-bootstrap-icons"
import { useParams } from "react-router-dom"
import feedbackData from "../../../data/feedback_data.json"
import userData from "../../../data/user_data.json"
import { Container, Row, Col, Button, ProgressBar, ButtonGroup, Modal, Form, Card, Badge } from "react-bootstrap"

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([])
  const [filteredReviews, setFilteredReviews] = useState([])
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [newRating, setNewRating] = useState(0)
  const [newComment, setNewComment] = useState("")
  const [statistics, setStatistics] = useState({
    total: 0,
    average: 0,
    distribution: [0, 0, 0, 0, 0],
  })
  const { productId } = useParams()

  useEffect(() => {
    const currentProductId = Number.parseInt(productId || "1")
    const productSpecificReviews = feedbackData.filter((review) => review.product_id === currentProductId)

    setReviews(productSpecificReviews)
    setFilteredReviews(productSpecificReviews)
    calculateStatistics(productSpecificReviews)
  }, [productId])

  const calculateStatistics = (reviewData) => {
    if (!Array.isArray(reviewData)) return

    const total = reviewData.length
    const sum = reviewData.reduce((acc, review) => acc + (review.rating || 0), 0)
    const average = total > 0 ? sum / total : 0

    const distribution = [0, 0, 0, 0, 0]
    reviewData.forEach((review) => {
      if (review.rating && review.rating >= 1 && review.rating <= 5) {
        distribution[review.rating - 1]++
      }
    })

    setStatistics({ total, average, distribution })
  }

  const filterReviews = (filter) => {
    setSelectedFilter(filter)
    let filtered = reviews

    if (!Array.isArray(reviews)) return

    switch (filter) {
      case "all":
        filtered = reviews
        break
      case "5":
      case "4":
      case "3":
      case "2":
      case "1":
        filtered = reviews.filter((review) => review.rating === Number.parseInt(filter))
        break
      default:
        filtered = reviews
    }

    setFilteredReviews(filtered)
  }

  const formatDate = (dateString) => {
    const now = new Date()
    const reviewDate = new Date(dateString)
    const diffTime = Math.abs(now.getTime() - reviewDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays <= 30) {
      return `${diffDays} ngày trước`
    } else {
      const diffMonths = Math.floor(diffDays / 30)
      return `${diffMonths} tháng trước`
    }
  }

  const renderStars = (rating, size = 16, interactive = false) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarFill
        key={index}
        size={size}
        className={`${index < rating ? "text-warning" : "text-muted"} ${interactive ? "rating-star-interactive" : ""}`}
        style={{ cursor: interactive ? "pointer" : "default" }}
        onClick={interactive ? () => setNewRating(index + 1) : undefined}
      />
    ))
  }

  const getUserInitial = (userId) => {
    const user = userData.find((u) => u.user_id === userId)
    return user ? user.name.charAt(0).toUpperCase() : ""
  }

  const getUserName = (userId) => {
    const user = userData.find((u) => u.user_id === userId)
    return user ? user.name : "Anonymous"
  }

  const handleSubmitReview = () => {
    if (newRating > 0 && newComment.trim().length >= 20) {
      // Here you would typically submit to your backend
      setShowWriteReview(false)
      setNewRating(0)
      setNewComment("")
    }
  }

  return (
    <section className="customer-reviews-section py-5 bg-white">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark mb-3">Đánh giá từ khách hàng</h2>
          <p className="fs-5 text-muted mb-0">Chia sẻ trải nghiệm của bạn với sản phẩm này</p>
        </div>

        <Row className="g-5 align-items-start">
          {/* Rating Summary - Left Side */}
          <Col lg={4}>
            <Card className="border-0 shadow-enhanced h-100 rating-summary-card">
              <Card.Body className="p-4 text-center">
                <div className="mb-4">
                  <div className="display-1 fw-bold text-warning mb-2">{statistics.average.toFixed(1)}</div>
                  <div className="mb-3">{renderStars(Math.round(statistics.average), 24)}</div>
                  <p className="fs-5 text-muted mb-4">Dựa trên {statistics.total} đánh giá</p>
                  <Button
                    variant="success"
                    size="lg"
                    className="px-4 py-3 fw-bold w-100 write-review-btn"
                    onClick={() => setShowWriteReview(true)}
                  >
                    <PencilSquare className="me-2" size={18} />
                    Viết đánh giá
                  </Button>
                </div>

                {/* Rating Distribution */}
                <div className="rating-distribution">
                  <h6 className="fw-bold mb-3">Phân bố đánh giá</h6>
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="d-flex align-items-center mb-2">
                      <span className="me-2 fw-semibold" style={{ width: "20px" }}>
                        {star}
                      </span>
                      <StarFill className="text-warning me-2" size={14} />
                      <div className="flex-grow-1 me-2">
                        <ProgressBar
                          now={statistics.total > 0 ? (statistics.distribution[star - 1] / statistics.total) * 100 : 0}
                          style={{ height: "8px" }}
                          variant="warning"
                          className="enhanced-progress"
                        />
                      </div>
                      <small className="text-muted" style={{ width: "30px" }}>
                        {statistics.distribution[star - 1]}
                      </small>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Reviews List - Right Side */}
          <Col lg={8}>
            {/* Filter Buttons - Left Aligned */}
            <div className="d-flex justify-content-start mb-4">
              <ButtonGroup className="filter-buttons-group">
                <Button
                  variant={selectedFilter === "all" ? "success" : "outline-success"}
                  onClick={() => filterReviews("all")}
                  className="px-4 filter-btn"
                >
                  Tất cả ({statistics.total})
                </Button>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <Button
                    key={rating}
                    variant={selectedFilter === rating.toString() ? "success" : "outline-success"}
                    onClick={() => filterReviews(rating.toString())}
                    className="px-3 filter-btn"
                  >
                    {rating} <StarFill size={12} className="ms-1 text-warning" />
                    <span className="ms-1">({statistics.distribution[rating - 1]})</span>
                  </Button>
                ))}
              </ButtonGroup>
            </div>

            {/* Reviews List with Enhanced Scrollbar */}
            <div className="reviews-container-wrapper">
              <div className="reviews-container enhanced-scrollbar" style={{ maxHeight: "600px", overflowY: "auto" }}>
                {Array.isArray(filteredReviews) && filteredReviews.length > 0 ? (
                  <div className="d-flex flex-column gap-4">
                    {filteredReviews.map((review, index) => (
                      <Card key={index} className="border-0 shadow-enhanced review-card">
                        <Card.Body className="p-4">
                          <Row>
                            <Col xs="auto">
                              <div
                                className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center fw-bold user-avatar"
                                style={{ width: "50px", height: "50px" }}
                              >
                                {getUserInitial(review.user_id)}
                              </div>
                            </Col>
                            <Col>
                              <div className="review-header mb-3">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                  <div>
                                    <h6 className="fw-bold mb-1">{getUserName(review.user_id)}</h6>
                                    <div className="d-flex align-items-center">
                                      <div className="me-3">{renderStars(review.rating, 16)}</div>
                                      <Badge bg="light" text="muted" className="small">
                                        <Clock size={12} className="me-1" />
                                        {formatDate(review.created_at)}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <p className="text-dark mb-3 lh-base">{review.comment}</p>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="border-0 bg-light shadow-enhanced">
                    <Card.Body className="text-center py-5">
                      <h5 className="fw-bold mb-3">Chưa có đánh giá nào</h5>
                      <p className="text-muted mb-4">Hãy là người đầu tiên đánh giá sản phẩm này!</p>
                      <Button variant="success" onClick={() => setShowWriteReview(true)} className="write-review-btn">
                        Viết đánh giá đầu tiên
                      </Button>
                    </Card.Body>
                  </Card>
                )}
              </div>
            </div>
          </Col>
        </Row>

        {/* Write Review Modal */}
        <Modal
          show={showWriteReview}
          onHide={() => setShowWriteReview(false)}
          size="lg"
          centered
          className="review-modal"
        >
          <Modal.Header closeButton className="bg-success text-white border-0">
            <Modal.Title className="fw-bold">Viết đánh giá sản phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <Form>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold fs-5 mb-3">Đánh giá của bạn</Form.Label>
                <div className="d-flex gap-2 mb-3 justify-content-center">{renderStars(newRating, 40, true)}</div>
                <div className="text-center">
                  <small className="text-muted">
                    {newRating === 0 && "Nhấp vào sao để đánh giá"}
                    {newRating === 1 && "Rất không hài lòng"}
                    {newRating === 2 && "Không hài lòng"}
                    {newRating === 3 && "Bình thường"}
                    {newRating === 4 && "Hài lòng"}
                    {newRating === 5 && "Rất hài lòng"}
                  </small>
                </div>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold fs-5">Nhận xét chi tiết</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này"
                  className="fs-6"
                />
                <Form.Text className="text-muted">
                  Hãy chia sẻ những điều bạn thích về sản phẩm này để giúp người khác đưa ra quyết định mua hàng.
                </Form.Text>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="border-0 p-4">
            <Button variant="outline-secondary" size="lg" onClick={() => setShowWriteReview(false)}>
              Hủy bỏ
            </Button>
            <Button
              variant="success"
              size="lg"
              disabled={newRating === 0}
              onClick={handleSubmitReview}
              className="write-review-btn"
            >
              Gửi đánh giá
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </section>
  )
}

export default CustomerReviews;