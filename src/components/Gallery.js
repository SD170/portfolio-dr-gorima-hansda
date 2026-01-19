import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './Gallery.css';

const Gallery = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Replace with actual image paths once photos are added
  const images = [
    '/images/photo1.jpg',
    '/images/photo2.jpg',
    '/images/photo3.jpg',
    '/images/photo4.jpg',
    '/images/photo5.jpg',
    '/images/photo6.jpg',
  ];

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
              targets: '.gallery-item',
              opacity: [0, 1],
              scale: [0.9, 1],
              duration: 600,
              delay: anime.stagger(100),
              easing: 'easeOutExpo'
            });

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

  // Auto-rotate carousel
  useEffect(() => {
    if (isFullscreen) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, isFullscreen]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const openFullscreen = (index) => {
    setCurrentIndex(index);
    setIsFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    document.body.style.overflow = 'unset';
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        closeFullscreen();
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen, images.length]);

  return (
    <>
      <section id="gallery" className="gallery section" ref={sectionRef}>
        <h2 className="section-title" ref={titleRef}>Gallery</h2>
        <p className="gallery-intro">
          A glimpse into our practice and facilities
        </p>

        {/* Main Carousel */}
        <div className="gallery-carousel">
          <button 
            className="carousel-button carousel-button-prev" 
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            ‹
          </button>
          
          <div className="carousel-container">
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div key={index} className="carousel-slide">
                  <img 
                    src={image} 
                    alt={`Gallery ${index + 1}`}
                    className="carousel-image"
                    onClick={() => openFullscreen(index)}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <button 
            className="carousel-button carousel-button-next" 
            onClick={goToNext}
            aria-label="Next image"
          >
            ›
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Thumbnail Grid */}
        <div className="gallery-thumbnails">
          {images.map((image, index) => (
            <div
              key={index}
              className={`gallery-item ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            >
              <img 
                src={image} 
                alt={`Thumbnail ${index + 1}`}
                className="thumbnail-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="thumbnail-overlay">
                <span className="view-icon">👁️</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fullscreen-modal" onClick={closeFullscreen}>
          <button className="close-button" onClick={closeFullscreen} aria-label="Close">
            ×
          </button>
          <button 
            className="modal-nav-button modal-prev" 
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="Previous"
          >
            ‹
          </button>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <img 
                src={images[currentIndex]} 
                alt={`Fullscreen ${currentIndex + 1}`}
                className="modal-image"
              />
            <div className="modal-counter">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
          <button 
            className="modal-nav-button modal-next" 
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
};

export default Gallery;

