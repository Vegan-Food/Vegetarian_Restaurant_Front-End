import { Navbar, Nav, Container } from "react-bootstrap"
import "./Navigation.css"

const CATEGORY_ANCHORS = [
  { name: "Gạo & Ngũ cốc", href: "#gao-ngu-coc", id: "gao-ngu-coc" },
  { name: "Rau củ", href: "#rau-cu", id: "rau-cu" },
  { name: "Nấm", href: "#nam", id: "nam" },
  { name: "Đậu & Đậu hũ", href: "#dau-dauhu", id: "dau-dauhu" },
  { name: "Hạt & Củ", href: "#hat-cu", id: "hat-cu" },
  { name: "Mì & Bún", href: "#mi-bun", id: "mi-bun" },
  { name: "Món giả mặn", href: "#mon-gia-man", id: "mon-gia-man" },
  { name: "Tráng miệng", href: "#trang-mieng", id: "trang-mieng" },
]

const Navigation = () => {
  const handleNavClick = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="navigation-wrapper">
      <Container>
        <Navbar expand="lg" className="category-navbar">
          <Navbar.Toggle aria-controls="category-navbar-nav" />
          <Navbar.Collapse id="category-navbar-nav">
            <Nav className="w-100 justify-content-center align-items-center">
              {CATEGORY_ANCHORS.map((item, index) => (
                <Nav.Link
                  key={index}
                  href={item.href}
                  className="category-nav-item"
                  onClick={e => handleNavClick(e, item.id)}
                >
                  {item.name}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  )
}

export default Navigation
