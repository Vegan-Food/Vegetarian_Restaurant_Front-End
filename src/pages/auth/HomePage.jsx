"use client"
import { BrowserRouter, Navigate } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { appTheme } from "../../constant/color_constants"

// Import all pages
import CartPage from "../cart/CartPage"
import PaymentPage from "../payment/PaymentPage"
import ProfilePage from "../profile/ProfilePage"
import ManagerDashboard from "../Manager/ManagerDashboard/ManagerDashboard"
import ManagerProfile from "../Manager/ManagerProfile/ManagerProfile"
import ManagerFoodList from "../Manager/FoodManagement/ManagerFoodList"
import ManagerOrderList from "../Manager/ManagerOrderList/ManagerOrderList"
import ManagerEditFoodPage from "../Manager/FoodManagement/ManagerEditFoodPage"
import ManagerAddFoodPage from "../Manager/FoodManagement/ManagerAddFoodPage"
import Dashboard from "../dashboard/Dashboard"
import LoginPage from "./LoginPage"
import Logout from "./Logout"

// Staff pages
import OrderListPage from "../orders/OrderListPage"
import OrderDetailPage from "../orders/OrderDetailPage"
import SupportRequestListPage from "../support/SupportRequestListPage"
import SupportDetailPage from "../support/SupportDetailPage"
import FoodListPage from "../food/FoodListPage"
import FoodDetailPage from "../food/FoodDetailPage"
import StaffProfilePage from "../profile/ProfilePage"
import ProfileEditPage from "../profile/ProfileEditPage"
import Logo from "../../assets/image/Logo.png"

// Home Page Component
const HomePageContent = () => {
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: appTheme.background, minHeight: "100vh" }}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg" style={{ border: `2px solid ${appTheme.secondary}` }}>
              <Card.Header className="text-center py-4" style={{ backgroundColor: appTheme.primary, color: "white" }}>
                <img
                    src={Logo}
                    alt="Logo"
                    className="logo"
                    onError={(e) => {
                        e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23FCCD2A'/%3E%3Ctext x='20' y='25' textAnchor='middle' fill='%23347928' fontSize='16' fontWeight='bold'%3EL%3C/text%3E%3C/svg%3E"
                    }}
                />
                <h2 className="mb-0">Restaurant Management System</h2>
              </Card.Header>
              <Card.Body className="text-center py-5">
                <h4 style={{ color: appTheme.primary }}>Welcome to Our System</h4>
                <p className="text-muted mb-4">Choose your role to access the appropriate dashboard</p>

                <Row className="g-3">
                  <Col md={6}>
                    <Button
                      size="lg"
                      className="w-100"
                      onClick={() => navigate("/login")}
                      style={{
                        backgroundColor: appTheme.primary,
                        borderColor: appTheme.primary,
                        fontWeight: "bold",
                        padding: "12px",
                      }}
                    >
                      Staff Login
                    </Button>
                  </Col>
                  <Col md={6}>
                    <Button
                      size="lg"
                      className="w-100"
                      onClick={() => navigate("/manager-dashboard")}
                      style={{
                        backgroundColor: appTheme.accent,
                        borderColor: appTheme.accent,
                        color: appTheme.primary,
                        fontWeight: "bold",
                        padding: "12px",
                      }}
                    >
                      Manager Dashboard
                    </Button>
                  </Col>
                  <Col md={6}>
                    <Button
                      size="lg"
                      variant="outline-primary"
                      className="w-100"
                      onClick={() => navigate("/cart")}
                      style={{
                        borderColor: appTheme.secondary,
                        color: appTheme.primary,
                        fontWeight: "bold",
                        padding: "12px",
                      }}
                    >
                      Customer Portal
                    </Button>
                  </Col>
                  <Col md={6}>
                    <Button
                      size="lg"
                      variant="outline-secondary"
                      className="w-100"
                      onClick={() => navigate("/account/profile")}
                      style={{
                        fontWeight: "bold",
                        padding: "12px",
                      }}
                    >
                      My Account
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("staffToken")
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// Main App Component with Routing
const HomePage = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<HomePageContent />} />

        {/* Customer Routes */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/account/profile" element={<ProfilePage />} />

        {/* Manager Routes */}
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/manager-profile" element={<ManagerProfile />} />
        <Route path="/manager-food" element={<ManagerFoodList />} />
        <Route path="/manager-orders" element={<ManagerOrderList />} />
        <Route path="/manager-edit-food/:id" element={<ManagerEditFoodPage />} />
        <Route path="/manager-add-food" element={<ManagerAddFoodPage />} />

        {/* Staff Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />

        {/* Staff Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Staff Order Routes */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:orderId"
          element={
            <ProtectedRoute>
              <OrderDetailPage />
            </ProtectedRoute>
          }
        />

        {/* Staff Support Routes */}
        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <SupportRequestListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/support/:supportId"
          element={
            <ProtectedRoute>
              <SupportDetailPage />
            </ProtectedRoute>
          }
        />

        {/* Staff Food Routes */}
        <Route
          path="/food"
          element={
            <ProtectedRoute>
              <FoodListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/food/:foodId"
          element={
            <ProtectedRoute>
              <FoodDetailPage />
            </ProtectedRoute>
          }
        />

        {/* Staff Profile Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <StaffProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <ProfileEditPage />
            </ProtectedRoute>
          }
        />

        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default HomePage
