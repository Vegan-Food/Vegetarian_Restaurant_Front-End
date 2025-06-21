import { Container, Navbar, Form, InputGroup, Button, Nav } from "react-bootstrap"
import { Search, User, Phone, ShoppingCart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import "./Header.css"
import logoImage from "../assets/image/Logo.png"

const Header = () => {
  const navigate = useNavigate()
  const { getCartCount } = useCart()

  const handleCartClick = () => {
    navigate('/cart')
  }

  const handleHomeClick = () => {
    navigate('/')
  }

  const handleProfileClick = () => {
    navigate('/account/profile')
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
              <div className="hotline-text">Giao hàng nhanh 24/7</div>
            </div>
          </div>

          {/* Search Section */}
          <div className="search-section">
            <Form className="search-form">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm món ăn chay..."
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
              <span className="cart-text">Giỏ hàng</span>
              <span className="cart-badge">{getCartCount()}</span>
            </Button>

            <Button variant="success" className="auth-btn">
              <User size={16} className="me-2" />
              <span className="auth-text">Đăng nhập</span>
            </Button>
          </div>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
