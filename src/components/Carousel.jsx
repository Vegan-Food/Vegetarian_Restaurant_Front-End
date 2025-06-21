"use client"

import { useState } from "react"
import { Carousel } from "react-bootstrap"
import { ChevronLeft, ChevronRight, Star, Clock, Truck } from "lucide-react"
import "./Carousel.css"

const Carousels = () => {
  const [index, setIndex] = useState(0)

  const bannerSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      title: "Ẩm Thực Chay Tươi Ngon",
      subtitle: "Khám phá thế giới ẩm thực thuần chay với nguyên liệu organic tươi sạch",
      features: ["100% Organic", "Không chất bảo quản", "Giao hàng nhanh"],
      buttonText: "Khám phá ngay",
      link: "#menu",
      badge: "Mới"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Combo Gia Đình Siêu Tiết Kiệm",
      subtitle: "Thực đơn đa dạng cho cả gia đình - Giảm 25% cho combo từ 4 người",
      features: ["Giảm 25%", "Đa dạng món", "Phù hợp gia đình"],
      buttonText: "Xem combo",
      link: "#combo-family",
      badge: "Hot"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2081&q=80",
      title: "Món Chay Cao Cấp",
      subtitle: "Trải nghiệm ẩm thực chay đẳng cấp với các món được chế biến tinh tế",
      features: ["Cao cấp", "Tinh tế", "Độc đáo"],
      buttonText: "Thưởng thức",
      link: "#premium",
      badge: "Premium"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      title: "Giao Hàng Miễn Phí 24/7",
      subtitle: "Đặt hàng online - Giao hàng trong 30 phút - Miễn phí ship cho đơn từ 200K",
      features: ["Giao nhanh 30p", "Miễn phí ship", "24/7"],
      buttonText: "Đặt hàng ngay",
      link: "#delivery",
      badge: "Free Ship"
    },
  ]

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }

  return (
    <div className="hero-banner">
      <Carousel 
        activeIndex={index} 
        onSelect={handleSelect} 
        interval={5000} 
        fade 
        controls={false} 
        indicators={false}
        className="modern-carousel"
      >
        {bannerSlides.map((slide) => (
          <Carousel.Item key={slide.id}>
            <div className="banner-slide">
              <img className="d-block w-100 banner-image" src={slide.image} alt={slide.title} />
              <div className="banner-overlay">
                <div className="banner-content">
                  {/* Badge */}
                  <div className="banner-badge">
                    <span>{slide.badge}</span>
                  </div>
                  
                  {/* Title */}
                  <h2 className="banner-title">{slide.title}</h2>
                  
                  {/* Subtitle */}
                  <p className="banner-subtitle">{slide.subtitle}</p>
                  
                  {/* Features */}
                  <div className="banner-features">
                    {slide.features.map((feature, idx) => (
                      <div key={idx} className="feature-item">
                        <Star size={16} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <div className="banner-actions">
                    <a href={slide.link} className="banner-btn primary">
                      {slide.buttonText}
                    </a>
                    <a href="#menu" className="banner-btn secondary">
                      Xem thực đơn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      
      {/* Custom Navigation */}
      <div className="carousel-navigation">
        <button 
          className="nav-btn prev-btn" 
          onClick={() => setIndex(index === 0 ? bannerSlides.length - 1 : index - 1)}
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="carousel-indicators-custom">
          {bannerSlides.map((_, idx) => (
            <button
              key={idx}
              className={`indicator ${idx === index ? 'active' : ''}`}
              onClick={() => setIndex(idx)}
            />
          ))}
        </div>
        
        <button 
          className="nav-btn next-btn" 
          onClick={() => setIndex(index === bannerSlides.length - 1 ? 0 : index + 1)}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}

export default Carousels;
