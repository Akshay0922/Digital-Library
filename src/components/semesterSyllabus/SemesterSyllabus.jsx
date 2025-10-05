import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";

import BookTop from "../../assets/books/bookTop.png";
import Ball from "../../assets/ball.png";
import HomeCircleImage from '../../assets/homeCircleImage.png';
import NoDataEmoji from '../../assets/noDataEmoji.png';

import '../../styles/commonLinks.css';
import './index.css';

export const SemesterSyllabus = () => {
  const { course, semester } = useParams();
  const navigate = useNavigate();

  const syllabusLinks = {
    mca: {
      sem1: "/dummy.pdf",
      sem2: "/dummy.pdf",
      sem3: "/dummy.pdf",
      sem4: "/dummy.pdf",
    },
    bca: {
      sem1: "/dummy.pdf",
      sem2: "/dummy.pdf",
      sem3: "/dummy.pdf",
      sem4: "/dummy.pdf",
      sem5: "/dummy.pdf",
      sem6: "/dummy.pdf",
    },
    mba: {
      sem1: "/dummy.pdf",
      sem2: "/dummy.pdf",
      sem3: "/dummy.pdf",
      sem4: "/dummy.pdf",
    },
    bba: {
      sem1: "/dummy.pdf",
      sem2: "/dummy.pdf",
      sem3: "/dummy.pdf",
      sem4: "/dummy.pdf",
      sem5: "/dummy.pdf",
      sem6: "/dummy.pdf",
    },
  };

  const semesterMap = {
    sem1: "SEM-I",
    sem2: "SEM-II",
    sem3: "SEM-III",
    sem4: "SEM-IV",
    sem5: "SEM-V",
    sem6: "SEM-VI",
  };

  const syllabusUrl = syllabusLinks?.[course]?.[semester];
  const [animate, setAnimate] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, []);

  return (
    <>
      <section className="hero-section">
        <img className="ball" src={Ball} alt="Ball" />
        <img className="book-top" src={BookTop} alt="Top Book" />

        <h1 className={`hero-heading ${animate ? "animate-heading" : ""}`}>
          Access Your Syllabus
        </h1>
        <p className={`hero-subtext ${animate ? "animate-subtext" : ""}`}>
          Explore comprehensive syllabi crafted to fuel your curiosity, sharpen your skills, and guide your success at MAIMT.
        </p>

        <div className="scroll-indicator">Scroll Down ↓</div>
      </section>

      <div className="content-container">
        <img className="content-circle-image" src={HomeCircleImage} alt="Home Circle Image" />
        <h2 className="content-heading">
          View & Download Your Syllabus
        </h2>
        {syllabusUrl ? (
          <div className="content-wrapper">
            <div className="content-box">
              <h2>{course.toUpperCase()} {semesterMap[semester] || semester.toUpperCase()}</h2>
              <div className="syllabus-content-buttons">
                <a href={syllabusUrl} target="_blank" rel="noopener noreferrer" className="syllabus-content-view-link">
                  View PDF
                </a>
                <a href={syllabusUrl} download className="syllabus-content-download-link">
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-data-msg-container">
            <img src={NoDataEmoji} alt="No Data Emoji" className="no-data-emoji" />
            <span className="content-no-data-msg">No syllabus found for this semester.</span>
          </div>
        )}

        <button className="content-back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
      </div>
    </>
  );
};
