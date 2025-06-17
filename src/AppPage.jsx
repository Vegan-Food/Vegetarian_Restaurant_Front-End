import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import CartPage from './pages/cart/CartPage';
import PaymentPage from './pages/payment/PaymentPage';
import HomePage from './pages/home/HomePage';
import ProfilePage from './pages/profile/ProfilePage';
import ManagerDashboard from './pages/Manager/ManagerDashboard/ManagerDashboard';

import ManagerProfile from './pages/Manager/ManagerProfile/ManagerProfile';
import ManagerFoodList from './pages/Manager/FoodManagement/ManagerFoodList';
import ManagerOrderList from './pages/Manager/ManagerOrderList/ManagerOrderList';
import Login from './pages/auth/login';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.CLIEND_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/account/profile" element={<ProfilePage />} />

          {/* Add other routes as needed */}
          {/* Route Manager */}
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/manager-profile" element={<ManagerProfile />} />
          <Route path="/manager-food" element={<ManagerFoodList />} />
          <Route path="/manager-orders" element={<ManagerOrderList />} />
          {/* Add other routes as needed */}
          <Route path="/login" element={<Login />} /> {/* Fallback route */}

        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;