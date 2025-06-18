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
import ManagerEditFoodPage from './pages/Manager/FoodManagement/ManagerEditFoodPage';
import ManagerAddFoodPage from './pages/Manager/FoodManagement/ManagerAddFoodPage';

function App() {
  return (
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
        <Route path="/manager-edit-food/:id" element={<ManagerEditFoodPage />} />
        <Route path ="/manager-add-food" element={<ManagerAddFoodPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;