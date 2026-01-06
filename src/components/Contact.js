import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './Contact.css';

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: titleRef.current,
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 1000,
              easing: 'easeOutExpo'
            });

            anime({
              targets: '.contact-info-item, .contact-form',
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              delay: anime.stagger(100),
              easing: 'easeOutExpo'
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for your message. We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact section" ref={sectionRef}>
      <h2 className="section-title" ref={titleRef}>Get In Touch</h2>
      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-info-item">
            <div className="contact-icon">📍</div>
            <h3>Clinic Locations</h3>
            <div className="location-details">
              <div className="location-card">
                <p className="location-name"><strong>North Point Nursing-Home Pvt. Ltd.</strong></p>
                <p className="location-note">(Her own setup)</p>
                <a 
                  href="https://www.google.com/maps/place/North+Point+Nursing+Home+Pvt+Ltd/@22.6345105,88.4157368,17z/data=!3m1!4b1!4m6!3m5!1s0x39f89e135d977bf9:0x5e0bbade14e2e23f!8m2!3d22.6345105!4d88.4183117!16s%2Fg%2F11c5q8vx5t?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-link"
                >
                  <span className="map-link-icon">🗺️</span>
                  <span>View on Google Maps</span>
                </a>
              </div>
              <p className="location-divider">—</p>
              <div className="location-card">
                <p className="location-name"><strong>300 Laxmi Narayan Road</strong></p>
                <p className="location-address">Swamiji Children's Park</p>
                <a 
                  href="https://www.google.com/maps/place/Swamiji+Children's+Park/@22.6425815,88.4106336,17z/data=!3m1!4b1!4m6!3m5!1s0x39f89e71efe214b9:0x902992c8ea41ca3c!8m2!3d22.6425815!4d88.4132085!16s%2Fg%2F11c5q8vx5t?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-link"
                >
                  <span className="map-link-icon">🗺️</span>
                  <span>View on Google Maps</span>
                </a>
              </div>
            </div>
          </div>
          <div className="contact-info-item">
            <div className="contact-icon">📞</div>
            <h3>Phone</h3>
            <a href="tel:+917980968231" className="contact-link">
              +91 7980968231
            </a>
          </div>
          <div className="contact-info-item">
            <div className="contact-icon">✉️</div>
            <h3>Email</h3>
            <p>Email address will be added here</p>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="your.email@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows="5"
              placeholder="Your message..."
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

