import React from "react";
import styles from "../../styles/about/portfolio.module.css";

const Portfolio = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>Portfolio</div>
        <div className={styles.pdfContainer}>
          <embed
            src="/resume.pdf"
            width="800px"
            height="600px"
            type="application/pdf"
          />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
