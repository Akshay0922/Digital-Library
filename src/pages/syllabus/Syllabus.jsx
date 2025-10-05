import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

import BookTop from "../../assets/books/bookTop.png";
import Ball from "../../assets/ball.png";

import '../../styles/common.css';

const mainData = [
  { course: "MCA", align: "right", semesters: 4, details: "CLICK HERE TO GET MCA SYLLABUS", color: "skyBlue" },
  { course: "MBA", align: "left", semesters: 4, details: "CLICK HERE TO GET MBA SYLLABUS", color: "pink" },
  { course: "BCA", align: "right", semesters: 6, details: "CLICK HERE TO GET BCA SYLLABUS", color: "skyBlue" },
  { course: "BBA", align: "left", semesters: 6, details: "CLICK HERE TO GET BBA SYLLABUS", color: "pink" },
];

export const Syllabus = () => {
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
  const [activeStates, setActiveStates] = useState(
    mainData.map(() => ({ active: false, reverse: false }))
  );

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !arrowStartRef.current ||
        !arrowEndRef.current ||
        !arrowLineRef.current ||
        !arrowContainerRef.current ||
        !arrowHeadRef.current
      ) return;

      const startY = arrowStartRef.current.getBoundingClientRect().top + window.scrollY;
      const endY = arrowEndRef.current.getBoundingClientRect().top + window.scrollY - 500;
      const totalHeight = endY - startY;

      const scrollY = window.scrollY;
      const progress = Math.min(1, Math.max(0, (scrollY - startY) / totalHeight));
      const lineHeight = progress * totalHeight;

      arrowContainerRef.current.style.top = `${startY + 267}px`;

      if (scrollY > startY + 50) {
        arrowLineRef.current.style.height = `${lineHeight}px`;
      } else {
        arrowLineRef.current.style.height = `0px`;
      }

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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (!isNaN(index)) {
            setActiveStates((prevStates) =>
              prevStates.map((state, i) => {
                if (i === index && !entry.isIntersecting && state.active) {
                  return { ...state, active: false, reverse: true };
                }
                return state;
              })
            );
          }
          entry.target.classList.toggle("visible", entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );

    const items = document.querySelectorAll(".timeline-item");
    items.forEach((item, index) => {
      item.dataset.index = index;
      observer.observe(item);
    });

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleCourseClick = (index) => {
    setActiveStates((prevStates) =>
      prevStates.map((state, i) =>
        i === index
          ? { active: !state.active, reverse: state.active }
          : state
      )
    );
  };

  const handleSemesterClick = (course, semIndex, e) => {
    e.stopPropagation();
    const courseLower = course.toLowerCase();
    const sem = `sem${semIndex + 1}`;
    navigate(`/syllabus/${courseLower}/${sem}`);
  };

  return (
    <div className="main-container">
      <section className="hero-section" ref={arrowStartRef}>
        <img className="ball" src={Ball} alt="Ball" />
        <img className="book-top" src={BookTop} alt="Top Book" />

        <h1 className={`hero-heading ${animate ? "animate-heading" : ""}`}>
          Your Guide to Every Semester
        </h1>
        <p className={`hero-subtext ${animate ? "animate-subtext" : ""}`}>
          Browse detailed MCA, MBA, BCA, and BBA syllabi — all in one place, semester-wise.
        </p>

        <div className="scroll-indicator">Scroll Down ↓</div>
      </section>

      <div className="arrow-container" ref={arrowContainerRef}>
        <div className="arrow-line" ref={arrowLineRef}></div>
        <div className="arrow-head" ref={arrowHeadRef}>▼</div>
        {mainData.map((_, index) => (
          <div
            key={index}
            ref={(el) => (dotRefs.current[index] = el)}
            style={{ top: `${20 + index * 25}%` }}
          ></div>
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

              <div
                className={`orbit-container ${item.semesters <= 4 ? "orbit-4" : "orbit-6"}
                ${item.align === 'left' ? "left-align" : ""}
                ${active ? "show" : ""} ${reverse ? "reverse" : ""}`}
              >
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