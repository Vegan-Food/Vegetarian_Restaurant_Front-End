"use client"
import { useState } from "react"
import "./FeaturedProducts.css"
import meal_data from "../../../data/pizza_data.json"

export default function FeaturedProducts() {
  const [cart, setCart] = useState([])

  const addToCart = (meal) => {
    setCart([...cart, meal])
    alert(`Đã thêm ${meal.name} vào giỏ hàng!`)
  }

  return (
    <section className="featured-products">
      <div className="products-container">
        <h2>Sản phẩm nổi bật</h2>
        <p>Những món ăn chay được yêu thích nhất</p>

        <div className="products-grid">
          {meal_data.map((meal) => (
            <div key={meal.id} className="product-card">
              <div className="product-image">
                <img src={meal.imageUrl || "/placeholder.svg"} alt={meal.name} />
                <div className="product-overlay">
                  <button className="quick-view-btn" onClick={() => addToCart(meal)}>
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
              <div className="product-info">
                <h3>{meal.name}</h3>
                <p>{meal.description}</p>
                <div className="product-footer">
                  <span className="price">{meal.price.toLocaleString()}₫</span>
                  <button className="add-to-cart-btn" onClick={() => addToCart(meal)}>
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