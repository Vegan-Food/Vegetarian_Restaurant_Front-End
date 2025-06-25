import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import CartAlert from './components/CartAlert';
import Chatbot from './components/Chatbot';
import CartPage from './pages/cart/CartPage';
import OrderPage from './pages/order/OrderFood';
import ProfilePage from './pages/profile/ProfilePage';
import ManagerDashboard from './pages/Manager/ManagerDashboard/ManagerDashboard';
import ManagerProfile from './pages/Manager/ManagerProfile/ManagerProfile';
import ManagerFoodList from './pages/Manager/FoodManagement/ManagerFoodList';
import ManagerOrderList from './pages/Manager/ManagerOrderList/ManagerOrderList';
import ManagerEditFoodPage from './pages/Manager/FoodManagement/ManagerEditFoodPage';
import ManagerAddFoodPage from './pages/Manager/FoodManagement/ManagerAddFoodPage';
import FoodDetail from './pages/foodDetail/FoodDetail';
import Home from './pages/home/Home';
import Login from './pages/auth/login';
import StaffDashboard from "./pages/Staff/StaffDashboard/StaffDashboard"
import StaffOrderList from "./pages/Staff/StaffOrderList/StaffOrderList"
import StaffFoodList from "./pages/Staff/StaffFoodList/StaffFoodList"
import StaffSupport from "./pages/Staff/StaffSupport/StaffSupport"
import StaffProfile from "./pages/Staff/StaffProfile/StaffProfile"
import OwnerDashboard from './pages/Owner/OwnerDashboard/OwnerDashboard';
import ManageCustomers from './pages/Owner/OwnerCustomer/ManageCustomers';
import ManageOrders from './pages/Owner/OwnerOrders/ManageOrders';
import ManageStaff from './pages/Owner/OwnerStaff/ManageStaff';
import { GoogleOAuthProvider } from '@react-oauth/google';
import OrderHistory from './pages/orderHistory/OrderHistory';
import OrderDetail from './pages/orderDetail/OrderDetail';
import Payment from './pages/payment/Payment';
import BillPage from './pages/bill/BillPage';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <CartProvider>
        <BrowserRouter>
          <CartAlert />
          <Chatbot />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/cart/order" element={<OrderPage />} />
            <Route path="/foodDetail/:productId" element={<FoodDetail />} />
            <Route path="/account/profile" element={<ProfilePage />} />
            <Route path="/account/orders" element={<OrderHistory />} />
            <Route path="/account/orders/:orderId" element={<OrderDetail />} />
            <Route path="/order" element={<OrderHistory />} />
            <Route path="/cart/order/payment" element={<Payment />} />
            <Route path="/billing" element={<BillPage />} />

            {/* Route Manager */}
            <Route path="/manager-dashboard" element={<ManagerDashboard />} />
            <Route path="/manager-profile" element={<ManagerProfile />} />
            <Route path="/manager-food" element={<ManagerFoodList />} />
            <Route path="/manager-orders" element={<ManagerOrderList />} />
            <Route path="/manager-edit-food/:id" element={<ManagerEditFoodPage />} />
            <Route path="/manager-add-food" element={<ManagerAddFoodPage />} />
            <Route path="/login" element={<Login />} />

            {/* Route Staff */}
            <Route path="/staff-dashboard" element={<StaffDashboard />} />
            <Route path="/staff-orders" element={<StaffOrderList />} />
            <Route path="/staff-food" element={<StaffFoodList />} />
            <Route path="/staff-support" element={<StaffSupport />} />
            <Route path="/staff-profile" element={<StaffProfile />} />

            {/* Route Owner */}
            <Route path="/owner-dashboard" element={<OwnerDashboard />} />
            <Route path="/owner-customermanagement" element={<ManageCustomers/>} />
            <Route path="/owner-ordersmanagement" element={<ManageOrders/>} />
            <Route path="/owner-staffmanagement" element={<ManageStaff/>} />


            
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
