import { useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

import BookTop from "../../assets/books/bookTop.png";
import Ball from "../../assets/ball.png";
import Chairman from "../../assets/aboutPeoples/chairman.png";
import GeneralSecretary from "../../assets/aboutPeoples/generalSecretary.png";
import Director from "../../assets/aboutPeoples/director.png";
import DeveloperImg from "../../assets/dev/devImage.jpg";

import "./about.css";
import "../../styles/common.css";

const mainData = [
  {
    type: "image-card",
    align: "right",
    image: Chairman,
    name: "Sh. Sushil Gupta",
    position: "Chairman",
  },
  {
    type: "image-card",
    align: "left",
    image: GeneralSecretary,
    name: "Dr. Ashwani Goel",
    position: "General Secretary",
  },
  {
    type: "image-card",
    align: "right",
    image: Director,
    name: "Dr. Narinder Rana",
    position: "Director, MAIMT",
  },
  {
    title: "MAIMT Foundation",
    content:
      "Founded in 1997 during India's Golden Jubilee of Independence, MAIMT is the result of Maharaja Agrasen's vision. Affiliated with Kurukshetra University and approved by AICTE, it aims to provide quality education in management and technology.",
    align: "left",
  },
  {
    title: "Our Mission",
    content:
      "To serve society by spreading awareness, uplifting living standards, and fulfilling educational responsibilities through professional excellence.",
    align: "right",
  },
  {
    title: "Our Roots",
    content:
      "Established as a charitable and non-profit institution, MAIMT's foundation lies in the vision of Maharaja Agrasen Sabha, originally providing education through Maharaja Agrasen College in commerce, arts, and computers.",
    align: "left",
  },
  {
    title: "Course Expansion",
    content:
      "MAIMT expanded its educational offerings by starting MBA and MCA programs. It continues to evolve and grow under dedicated leadership and governance.",
    align: "right",
  },
  {
    title: "Leadership & Vision",
    content:
      "The institute is led by Sh. Sushil Gupta (President), Sh. Praveen Goel (Vice President), Dr. Ashwini Goel (General Secretary), and Sh. Pawan Kumar Garg (Finance Secretary), all committed to continuous development of charitable institutions.",
    align: "left",
  },
];

export const About = () => {
  const arrowStartRef = useRef(null);
  const arrowEndRef = useRef(null);
  const arrowLineRef = useRef(null);
  const arrowHeadRef = useRef(null);
  const arrowContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [visible, setVisible] = useState(Array(mainData.length).fill(false));
  const [animate, setAnimate] = useState(false);
  const [developerCardVisible, setDeveloperCardVisible] = useState(false);
  const [developerExpanded, setDeveloperExpanded] = useState(false);

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

      const scrollY = window.scrollY;
      const startY = arrowStartRef.current.getBoundingClientRect().top + scrollY;
      let endY = arrowEndRef.current.getBoundingClientRect().top + scrollY - 350;

      const devCard = document.querySelector(".unique-developer-card");
      if (devCard) {
        const devTop = devCard.offsetTop;
        const arrowStopPoint = devTop + 140;
        if (scrollY + window.innerHeight >= devTop + 100) {
          endY = arrowStopPoint;
        }
      }

      const totalHeight = endY - startY;
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

      const lastCard = cardRefs.current[cardRefs.current.length - 1];
      if (lastCard && scrollY + window.innerHeight > lastCard.offsetTop + 100) {
        setDeveloperCardVisible(true);
      }
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
          About MAIMT
        </h1>
        <p className={`hero-subtext ${animate ? "animate-subtext" : ""}`}>
          Explore MAIMT's founding story, mission, leadership, and commitment to educational excellence.
        </p>
        <div className="scroll-indicator">Scroll Down ↓</div>
      </section>

      <div className="arrow-container" ref={arrowContainerRef}>
        <div className="arrow-line" ref={arrowLineRef}></div>
        <div className="arrow-head" ref={arrowHeadRef}>▼</div>
      </div>

      <section className="timeline-section">
        {mainData.map((item, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`about-card ${item.align} ${visible[index] ? "visible expanded" : ""}`}
          >
            {item.type === "image-card" ? (
              <div className="about-card-inner image-layout">
                {item.align === "left" ? (
                  <>
                    <div className="about-image-wrapper">
                      <img src={item.image} alt={item.name} className="about-image" />
                    </div>
                    <div className="about-text-wrapper">
                      <div className="about-title">{item.name}</div>
                      <div className="about-content">{item.position}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="about-text-wrapper">
                      <div className="about-title">{item.name}</div>
                      <div className="about-content">{item.position}</div>
                    </div>
                    <div className="about-image-wrapper">
                      <img src={item.image} alt={item.name} className="about-image" />
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="about-title">{item.title}</div>
                <div className="about-content">{item.content}</div>
              </>
            )}
          </div>
        ))}

        {developerCardVisible && (
          <div
            className={`about-card center unique-developer-card ${developerExpanded ? "expanded" : ""}`}
            onClick={() => setDeveloperExpanded(!developerExpanded)}
          >
            <div className="about-card-inner developer-inner">
              <div className="about-title">About the Developer</div>
              {developerExpanded ? (
                <div className="developer-details">
                  <img
                    src={DeveloperImg}
                    alt="Akshay G"
                    className="developer-photo"
                  />
                  <div className="developer-info">
                    <h3>Akshay G</h3>
                    <p>MCA – II<sup>nd</sup> Year Student</p>
                    <p>Frontend & Backend Developer | React & Node.js</p>
                    <p>Passionate about UI design, coding challenges & continuous learning.</p>
                  </div>
                </div>
              ) : (
                <p className="click-to-expand">Click to know more</p>
              )}
            </div>
          </div>
        )}

        <div ref={arrowEndRef} className="about-timeline-end-spacer"></div>
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
                className="circle-stroke"
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