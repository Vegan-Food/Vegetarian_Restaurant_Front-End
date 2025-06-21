"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons"
import { useParams } from "react-router-dom"
import mealData from "../../../data/meal_data.json"
import { Container, Button, Row, Col } from "react-bootstrap"
import ProductCard from "../../../components/ProductCard"

const SimilarProducts = () => {
  const [products, setProducts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
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
            {visibleProducts.map((product) => (
              <Col key={product.product_id} lg={3} md={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>

          {/* Pagination Dots - Display only, no click functionality */}
          {products.length > itemsPerPage && (
            <div className="d-flex justify-content-center mt-5">
              {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, index) => (
                <div
                  key={index}
                  className={`rounded-circle mx-1 ${
                    Math.floor(currentIndex / itemsPerPage) === index 
                      ? "bg-success" 
                      : "bg-outline-success border border-success"
                  }`}
                  style={{ 
                    width: "12px", 
                    height: "12px", 
                    padding: "0",
                    cursor: "default"
                  }}
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