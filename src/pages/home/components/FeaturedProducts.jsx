"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./FeaturedProducts.css"
import meal_data from "../../../data/meal_data.json"

export default function FeaturedProducts() {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()

  const addToCart = (product) => {
    setCart([...cart, product])
    alert(`Đã thêm ${product.name} vào giỏ hàng!`)
  }

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`)
  }

  return (
    <section className="featured-products">
      <div className="products-container">
        <h2>Sản phẩm nổi bật</h2>
        <p>Những món ăn chay được yêu thích nhất</p>

        <div className="products-grid">
          {meal_data.products.map((product) => (
            <div key={product.product_id} className="product-card">
              <div className="product-image">
                <img src={product.image_url || "/placeholder.svg"} alt={product.name} />
                <div className="product-overlay">
                  <button className="quick-view-btn" onClick={() => handleViewDetails(product.product_id)}>
                    Xem chi tiết
                  </button>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-meta">
                  <span className="category">{product.category}</span>
                  <span className="orders">Đã bán: {product.total_order}</span>
                </div>
                <div className="product-footer">
                  <span className="price">{product.price.toLocaleString()}₫</span>
                  <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}