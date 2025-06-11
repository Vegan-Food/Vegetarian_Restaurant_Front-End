import Header from '../../components/Header';
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import Footer from "./components/Footer";

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Footer />
    </>
  );
}

export default Home;