import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './TrustValues.css';

const TrustValues = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timeline = anime.timeline({
              easing: 'easeOutExpo',
              duration: 800
            });

            timeline
              .add({
                targets: titleRef.current,
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 1000
              })
              .add({
                targets: '.trust-value',
                opacity: [0, 1],
                scale: [0.95, 1],
                duration: 600,
                delay: anime.stagger(100)
              }, '-=500');

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

  const values = [
    {
      title: 'Most Trusted',
      description: 'Trusted by thousands of women for compassionate, expert care',
      icon: '⭐'
    },
    {
      title: 'Patient-First',
      description: 'Your wellbeing is our priority in every decision we make',
      icon: '💝'
    },
    {
      title: 'Compassionate Care',
      description: 'Gentle, ethical, and personalized approach to your health',
      icon: '🤲'
    },
    {
      title: 'Safe Motherhood',
      description: 'Dedicated advocate for safe, healthy pregnancies and deliveries',
      icon: '🛡️'
    }
  ];

  return (
    <section className="trust-values section" ref={sectionRef}>
      <h2 className="section-title" ref={titleRef}>Why Choose Us</h2>
      <p className="trust-intro">
        Because Every Woman Deserves Expert Care
      </p>
      <div className="trust-grid">
        {values.map((value, index) => (
          <div key={index} className="trust-value">
            <div className="trust-icon">{value.icon}</div>
            <h3 className="trust-title">{value.title}</h3>
            <p className="trust-description">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustValues;

