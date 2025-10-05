import { useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

import BookTop from "../../assets/books/bookTop.png";
import Ball from "../../assets/ball.png";

import "./rules.css";
import '../../styles/common.css';

const mainData = [
  {
    title: "Rule 1",
    content: "Library Hours- Monday to Saturday: 9:00am to 5:00pm",
    align: "left",
  },
  {
    title: "Rule 2",
    content: "Using the cell phone in the library is strictly prohibited.",
    align: "right",
  },
  {
    title: "Rule 3",
    content:
      "Only enrolled students are allowed to enter in the college library on the strength of a valid Identity Card, which must be produced as and when it is demanded by the library staff or college teaching staff.",
    align: "left",
  },
  {
    title: "Rule 4",
    content: "Don't write underline or mark in the library books.",
    align: "right",
  },
  {
    title: "Rule 5",
    content:
      "Library book will be issued to the regular students for home lending only during the semester.",
    align: "left",
  },
  {
    title: "Rule 6",
    content: "Complete silence must be maintained in & near the library.",
    align: "right",
  },
  {
    title: "Rule 7",
    content: "All students must use library facility to enrich their academic excellence.",
    align: "left",
  },
  {
    title: "Rule 8",
    content: "Drinks and eatables are not allowed in Library.",
    align: "right",
  },
  {
    title: "Rule 9",
    content:
      "Sleeping, unnecessary discussions, loud voice, disturbance, foot on tables and chairs are not allowed in the library.",
    align: "left",
  },
];

export const RulesAndRegulation = () => {
  const arrowStartRef = useRef(null);
  const arrowEndRef = useRef(null);
  const arrowLineRef = useRef(null);
  const arrowHeadRef = useRef(null);
  const arrowContainerRef = useRef(null);
  const cardRefs = useRef([]);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [visible, setVisible] = useState(Array(mainData.length).fill(false));
  const [expanded] = useState(Array(mainData.length).fill(true));
  const [animate, setAnimate] = useState(false);

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
      )
        return;

      const startY = arrowStartRef.current.getBoundingClientRect().top + window.scrollY;
      const endY = arrowEndRef.current.getBoundingClientRect().top + window.scrollY - 350;
      const totalHeight = endY - startY;
      const scrollY = window.scrollY;
      const progress = Math.min(1, Math.max(0, (scrollY - startY) / totalHeight));
      const lineHeight = progress * totalHeight;

      arrowContainerRef.current.style.top = `${startY + 267}px`;
      arrowLineRef.current.style.height = scrollY > startY + 50 ? `${lineHeight}px` : `0px`;
      arrowHeadRef.current.style.top = `${lineHeight - 10}px`;

      const newVisible = mainData.map((_, i) => {
        const card = cardRefs.current[i];
        if (!card) return false;
        const cardTop = card.offsetTop;
        return lineHeight + startY > cardTop + 100;
      });

      setVisible(newVisible);
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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="main-container">
      <section className="hero-section" ref={arrowStartRef}>
        <img className="ball" src={Ball} alt="Ball" />
        <img className="book-top" src={BookTop} alt="Top Book" />
        <h1 className={`hero-heading ${animate ? "animate-heading" : ""}`}>
          Library Rules & Regulations
        </h1>
        <p className={`hero-subtext ${animate ? "animate-subtext" : ""}`}>
          Review rules before accessing the library.
        </p>
        <div className="scroll-indicator">Scroll Down ↓</div>
      </section>

      <div className="arrow-container" ref={arrowContainerRef}>
        <div className="arrow-line" ref={arrowLineRef}></div>
        <div className="arrow-head" ref={arrowHeadRef}>▼</div>
      </div>

      <section className="timeline-section">
        {mainData.map((rule, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`rules-card ${rule.align} ${visible[index] ? "visible" : ""} ${expanded[index] ? "expanded" : ""
              }`}
          >
            <div className="rules-title">{rule.title}</div>
            <div className="rules-content">{rule.content}</div>
          </div>
        ))}
        <div ref={arrowEndRef} className="rules-timeline-end-spacer"></div>
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
              <circle
                cx="30"
                cy="30"
                r="28"
                stroke="#03045e"
                strokeWidth="3"
                fill="none"
              />
            </svg>
            <FaArrowUp
              className="top-icon"
              style={{
                color: scrollProgress > 45 ? "white" : "#03045e",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};