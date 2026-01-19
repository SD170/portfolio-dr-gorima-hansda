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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Using mailto: to open user's email client with pre-filled information
      const subject = encodeURIComponent(`Contact Form Submission from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      
      // Open email client with pre-filled information
      window.location.href = `mailto:dr.gorimahansda@gmail.com?subject=${subject}&body=${body}`;
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact section" ref={sectionRef}>
      <h2 className="section-title" ref={titleRef}>Get In Touch</h2>
      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-info-item">
            <div className="contact-icon">📍</div>
            <h3>Nursing Home Location</h3>
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
            </div>
          </div>
          <div className="contact-info-item">
            <div className="contact-icon">📍</div>
            <h3>Clinic Location</h3>
            <div className="location-details">
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
          <h3 className="contact-section-heading">Contact Info</h3>
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
            <a href="mailto:dr.gorimahansda@gmail.com" className="contact-link">
              dr.gorimahansda@gmail.com
            </a>
          </div>
        </div>
        <div className="contact-form-wrapper">
          <h3 className="contact-section-heading">Communicate with Us</h3>
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
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          {submitStatus === 'success' && (
            <p className="form-status form-status-success">
              ✓ Thank you! Your message has been sent. We'll get back to you soon.
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="form-status form-status-error">
              ✗ Something went wrong. Please try again or contact us directly.
            </p>
          )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

