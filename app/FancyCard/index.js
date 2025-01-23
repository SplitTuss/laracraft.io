import styles from "./styles.module.css";

export default function FancyCard() {
  return (
    <div className={styles.container}>
      <div className={styles.cardWrap}>
        <div className={styles.card}>
          <div className={styles.cardBg}>
            <div className={styles.cardInfo}>
              <h1>blanket</h1>
              <p>this is a blanket</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

