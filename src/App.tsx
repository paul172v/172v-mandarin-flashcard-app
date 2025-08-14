import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import classes from "./App.module.scss";

import KnownWordsList from "./pages/KnownWordsList";
import SingleWordFlashCards from "./pages/SingleWordFlashCards";

function Home() {
  return (
    <>
      {/* Header Section */}
      <div className="container bg-light p-5">
        <h1 className="display-5">
          172v Study App for "Learn Mandarin Chinese with Paul Noble for
          Beginners - Complete Course"
        </h1>
      </div>

      {/* Options Section */}
      <div className="container bg-light mt-5 p-5">
        <h2 className="display-4">Options</h2>
        <div className={classes["u-col"]}>
          {/* Navigation Buttons */}
          <Link to="/hsk1-words-list" className="btn btn-primary mt-5">
            Words List
          </Link>
          <Link to="/hsk1-flashcards" className="btn btn-primary mt-3">
            Single Word Flashcards
          </Link>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className={classes.page}>
        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hsk1-words-list" element={<KnownWordsList />} />
          <Route path="/hsk1-flashcards" element={<SingleWordFlashCards />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
