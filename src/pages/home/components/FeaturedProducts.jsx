"use client"

import { Container, Row, Col } from "react-bootstrap"
import ProductCard from "../../../components/ProductCard"
import meal_data from "../../../data/meal_data.json"
import "./FeaturedProducts.css"

const FeaturedProducts = () => {
  // Lấy toàn bộ sản phẩm từ meal_data.json
  const products = meal_data.products
  console.log("Sản phẩm từ meal_data.json:", products)

  return (
    <section className="featured-products">
      <Container>
        <div className="section-header text-center mb-5">
          <h2 className="section-title">Thực Đơn Đặc Biệt</h2>
          <p className="section-subtitle">Những món ăn được yêu thích nhất</p>
        </div>
        <Row>
          {products.map((product) => (
            <Col lg={4} md={6} className="mb-4" key={product.product_id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default FeaturedProducts
