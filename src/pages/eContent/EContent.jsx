import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

import BookTop from "../../assets/books/bookTop.png";
import Ball from "../../assets/ball.png";

import '../../styles/common.css';
import './eContent.css';

const mainData = [
  { course: "MCA", align: "right", semesters: 4, details: "CLICK HERE TO GET MCA ECONTENT", color: "skyBlue" },
  { course: "MBA", align: "left", semesters: 4, details: "CLICK HERE TO GET MBA ECONTENT", color: "pink" },
  { course: "BCA", align: "right", semesters: 6, details: "CLICK HERE TO GET BCA ECONTENT", color: "skyBlue" },
  { course: "BBA", align: "left", semesters: 6, details: "CLICK HERE TO GET BBA ECONTENT", color: "pink" },
];

export const EContent = () => {
  const arrowStartRef = useRef(null);
  const arrowEndRef = useRef(null);
  const arrowLineRef = useRef(null);
  const arrowHeadRef = useRef(null);
  const arrowContainerRef = useRef(null);
  const dotRefs = useRef([]);
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [activeStates, setActiveStates] = useState(
    mainData.map(() => ({ active: false, reverse: false }))
  );

  const handleSemesterClick = (course, semIndex, e) => {
    e.stopPropagation();
    const courseLower = course.toLowerCase();
    const sem = `sem${semIndex + 1}`;
    const timestamp = new Date().getTime();

    const newEntry = { course, sem, timestamp };
    const filtered = recentlyViewed.filter(item => !(item.course === course && item.sem === sem));
    const updated = [newEntry, ...filtered.slice(0, 4)];

    setRecentlyViewed(updated);
    localStorage.setItem("recentlyViewed", JSON.stringify(updated));

    navigate(`/eContent/${courseLower}/${sem}`);
  };

  useEffect(() => {
    const saved = localStorage.getItem("recentlyViewed");
    if (saved) setRecentlyViewed(JSON.parse(saved));
  }, []);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const viewedTime = new Date(timestamp);
    const diffMs = now - viewedTime;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  };

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!arrowStartRef.current || !arrowEndRef.current || !arrowLineRef.current || !arrowContainerRef.current || !arrowHeadRef.current) return;

      const startY = arrowStartRef.current.getBoundingClientRect().top + window.scrollY;
      const endY = arrowEndRef.current.getBoundingClientRect().top + window.scrollY - 500;
      const totalHeight = endY - startY;
      const scrollY = window.scrollY;
      const progress = Math.min(1, Math.max(0, (scrollY - startY) / totalHeight));
      const lineHeight = progress * totalHeight;

      arrowContainerRef.current.style.top = `${startY + 267}px`;
      arrowLineRef.current.style.height = scrollY > startY + 50 ? `${lineHeight}px` : `0px`;
      arrowHeadRef.current.style.top = `${lineHeight - 10}px`;

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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.dataset.index);
        if (!isNaN(index)) {
          setActiveStates((prevStates) =>
            prevStates.map((state, i) =>
              i === index && !entry.isIntersecting && state.active
                ? { ...state, active: false, reverse: true }
                : state
            )
          );
        }
        entry.target.classList.toggle("visible", entry.isIntersecting);
      });
    }, { threshold: 0.3 });

    const items = document.querySelectorAll(".timeline-item");
    items.forEach((item, index) => {
      item.dataset.index = index;
      observer.observe(item);
    });

    return () => items.forEach(item => observer.unobserve(item));
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleCourseClick = (index) => {
    setActiveStates((prevStates) =>
      prevStates.map((state, i) =>
        i === index ? { active: !state.active, reverse: state.active } : state
      )
    );
  };

  return (
    <div className="main-container">
      <section className="hero-section" ref={arrowStartRef}>
        {recentlyViewed.length > 0 && (
          <div className="recent-toggle-button" onClick={() => setShowRecent(prev => !prev)}>
            📑 Recently Viewed
          </div>
        )}
        <img className="ball" src={Ball} alt="Ball" />
        <img className="book-top" src={BookTop} alt="Top Book" />
        <h1 className={`hero-heading ${animate ? "animate-heading" : ""}`}>
          Explore Our E-Content Library
        </h1>
        <p className={`hero-subtext ${animate ? "animate-subtext" : ""}`}>
          Scroll to access curated digital content for MCA, MBA, BCA, and BBA courses.
        </p>
        <div className="scroll-indicator">Scroll Down ↓</div>
      </section>

      <div className="arrow-container" ref={arrowContainerRef}>
        <div className="arrow-line" ref={arrowLineRef}></div>
        <div className="arrow-head" ref={arrowHeadRef}>▼</div>
        {mainData.map((_, index) => (
          <div key={index} ref={(el) => (dotRefs.current[index] = el)} style={{ top: `${20 + index * 25}%` }}></div>
        ))}
      </div>

      <section className="timeline-section">
        {mainData.map((item, index) => {
          const { active, reverse } = activeStates[index];
          return (
            <div
              key={index}
              className={`timeline-item ${item.align}`}
              onClick={() => handleCourseClick(index)}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
            >
              {item.align === "left" && (
                <div className={`details-card ${item.color}`}>{item.details}</div>
              )}

              <div className="connect-line"></div>
              <div className="circle">{item.course}</div>

              {item.align === "right" && (
                <div className={`details-card ${item.color}`}>{item.details}</div>
              )}

              <div className={`orbit-container ${item.semesters <= 4 ? "orbit-4" : "orbit-6"} ${item.align === 'left' ? "left-align" : ""} ${active ? "show" : ""} ${reverse ? "reverse" : ""}`}>
                {[...Array(item.semesters)].map((_, semIndex) => (
                  <div
                    key={semIndex}
                    className="orbit-circle"
                    onClick={(e) => handleSemesterClick(item.course, semIndex, e)}
                  >
                    Sem {semIndex + 1}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <div ref={arrowEndRef} className="timeline-end-spacer"></div>
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
                <rect className="wave-fill" y={`${100 - scrollProgress}%`} width="60" height="100%" />
              </g>
              <circle cx="30" cy="30" r="28" stroke="#03045e" strokeWidth="3" fill="none" />
            </svg>
            <FaArrowUp className="top-icon" style={{ color: scrollProgress > 45 ? "white" : "#03045e" }} />
          </div>
        </div>
      )}

      {showRecent && recentlyViewed.length > 0 && (
        <div className="recent-popup">
          <div className="recent-popup-header">
            <h4>Recently Viewed</h4>
            <button className="review-clear-btn" onClick={() => setShowConfirmClear(true)}>Clear All</button>
          </div>
          <div className="recent-popup-items">
            {recentlyViewed.map((item, index) => (
              <div key={index} className="recent-popup-card">
                <div className="recent-content" onClick={() => navigate(`/eContent/${item.course.toLowerCase()}/${item.sem}`)}>
                  <strong>{item.course} - {item.sem.toUpperCase()}</strong>
                  <span className="recent-time">{formatTimeAgo(item.timestamp)}</span>
                </div>
                <button className="remove-one" onClick={() => {
                  const filtered = recentlyViewed.filter((_, i) => i !== index);
                  setRecentlyViewed(filtered);
                  localStorage.setItem("recentlyViewed", JSON.stringify(filtered));
                }}>❌</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showConfirmClear && (
        <div className="confirm-overlay">
          <div className="confirm-popup">
            <h3>⚠️ Are you sure?</h3>
            <p>This will remove all recently viewed items.</p>
            <div className="confirm-buttons">
              <button className="confirm-clear" onClick={() => {
                setRecentlyViewed([]);
                localStorage.removeItem("recentlyViewed");
                setShowConfirmClear(false);
                setShowRecent(false);
              }}>Yes, clear</button>
              <button className="confirm-cancel" onClick={() => setShowConfirmClear(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};