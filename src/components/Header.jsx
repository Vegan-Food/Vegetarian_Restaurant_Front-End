"use client"
import { Navbar, Nav, Container, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { appTheme } from "../constant/color_constants"
import Logo from "../assets/image/Logo.png"

const Header = ({ title = "Staff Dashboard" }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear any authentication tokens/data
    localStorage.removeItem("staffToken")
    navigate("/")
  }

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: appTheme.primary,
        borderBottom: `3px solid ${appTheme.accent}`,
      }}
      variant="dark"
      sticky="top"
    >
      <Container fluid>
        <Navbar.Brand href="/dashboard" className="d-flex align-items-center">
          <img
            src={Logo}
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
            alt="Logo"
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23FCCD2A'/%3E%3Ctext x='20' y='25' textAnchor='middle' fill='%23347928' fontSize='16' fontWeight='bold'%3EL%3C/text%3E%3C/svg%3E"
            }}
          />
          <span style={{ color: appTheme.accent, fontWeight: "bold" }}>{title}</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header