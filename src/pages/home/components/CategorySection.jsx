"use client"

import { useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import ProductCard from "../../../components/ProductCard"
import meal_data from "../../../data/meal_data.json"
import "./CategorySection.css"

const CATEGORY_LIST = [
  "Gạo & Ngũ cốc",
  "Rau củ",
  "Nấm",
  "Đậu & Đậu hũ",
  "Hạt & Củ",
  "Mì & Bún",
  "Món giả mặn",
  "Tráng miệng"
]

const CategorySection = () => {
  // Lưu trạng thái mở rộng/thu gọn cho từng danh mục
  const [expanded, setExpanded] = useState({})

  const toggleExpand = (category) => {
    setExpanded((prev) => ({ ...prev, [category]: !prev[category] }))
  }

  return (
    <div className="category-section">
      <Container>
        {CATEGORY_LIST.map((category) => {
          // Lấy tối đa 8 món đầu tiên thuộc category này
          const allProducts = meal_data.products.filter(p => p.category === category).slice(0, 8)
          const isExpanded = expanded[category]
          const products = isExpanded ? allProducts : allProducts.slice(0, 4)
          const showViewMore = allProducts.length > 4
          // Tạo id cho từng section
          const idMap = {
            "Gạo & Ngũ cốc": "gao-ngu-coc",
            "Rau củ": "rau-cu",
            "Nấm": "nam",
            "Đậu & Đậu hũ": "dau-dauhu",
            "Hạt & Củ": "hat-cu",
            "Mì & Bún": "mi-bun",
            "Món giả mặn": "mon-gia-man",
            "Tráng miệng": "trang-mieng"
          }
          const sectionId = idMap[category] || category
          return (
            <div key={category} className="category-content mb-5" id={sectionId}>
              <div className="category-header mb-3">
                <div className="category-title">
                  <h2>{category}</h2>
                </div>
              </div>
              <Row>
                {products.map((product) => (
                  <Col lg={3} md={6} className="mb-4" key={product.product_id}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
              {showViewMore && (
                <div className="view-more-section text-center mt-2">
                  <Button
                    variant="outline-success"
                    className="view-more-btn"
                    onClick={() => toggleExpand(category)}
                  >
                    {isExpanded ? "Thu gọn" : "Xem thêm"}
                  </Button>
                </div>
              )}
            </div>
          )
        })}
      </Container>
    </div>
  )
}

export default CategorySection
