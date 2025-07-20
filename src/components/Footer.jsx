import "./Footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      {/* Decorative background elements */}
      <div className="footer-bg-decorations">
        <div className="footer-bg-circle-1"></div>
        <div className="footer-bg-circle-2"></div>
        <div className="footer-bg-circle-3"></div>
      </div>

      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <div>
              <h3 className="footer-brand-title">VeganFood</h3>
              <p className="footer-brand-description">Thực phẩm chay ngon & bổ dưỡng cho cuộc sống khỏe mạnh</p>
            </div>
          </div>

          {/* Menu Section */}
          <div className="footer-section">
            <h4 className="footer-section-title">Thực đơn</h4>
            <ul className="footer-section-list">
              <li className="footer-section-item">
                <a href="#" className="footer-section-link">
                  Món chính
                </a>
              </li>
              <li className="footer-section-item">
                <a href="#" className="footer-section-link">
                  Salad & Soup
                </a>
              </li>
              <li className="footer-section-item">
                <a href="#" className="footer-section-link">
                  Đồ uống
                </a>
              </li>
              <li className="footer-section-item">
                <a href="#" className="footer-section-link">
                  Tráng miệng
                </a>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="footer-section">
            <h4 className="footer-section-title">Dịch vụ</h4>
            <ul className="footer-section-list">
              <li className="footer-section-item">
                <a href="#" className="footer-section-link">
                  Đặt hàng online
                </a>
              </li>
              <li className="footer-section-item">
                <a href="#" className="footer-section-link">
                  Giao hàng tận nơi
                </a>
              </li>
              <li className="footer-section-item">
                <a href="#" className="footer-section-link">
                  Catering
                </a>
              </li>
              <li className="footer-section-item">
                <a href="#" className="footer-section-link">
                  Hỗ trợ khách hàng
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h4 className="footer-section-title">Liên hệ</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <span className="footer-contact-icon">📍</span>
                <span className="footer-contact-text">123 Đường ABC, Quận 1, TP.HCM</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">📞</span>
                <span className="footer-contact-text">(028) 1234 5678</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">✉️</span>
                <span className="footer-contact-text">info@veganfood.vn</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-bottom-copyright">&copy; 2024 VeganFood. Tất cả quyền được bảo lưu.</p>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">
                Chính sách bảo mật
              </a>
              <a href="#" className="footer-bottom-link">
                Điều khoản sử dụng
              </a>
              <a href="#" className="footer-bottom-link">
                Liên hệ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
