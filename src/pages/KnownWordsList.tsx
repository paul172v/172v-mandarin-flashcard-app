import React from "react";
import { useNavigate } from "react-router-dom";

import { HSK1 } from "../dev/mandarin-hsk1-list";
import styles from "./KnownWordsList.module.scss";

const KnownWordsList = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate("/");

  return (
    <div className={`container ${styles.container}`}>
      <h2 className="text-center mb-4">HSK1 Known Words List</h2>

      {/* Table Headings */}
      <div className={`${styles["word-item"]} ${styles["word-heading"]}`}>
        <span className={styles["word-id"]}>ID</span>
        <span className={styles["word-english"]}>English</span>
        <span className={styles["word-hanzi"]}>Hanzi</span>
        <span className={styles["word-pinyin"]}>Pinyin</span>
        <span className={styles["word-known"]}>Known</span>
      </div>

      {/* Word List */}
      {HSK1.map((item) => {
        return (
          <div key={item.id} className={styles["word-item"]}>
            <span className={styles["word-id"]}>{item.id}</span>
            <span className={styles["word-english"]}>{item.english}</span>
            <span className={styles["word-hanzi"]}>{item.hanzi}</span>
            <span className={styles["word-pinyin"]}>{item.pinyin}</span>
            <span
              className={`${styles["word-known"]} ${
                item.known ? "" : styles["false"]
              }`}
            >
              {item.known ? "true" : "false"}
            </span>
          </div>
        );
      })}

      {/* Back to Home Button */}
      <div className="text-center mt-4">
        <button className="btn btn-secondary btn-lg" onClick={goToHome}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default KnownWordsList;
