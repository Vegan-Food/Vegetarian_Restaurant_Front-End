import Header from "../../components/Header"
import Navigation from "./components/Navigation"
import Carousel from "../../components/Carousel"
import CategorySection from "./components/CategorySection"
import Footer from "../../components/Footer"
import Chatbot from "../../components/Chatbot"

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <Navigation />
      <Carousel />
      <CategorySection />
      <Footer />
      <Chatbot />
    </div>
  )
}

export default Home
