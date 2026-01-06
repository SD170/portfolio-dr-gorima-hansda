import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1000
    });

    timeline
      .add({
        targets: titleRef.current,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1200,
        delay: 200
      })
      .add({
        targets: subtitleRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000
      }, '-=600')
      .add({
        targets: taglineRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800
      }, '-=400');

    // Floating animation for decorative elements
    anime({
      targets: '.hero-decoration',
      translateY: [0, -20],
      duration: 3000,
      easing: 'easeInOutSine',
      loop: true,
      direction: 'alternate'
    });
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-background">
        <div className="hero-decoration hero-decoration-1"></div>
        <div className="hero-decoration hero-decoration-2"></div>
        <div className="hero-decoration hero-decoration-3"></div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title" ref={titleRef}>
          Dr. Gorima Hansda
        </h1>
        <p className="hero-subtitle" ref={subtitleRef}>
          Renowned Gynecologist & Obstetrician
        </p>
        <p className="hero-tagline" ref={taglineRef}>
          Empowering Women Through Every Life Stage
        </p>
        <div className="hero-scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
