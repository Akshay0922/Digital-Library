import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import BookTop from "../../assets/books/bookTop.png";
import Ball from "../../assets/ball.png";
import HomeCircleImage from '../../assets/homeCircleImage.png';
import NoDataEmoji from '../../assets/noDataEmoji.png';

import '../../styles/commonLinks.css';
import './index.css';

export const SemesterPapers = () => {
  const { course, semester } = useParams();
  const navigate = useNavigate();

  const paperList = {
    mca: {
      sem1: {
        "Operating System": {
          2020: ["/dummy.pdf", "/dummy.pdf"],
          2021: ["/dummy.pdf"],
          2022: ["/dummy.pdf"],
          2023: ["/dummy.pdf"],
          2024: ["/dummy.pdf"],
          2025: ["/dummy.pdf"],
        },
        "Data structure": {
          2020: ["/dummy.pdf", "/dummy.pdf"],
          2021: ["/dummy.pdf"],
          2022: ["/dummy.pdf"],
          2023: ["/dummy.pdf"],
          2024: ["/dummy.pdf"],
          2025: ["/dummy.pdf"],
        },
        "Java": {
          2020: ["/dummy.pdf", "/dummy.pdf"],
          2021: ["/dummy.pdf"],
          2022: ["/dummy.pdf"],
          2023: ["/dummy.pdf"],
          2024: ["/dummy.pdf"],
          2025: ["/dummy.pdf"],
        },
        "Client Side Web Technology": {
          2020: ["/dummy.pdf", "/dummy.pdf"],
          2021: ["/dummy.pdf"],
          2022: ["/dummy.pdf"],
          2023: ["/dummy.pdf"],
          2024: ["/dummy.pdf"],
          2025: ["/dummy.pdf"],
        },
      },
      sem2: {
        "Database Management System": {
          2023: ["/dummy.pdf"]
        },
      },
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

  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  const selectedPapers = paperList[course]?.[semester];

  const [animate, setAnimate] = useState(false);
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [expandedYear, setExpandedYear] = useState({});
  const [filterYear, setFilterYear] = useState("all");
  const [searchText, setSearchText] = useState("");

  const handleSubjectClick = (subject) => {
    setExpandedSubject((prev) => (prev === subject ? null : subject));
    setExpandedYear({});
  };

  const handleYearClick = (subject, year) => {
    setExpandedYear((prev) => ({
      ...prev,
      [subject]: prev[subject] === year ? null : year,
    }));
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, []);

  const filteredSubjects = selectedPapers
    ? Object.entries(selectedPapers).filter(([subject]) =>
      subject.toLowerCase().includes(searchText.toLowerCase())
    )
    : [];

  return (
    <>
      <section className="hero-section">
        <img className="ball" src={Ball} alt="Ball" />
        <img className="book-top" src={BookTop} alt="Top Book" />
        <h1 className={`hero-heading ${animate ? "animate-heading" : ""}`}>
          Access Previous Year Papers
        </h1>
        <p className={`hero-subtext ${animate ? "animate-subtext" : ""}`}>
          Explore curated collections of past exam papers to boost your preparation, understand question trends, and score higher at MAIMT.
        </p>
        <div className="scroll-indicator">Scroll Down ↓</div>
      </section>

      <div className="content-container">
        <img className="content-circle-image" src={HomeCircleImage} alt="Home Circle" />

        <div className="content-heading">
          <h1>Previous Year Papers</h1>
          <h2>{course.toUpperCase()} {semesterMap[semester] || semester.toUpperCase()}</h2>
          <h4>(2020–2025)</h4>

          <div className="filter-section">
            <label>Filter by Year:</label>
            <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
              <option value="all">All Years</option>
              {years.map((yr) => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </select>
          </div>

          <div className="search-box">
            <label>Search Subject:</label>
            <input
              type="text"
              className="placeholder-text"
              placeholder="e.g. Operating System"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && (
              <span className="clear-btn" onClick={() => setSearchText("")}>❌</span>
            )}
          </div>

        </div>

        {selectedPapers ? (
          <div className="content-wrapper">
            {filteredSubjects.length === 0 ? (
              <div className="no-result-text">😕 No subjects found matching "<strong>{searchText}</strong>"</div>
            ) : (
              filteredSubjects.map(([subject, yearWiseData], index) => (
                <div
                  key={index}
                  onClick={() => handleSubjectClick(subject)}
                  className="content-box"
                >
                  <h4 className="content-name">
                    {searchText
                      ? subject.split(new RegExp(`(${searchText})`, 'gi')).map((part, i) =>
                        part.toLowerCase() === searchText.toLowerCase()
                          ? <mark key={i}>{part}</mark>
                          : part
                      )
                      : subject}
                  </h4>

                  {expandedSubject === subject && (
                    <div className="year-card-wrapper">
                      {years
                        .filter((year) => filterYear === "all" || filterYear === String(year))
                        .map((year) => (
                          <div
                            key={year}
                            className={`year-card ${expandedYear[subject] === year ? 'expanded' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleYearClick(subject, year);
                            }}
                          >
                            <span className="year-name">{year}</span>

                            {expandedYear[subject] === year && yearWiseData[year]?.length > 0 && (
                              <div className="content-buttons">
                                {yearWiseData[year].map((pdfUrl, idx) => (
                                  <div key={idx} className="paper-action-group">
                                    <span className="year-paper-heading">
                                      View/Download Paper {yearWiseData[year].length > 1 ? `${idx + 1}` : ""}
                                    </span>
                                    <div className="paper-buttons-row">
                                      <a
                                        href={pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="content-view-link"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        View PDF
                                      </a>
                                      <a
                                        href={pdfUrl}
                                        download
                                        className="content-download-link"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        Download
                                      </a>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="no-data-msg-container">
            <img src={NoDataEmoji} alt="No Data Emoji" className="no-data-emoji" />
            <span className="content-no-data-msg">No papers available for this semester.</span>
          </div>
        )}

        <button className="content-back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
      </div>
    </>
  );
};