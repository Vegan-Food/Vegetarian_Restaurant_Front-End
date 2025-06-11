"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Header.css"
import Logo from '../assets/image/Logo.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleCartClick = () => {
    navigate('/cart')
  }

  const handleHomeClick = () => {
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={handleHomeClick}>
          <img src={Logo} alt="Vegan Food" />
        </div>

        <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
          <a href="/" onClick={handleHomeClick}>Trang chủ</a>
          <a href="/menu">Thực đơn</a>
          <a href="#about">Giới thiệu</a>
          <a href="#contact">Liên hệ</a>
        </nav>

        <div className="header-actions">
          <button className="cart-btn" onClick={handleCartClick}>
            🛒 <span className="cart-count">0</span>
          </button>
          <button className="order-btn">Đặt hàng ngay</button>
        </div>

        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </div>
    </header>
  )
}
