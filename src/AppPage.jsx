import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import CartPage from './pages/cart/CartPage';
import PaymentPage from './pages/payment/PaymentPage';
import HomePage from './pages/home/HomePage';
import FoodDetail from './pages/foodDetail/FoodDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/product/:id" element={<FoodDetail />} />
        {/* Add other routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;