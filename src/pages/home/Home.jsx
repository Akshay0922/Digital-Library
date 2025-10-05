import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { FaArrowUp } from "react-icons/fa";

import HomeImage from '../../assets/homeImage.png';
import HomeCircleImage from '../../assets/homeCircleImage.png';
import Ball from "../../assets/ball.png";

import mcaIcon from '../../assets/eContent/mca.png';
import mbaIcon from '../../assets/eContent/mba.png';
import bbaIcon from '../../assets/eContent/bba.png';
import bcaIcon from '../../assets/eContent/bca.png';

import "./home.css";
import '../../styles/common.css';

const testimonials = [
  {
    quote: "A well-organized digital resource hub is the foundation of modern learning.",
    author: "– Dr. Narinder Rana, Director, MAIMT",
    bg: "#f0f4ff"
  },
  {
    quote: "The digital library has made study materials incredibly accessible.",
    author: "– Mrs. Annu Kamboj, Assistant Professor",
    bg: "#eaffecff"
  },
  {
    quote: "Quick access to syllabus and papers has helped students prepare smarter.",
    author: "– Dr. Meenakshi Gupta, HOD MCA",
    bg: "#eef9faff"
  }
];

export const Home = () => {
  const imageRef = useRef(null);
  const heroRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);



  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(1, scrollY / totalHeight);
      setScrollProgress(progress * 100);
      setShowTopBtn(scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  useEffect(() => {
    if (imageRef.current) {
      setTimeout(() => imageRef.current.classList.add("animate"), 100);
    }
    if (heroRef.current) {
      setTimeout(() => heroRef.current.classList.add("animate"), 200);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-wrapper">
      <img className="home-ball" src={Ball} alt="Ball" />

      <div className="home-top-part">
        <img ref={imageRef} className="home-image" src={HomeImage} alt='Home Image' />
        <section ref={heroRef} className="home-hero">
          <h1>Welcome to</h1>
          <h2>MAIMT Digital Library</h2>
          <p>Your academic resources, just one click away.</p>
          <div className="hero-buttons">
            <Link to="/syllabus">📚 Syllabus</Link>
            <Link to="/paper">📄 Previous Year Papers</Link>
          </div>
        </section>
      </div>

      <section className="home-quick-links">
        <img className="home-circle-image" src={HomeCircleImage} alt="Home Circle" />
        <Link to="/about" className="quick-card">🏫 About MAIMT</Link>
        <Link to="/rules" className="quick-card">📑 Rules & Regulations</Link>
        <Link to="/econtent" className="quick-card">📱 E Content</Link>
        <Link to="/syllabus" className="quick-card">📚 Syllabus</Link>
        <Link to="/paper" className="quick-card">📄 Previous Papers</Link>
        <Link to="/contactus" className="quick-card">💌 Contact Us</Link>
      </section>

      <section className="home-departments">
        <h3>Our Departments</h3>
        <div className="home-dept-grid">
          <Link to="/departments/mca" className="dept-card">
            <div className="dept-card-image-wrapper">
              <div className="dept-card-image-inner">
                <img src={mcaIcon} alt="MCA" />
              </div>
            </div>
            <span>MCA</span>
            <div className="full-form">Master of Computer Applications</div>
          </Link>

          <Link to="/departments/mba" className="dept-card">
            <div className="dept-card-image-wrapper">
              <div className="dept-card-image-inner">
                <img src={mbaIcon} alt="MBA" />
              </div>
            </div>
            <span>MBA</span>
            <div className="full-form">Master of Business Administration</div>
          </Link>

          <Link to="/departments/bba" className="dept-card">
            <div className="dept-card-image-wrapper">
              <div className="dept-card-image-inner">
                <img src={bbaIcon} alt="BBA" />
              </div>
            </div>
            <span>BBA</span>
            <div className="full-form">Bachelor of Business Administration</div>
          </Link>

          <Link to="/departments/bca" className="dept-card">
            <div className="dept-card-image-wrapper">
              <div className="dept-card-image-inner">
                <img src={bcaIcon} alt="BCA" />
              </div>
            </div>
            <span>BCA</span>
            <div className="full-form">Bachelor of Computer Applications</div>
          </Link>
        </div>
      </section>

      <section className="home-testimonials-container">
        <div
          className="home-testimonials"
          style={{
            background: testimonials[currentIndex].bg,
            transition: "background 0.6s ease",
          }}
        >
          <div
            key={currentIndex}
            className="testimonial-slide fade-in"
          >
            <blockquote>
              “{testimonials[currentIndex].quote}”
              <br />
              <span>{testimonials[currentIndex].author}</span>
            </blockquote>
          </div>
        </div>
      </section>


      {showTopBtn && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          <div className="scroll-to-top-inner">
            <svg className="wave-svg" viewBox="0 0 60 60">
              <defs>
                <clipPath id="waveClip">
                  <circle cx="30" cy="30" r="28" />
                </clipPath>
              </defs>
              <g clipPath="url(#waveClip)">
                <rect
                  className="wave-fill"
                  y={`${100 - scrollProgress}%`}
                  width="60"
                  height="100%"
                />
              </g>
              <circle cx="30" cy="30" r="28" stroke="#03045e" strokeWidth="3" fill="none" />
            </svg>
            <FaArrowUp
              className="top-icon"
              style={{ color: scrollProgress > 45 ? "white" : "#03045e" }}
            />
          </div>
        </div>
      )}

    </div>
  );
};