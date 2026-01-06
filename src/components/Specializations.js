import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './Specializations.css';

const Specializations = () => {
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
                targets: '.specialization-card',
                opacity: [0, 1],
                scale: [0.9, 1],
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

  const specializations = [
    {
      category: 'Pregnancy & Delivery',
      items: [
        'Normal Delivery Specialist',
        'Painless Delivery Expert',
        'High-Risk Pregnancy Care',
        'Safe & Natural Birth Advocate'
      ],
      icon: '🤱'
    },
    {
      category: 'Infertility & Hormonal',
      items: [
        'Infertility & PCOS Specialist',
        'Hormonal Balance Expert',
        'Reproductive Health Specialist'
      ],
      icon: '💗'
    },
    {
      category: 'Advanced Surgery',
      items: [
        'Advanced Laparoscopic Surgeon',
        'Minimally Invasive Gynecologic Surgery Expert'
      ],
      icon: '⚕️'
    }
  ];

  return (
    <section id="specializations" className="specializations section" ref={sectionRef}>
      <h2 className="section-title" ref={titleRef}>Areas of Expertise</h2>
      <p className="specializations-intro">
        Trusted by thousands of women for compassionate, personalized care
      </p>
      <div className="specializations-grid">
        {specializations.map((spec, index) => (
          <div key={index} className="specialization-card">
            <div className="specialization-icon">{spec.icon}</div>
            <h3 className="specialization-category">{spec.category}</h3>
            <ul className="specialization-list">
              {spec.items.map((item, itemIndex) => (
                <li key={itemIndex} className="specialization-item">
                  <span className="specialization-bullet"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Specializations;

