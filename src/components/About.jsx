import "./About.css";
import Header from "./Header";

export default function About() {
  return (
    <section className="about">
      <Header />
      <div className="about-container">
        <div className="about-content">
          <h2>About VeganFood</h2>
          <p>
            We believe that vegan food is not only healthy but also environmentally friendly.
            With over 5 years of experience, VeganFood is committed to bringing you delicious,
            nutritious, and diverse plant-based meals.
          </p>

          <div className="features">
            {/* 1. Online Ordering */}
            <div className="feature">
              <a href="/" className="feature-icon">🛒</a>
              <div>
                <h3>Convenient Online Ordering</h3>
                <p>
                  With our smart online ordering platform, you can easily choose from a diverse
                  menu within minutes. The user-friendly interface and detailed support help you
                  order quickly and accurately.
                </p>
                <p>
                  Special promotional programs are updated weekly, exclusively for online orders.
                </p>
              </div>
            </div>

            {/* 2. Home Delivery */}
            <div className="feature">
              <a href="/" className="feature-icon">🚚</a>
              <div>
                <h3>Safe Home Delivery</h3>
                <p>
                  Our professional delivery team ensures your meals arrive hot, clean, and on time.
                  Fast delivery in just 30 minutes within the city.
                </p>
                <p>
                  Supports cashless payment and real-time order tracking.
                </p>
              </div>
            </div>

            {/* 3. Catering Services */}
            <div className="feature">
              <a href="/" className="feature-icon">🎉</a>
              <div>
                <h3>Vegan Catering Service</h3>
                <p>
                  We provide vegan catering for events, weddings, birthdays, or gatherings.
                  Custom menus designed based on your preferences and dietary needs.
                </p>
                <p>
                  We also offer decoration, staff service, and professional event consultation.
                </p>
              </div>
            </div>

            {/* 4. Privacy Policy */}
            <div className="feature">
              <a href="/" className="feature-icon">🔒</a>
              <div>
                <h3>Privacy Policy</h3>
                <p>
                  VeganFood is committed to protecting all customer personal information.
                  All data is encrypted and securely stored according to international standards.
                </p>
                <p>
                  We do not share your data with third parties without your consent.
                </p>
              </div>
            </div>

            {/* 5. Terms of Use */}
            <div className="feature">
              <a href="/" className="feature-icon">📄</a>
              <div>
                <h3>Terms of Use</h3>
                <p>
                  By using VeganFood's services, you agree to the terms regarding payment, delivery,
                  and content usage.
                </p>
                <p>
                  We encourage you to read carefully to understand your rights and responsibilities.
                </p>
              </div>
            </div>

            {/* 6. Contact & Support */}
            <div className="feature">
              <a href="/" className="feature-icon">☎️</a>
              <div>
                <h3>Contact & Support</h3>
                <p>
                  Our customer support team is available from 8AM to 10PM daily via hotline, email,
                  or fanpage.
                </p>
                <p>
                  All feedback is recorded and responded to within 24 hours to ensure the best
                  experience for you.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-image">
          <img src="/Logo.png" alt="About VeganFood" />
        </div>
      </div>
    </section>
  );
}
