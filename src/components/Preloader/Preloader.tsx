import styles from "./Preloader.module.css";

const Preloader = () => {
  return (
    <div className={styles.Preloader}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default Preloader;
