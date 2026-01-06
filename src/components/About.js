import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './About.css';

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const degreesRef = useRef(null);

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
                targets: introRef.current,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 800
              }, '-=500')
              .add({
                targets: '.degree-card',
                opacity: [0, 1],
                translateY: [50, 0],
                duration: 800,
                delay: anime.stagger(200)
              }, '-=400');

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

  return (
    <section id="about" className="about section" ref={sectionRef}>
      <h2 className="section-title" ref={titleRef}>About Dr. Gorima Hansda</h2>
      <p className="about-intro" ref={introRef}>
        With a commitment to compassionate, ethical, and personalized women's healthcare, 
        Dr. Gorima Hansda has dedicated her career to empowering women through every stage of life. 
        With 3 years of experience, her patient-first approach and expertise in advanced gynecological care have made her 
        a trusted partner in lifelong women's health.
      </p>
      <h3 className="qualifications-title">Education & Qualifications</h3>
      <div className="degrees-container" ref={degreesRef}>
        <div className="degree-card">
          <div className="degree-icon">
            <div className="icon-circle"></div>
          </div>
          <h3 className="degree-title">MBBS</h3>
          <p className="degree-institution">West Bengal University of Health Sciences</p>
          <p className="degree-year">College of Medicine and Sagore Dutta Hospital, Kolkata</p>
          <p className="degree-description">
            Bachelor of Medicine, Bachelor of Surgery
          </p>
        </div>

        <div className="degree-card">
          <div className="degree-icon">
            <div className="icon-circle"></div>
          </div>
          <h3 className="degree-title">MS (Obstetric and Gynecology)</h3>
          <p className="degree-institution">Ramakrishna Mission Seva Pratishthan</p>
          <p className="degree-year">Vivekananda Institute of Medical Sciences, Kolkata<br />(Sishu Mangal Hospital)</p>
          <p className="degree-description">
            Master of Surgery in Obstetrics and Gynecology
          </p>
        </div>

        <div className="degree-card">
          <div className="degree-icon">
            <div className="icon-circle"></div>
          </div>
          <h3 className="degree-title">FMAS, DMAS</h3>
          <p className="degree-institution">World Laparoscopy Hospital</p>
          <p className="degree-year">Delhi</p>
          <p className="degree-description">
            Fellowship in Minimal Access Surgery & Diploma in Minimal Access Surgery
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

