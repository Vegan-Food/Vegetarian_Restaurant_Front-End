import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <CartAlert />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/foodDetail/:productId" element={<FoodDetail />} />
          {/* Add other routes as needed */}
          <Route path="/account/profile" element={<ProfilePage />} />

          {/* Add other routes as needed */}
          {/* Route Manager */}
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/manager-profile" element={<ManagerProfile />} />
          <Route path="/manager-food" element={<ManagerFoodList />} />
          <Route path="/manager-orders" element={<ManagerOrderList />} />
          <Route path="/manager-edit-food/:id" element={<ManagerEditFoodPage />} />
          <Route path="/manager-add-food" element={<ManagerAddFoodPage />} />

        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;