import React from "react";
import * as styles from "./styles.module.scss";

export const TestComponent = () => {
  return (
    <div className={styles.root}>
      <span className={styles.text}>Привет, мир!</span>
    </div>
  );
};
