import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Header } from '../src/components/header/Header.jsx'
import { Navbar } from '../src/components/navbar/Navbar.jsx';
import { Footer } from '../src/components/footer/Footer.jsx';

import { Home } from './pages/home/Home.jsx';
import { About } from './pages/about/About.jsx';
import { Paper } from './pages/paper/Paper.jsx';
import { Syllabus } from './pages/syllabus/Syllabus.jsx';
import { RulesAndRegulation } from './pages/rulesAndRegulation/RulesAndRegulation.jsx';
import { Journals } from './pages/journals/Journals.jsx';
import { EContent } from './pages/eContent/EContent.jsx';
import { ContactUs } from './pages/contactUs/ContactUs.jsx';

import { SemesterPapers } from './components/semesterPapers/SemesterPapers.jsx';
import { SemesterSyllabus } from './components/semesterSyllabus/SemesterSyllabus.jsx';
import { EContentPage } from './components/eContentPage/EContentPage.jsx';


import {ScrollToTop} from "./components/scrollToTop/ScrollToTop.jsx";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        <Route path="/paper" element={<Paper />} />
        <Route path="/papers/:course/:semester" element={<SemesterPapers />} />

        <Route path="/syllabus" element={<Syllabus />} />
        <Route path="/syllabus/:course/:semester" element={<SemesterSyllabus />} />

        <Route path="/rules" element={<RulesAndRegulation />} />
        <Route path="/journals" element={<Journals />} />

        <Route path="/econtent" element={<EContent />} />
        <Route path="/econtent/:course/:semester" element={<EContentPage />} />

        <Route path="/contactus" element={<ContactUs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;