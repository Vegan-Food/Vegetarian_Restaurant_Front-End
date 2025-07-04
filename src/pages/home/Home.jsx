import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import Navigation from "./components/Navigation"
import Carousel from "../../components/Carousel"
import CategorySection from "./components/CategorySection"
import Footer from "../../components/Footer"
import Chatbot from "../../components/Chatbot"

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    if (token && user) {
      const { role } = JSON.parse(user)
      switch (role) {
        case "manager":
          navigate("/manager-dashboard")
          break
        case "staff":
          navigate("/staff-dashboard")
          break
        case "owner":
          navigate("/owner-dashboard")
          break
        default:
          navigate("/")
          break
      }
    }
  }, [navigate])

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
