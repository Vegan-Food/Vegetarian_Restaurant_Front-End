import ProductDetails from "./components/ProductDetails"
import SimilarProducts from "./components/SimilarProducts"
import CustomerReviews from "./components/CustomerReviews"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

const FoodDetail = () => {
  return (
    <div className="food-detail-page">
      <Header />
      <ProductDetails />
      <SimilarProducts />
      <CustomerReviews />
      <Footer />
    </div>
  )
}

export default FoodDetail;
