import React from "react";
import styles from "./styles.module.css";

export default function FancyCard(props) {
  const cardRef = React.cardRef

  return (
    <div className={styles.container}>
      <div className={styles.cardWrap}>
        <div className={styles.card}>
          <div
            className={styles.cardBg}
            style={{ background: `url(${props.imageUrl})` }}
          >
            <div className={styles.cardInfo}>
              <h1>{props.title}</h1>
              <p>{props.body}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
