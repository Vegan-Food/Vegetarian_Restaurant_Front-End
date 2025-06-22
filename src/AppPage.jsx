import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import CartAlert from './components/CartAlert';
import CartPage from './pages/cart/CartPage';
import PaymentPage from './pages/payment/PaymentPage';
import ProfilePage from './pages/profile/ProfilePage';
import ManagerDashboard from './pages/Manager/ManagerDashboard/ManagerDashboard';
import ManagerProfile from './pages/Manager/ManagerProfile/ManagerProfile';
import ManagerFoodList from './pages/Manager/FoodManagement/ManagerFoodList';
import ManagerOrderList from './pages/Manager/ManagerOrderList/ManagerOrderList';
import ManagerEditFoodPage from './pages/Manager/FoodManagement/ManagerEditFoodPage';
import ManagerAddFoodPage from './pages/Manager/FoodManagement/ManagerAddFoodPage';
import FoodDetail from './pages/foodDetail/FoodDetail';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <CartProvider>
        <BrowserRouter>
          <CartAlert />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/foodDetail/:productId" element={<FoodDetail />} />
            <Route path="/account/profile" element={<ProfilePage />} />
            {/* Route Manager */}
            <Route path="/manager-dashboard" element={<ManagerDashboard />} />
            <Route path="/manager-profile" element={<ManagerProfile />} />
            <Route path="/manager-food" element={<ManagerFoodList />} />
            <Route path="/manager-orders" element={<ManagerOrderList />} />
            <Route path="/manager-edit-food/:id" element={<ManagerEditFoodPage />} />
            <Route path="/manager-add-food" element={<ManagerAddFoodPage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </GoogleOAuthProvider>
  );
}

export default App;