import React, { useEffect, useState } from "react"
import { Container, Navbar, Form, InputGroup, Button } from "react-bootstrap"
import { Search, User, Phone, ShoppingCart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import "./Header.css"
import logoImage from "../assets/image/Logo.png"

const Header = () => {
  const navigate = useNavigate()
  const { getCartCount } = useCart()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) setUser(JSON.parse(userData))
    else setUser(null)
  }, [])

  // Logout (if needed)
  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    navigate("/login")
  }

  const handleCartClick = () => {
    window.location.href = '/cart'
  }

  const handleLoginClick = () => {
    window.location.href = '/login'
  }

  return (
    <header className="main-header">
      <Navbar expand="lg" className="main-navbar">
        <Container>
          {/* Logo Section */}
          <Navbar.Brand href="/" className="brand-logo">
            <div className="logo-container">
              <img
                src={logoImage}
                alt="Logo"
                className="logo-image"
                style={{ height: "80px", width: "auto", maxWidth: "200px" }}
              />
            </div>
          </Navbar.Brand>

          {/* Hotline Section */}
          <div className="hotline-section">
            <div className="hotline-icon">
              <Phone size={20} />
            </div>
            <div className="hotline-content">
              <div className="hotline-number">1900-6066</div>
              <div className="hotline-text">Fast delivery 24/7</div>
            </div>
          </div>

          {/* Search Section */}
          <div className="search-section">
            <Form className="search-form">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search vegetarian dishes..."
                  className="search-input"
                />
                <Button variant="success" className="search-btn">
                  <Search size={18} />
                </Button>
              </InputGroup>
            </Form>
          </div>

          {/* User Actions */}
          <div className="user-actions">
            <Button variant="outline-success" className="cart-btn" onClick={handleCartClick}>
              <ShoppingCart size={18} className="me-2" />
              <span className="cart-text">Cart</span>
              <span className="cart-badge">{getCartCount()}</span>
            </Button>
            {!user ? (
              <Button variant="success" className="auth-btn" onClick={handleLoginClick}>
                <User size={16} className="me-2" />
                <span className="auth-text">Login</span>
              </Button>
            ) : (
              <div className="d-inline-flex align-items-center ms-2">
                <img
                  src={user.picture || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt="avatar"
                  style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", marginRight: 8, cursor: "pointer" }}
                  onClick={() => window.location.href = "/account/profile"}
                />
                <span
                  className="me-2 fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={() => window.location.href = "/account/profile"}
                >
                  {user.name || "User"}
                </span>
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            )}
          </div>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
