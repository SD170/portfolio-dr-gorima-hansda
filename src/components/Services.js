import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './Services.css';

const Services = () => {
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
                targets: '.service-item',
                opacity: [0, 1],
                translateX: [-30, 0],
                duration: 800,
                delay: anime.stagger(150)
              }, '-=500');

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  const services = [
    {
      title: 'Pregnancy Care',
      description: 'Comprehensive care from conception to delivery, including high-risk pregnancy management and safe, natural birth support.',
      icon: '🤱'
    },
    {
      title: 'Infertility & PCOS',
      description: 'Specialized treatment for infertility, PCOS, and hormonal imbalances with personalized reproductive health solutions.',
      icon: '💗'
    },
    {
      title: 'Advanced Laparoscopic Surgery',
      description: 'Minimally invasive surgical procedures for faster recovery and optimal outcomes.',
      icon: '⚕️'
    },
    {
      title: 'Women\'s Health Consultation',
      description: 'Personalized consultations addressing all aspects of women\'s health from adolescence to menopause.',
      icon: '👩‍⚕️'
    },
    {
      title: 'Painless Delivery',
      description: 'Expert guidance and support for comfortable, painless delivery experiences.',
      icon: '✨'
    },
    {
      title: 'Holistic Care',
      description: 'Compassionate, patient-first approach to lifelong women\'s healthcare.',
      icon: '🌿'
    }
  ];

  return (
    <section id="services" className="services section" ref={sectionRef}>
      <div className="services-background"></div>
      <h2 className="section-title" ref={titleRef}>Her Services</h2>
      <p className="services-intro">
        From Adolescence to Motherhood & Beyond
      </p>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-item">
            <div className="service-icon">{service.icon}</div>
            <div className="service-number">{String(index + 1).padStart(2, '0')}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
