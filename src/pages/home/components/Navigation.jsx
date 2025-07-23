"use client"

import { Navbar, Nav, Container } from "react-bootstrap"
import { useRef, useState } from "react" 
import "./Navigation.css"

const CATEGORY_ANCHORS = [
  { name: "Best Seller", href: "#best-seller", id: "best-seller" },
  { name: "Previously Ordered", href: "#previously-ordered", id: "previously-ordered" },
  { name: "Rice & Grains", href: "#rice-grains", id: "rice-grains" },
  { name: "Vegetables", href: "#vegetables", id: "vegetables" },
  { name: "Mushrooms", href: "#mushrooms", id: "mushrooms" },
  { name: "Beans & Tofu", href: "#beans-tofu", id: "beans-tofu" },
  { name: "Nuts & Roots", href: "#nuts-roots", id: "nuts-roots" },
  { name: "Noodles", href: "#noodles", id: "noodles" },
  { name: "Vegan Meat", href: "#vegan-meat-alternatives", id: "vegan-meat-alternatives" },
  { name: "Desserts", href: "#desserts", id: "desserts" },
]

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("best-seller")
  const isScrollingByClickRef = useRef(false)
  const scrollTimeout = useRef(null)

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
  
    isScrollingByClickRef.current = true;
    setActiveSection(id);
  
    const offset = 150 + 50 + 10;
    const targetTop = el.getBoundingClientRect().top + window.scrollY;
    const finalScroll = targetTop - offset + 30;
  
    window.scrollTo({
      top: finalScroll,
      behavior: 'smooth'
    });
  
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
  
    scrollTimeout.current = setTimeout(() => {
      isScrollingByClickRef.current = false;
    }, 800);
  };
  

  return (
    <div className="navigation-wrapper">
      <Container>
        <Navbar expand="lg" className="category-navbar">
          <Navbar.Toggle aria-controls="category-navbar-nav" />
          <Navbar.Collapse id="category-navbar-nav">
            <Nav className="w-100 justify-content-center align-items-center">
              {CATEGORY_ANCHORS.map((item) => (
                <Nav.Link
                  key={item.id}
                  href={item.href}
                  className={`category-nav-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.id)}
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
