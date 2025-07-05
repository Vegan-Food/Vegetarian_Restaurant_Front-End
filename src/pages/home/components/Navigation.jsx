import { Navbar, Nav, Container } from "react-bootstrap"
import "./Navigation.css"

const CATEGORY_ANCHORS = [
  { name: "Rice & Grains", href: "#rice-grains", id: "rice-grains" },
  { name: "Vegetables", href: "#vegetables", id: "vegetables" },
  { name: "Mushrooms", href: "#mushrooms", id: "mushrooms" },
  { name: "Beans & Tofu", href: "#beans-tofu", id: "beans-tofu" },
  { name: "Nuts & Roots", href: "#nuts-roots", id: "nuts-roots" },
  { name: "Noodles", href: "#noodles", id: "noodles" },
  { name: "Vegan Meat Alternatives", href: "#vegan-meat-alternatives", id: "vegan-meat-alternatives" },
  { name: "Desserts", href: "#desserts", id: "desserts" },
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
