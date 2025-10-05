import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

import BookTop from "../../assets/books/bookTop.png";
import Ball from "../../assets/ball.png";

import "../../styles/commonLinks.css";
import "./eContentPage.css";

import JavaBook from '../../assets/eBooks/java.png';
import CProgramming from '../../assets/eBooks/cProgramming.png';
import Python from '../../assets/eBooks/python.png';

const courseData = {
    mca: {
        sem1: {
            videos: [
                {
                    title: "Intro to Programming",
                    url: "https://www.youtube.com/embed/TlB_eWDSMt4",
                    thumbnail: "https://img.youtube.com/vi/TlB_eWDSMt4/hqdefault.jpg",
                },
                {
                    title: "Data Structures",
                    url: "https://www.youtube.com/embed/8hly31xKli0",
                    thumbnail: "https://img.youtube.com/vi/8hly31xKli0/hqdefault.jpg",
                },
                {
                    title: "OOP in Java",
                    url: "https://www.youtube.com/embed/hlGoQC332VM",
                    thumbnail: "https://img.youtube.com/vi/hlGoQC332VM/hqdefault.jpg",
                },
                {
                    title: "DBMS Overview",
                    url: "https://www.youtube.com/embed/dl00fOOYLOM",
                    thumbnail: "https://img.youtube.com/vi/dl00fOOYLOM/hqdefault.jpg",
                },
                {
                    title: "Operating System Concepts",
                    url: "https://www.youtube.com/embed/26QPDBe-NB8",
                    thumbnail: "https://img.youtube.com/vi/26QPDBe-NB8/hqdefault.jpg",
                },
                {
                    title: "Computer Networks Intro",
                    url: "https://www.youtube.com/embed/qOVAbKKSH10",
                    thumbnail: "https://img.youtube.com/vi/qOVAbKKSH10/hqdefault.jpg",
                },
            ],
            ebooks: [
                { title: "C Programming Book", link: "/dummy.pdf", thumbnail: CProgramming },
                { title: "Java Basics", link: "/dummy.pdf", thumbnail: JavaBook },
                { title: "Python for Beginners", link: "/dummy.pdf", thumbnail: Python },
            ],
        },
    },
};

export const EContentPage = () => {
    const { course, semester } = useParams();
    const navigate = useNavigate();

    const sectionData = courseData[course]?.[semester] || {};
    const videos = sectionData.videos || [];
    const ebooks = sectionData.ebooks || [];

    const [activeVideo, setActiveVideo] = useState(null);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setTimeout(() => setAnimate(true), 100);
    }, []);

    return (
        <>
            <section className="hero-section">
                <img className="ball" src={Ball} alt="Ball" />
                <img className="book-top" src={BookTop} alt="Top Book" />
                <h1 className={`hero-heading ${animate ? "animate-heading" : ""}`}>
                    Access Your E-Content
                </h1>
                <p className={`hero-subtext ${animate ? "animate-subtext" : ""}`}>
                    Dive into curated digital resources to boost your learning, enhance your knowledge, and excel at MAIMT.
                </p>
                <div className="scroll-indicator">Scroll Down ↓</div>
            </section>

            <div className="econtent-page">
                {videos.length > 0 && (
                    <div className="videos-block">
                        <h2>🎞️ Youtube Videos</h2>
                        <div className="videos-horizontal-preview">
                            {!activeVideo ? (
                                videos.map((video, index) => (
                                    <div
                                        key={index}
                                        className="videos-preview-card"
                                        onClick={() => setActiveVideo(video)}
                                    >
                                        <img src={video.thumbnail} alt={video.title} />
                                        <span>{video.title}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="video-fullscreen-wrapper">
                                    <button className="video-back-button" onClick={() => setActiveVideo(null)}>
                                        <FaArrowLeft /> Back to Videos
                                    </button>
                                    <div className="video-fullscreen-layout">
                                        <div className="video-fullscreen-player">
                                            <iframe
                                                src={activeVideo.url}
                                                title={activeVideo.title}
                                                allowFullScreen
                                                className="video-fullscreen-frame"
                                            ></iframe>
                                            <h3 className="video-fullscreen-title">{activeVideo.title}</h3>
                                        </div>
                                        <div className="videos-sidebar">
                                            {videos.map((video, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`video-item ${activeVideo?.url === video.url ? "active" : ""}`}
                                                    onClick={() => setActiveVideo(video)}
                                                >
                                                    <img src={video.thumbnail} alt={video.title} />
                                                    <p>{video.title}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {ebooks.length > 0 && (
                    <div className="ebook-block">
                        <h2>📚 E-Books</h2>
                        <div className="ebook-resource-grid">
                            {ebooks.map((book, i) => (
                                <div key={i} className="ebook-resource-card">
                                    <img src={book.thumbnail} alt={book.title} />
                                    <span>{book.title}</span>
                                    <div className="ebook-buttons">
                                        <a href={book.link} target="_blank" rel="noreferrer" className="btn-view">👁️ View</a>
                                        <a href={book.link} download className="btn-download"> Download</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <button className="content-back-button" onClick={() => navigate(-1)}>
                    <FaArrowLeft />
                </button>
            </div>
        </>
    );
};