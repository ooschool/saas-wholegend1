import React from "react";
import Chat from "./components/Chat";
import styles from "./index.module.css";
const Home = () => {
  return (
    <div className={styles.app}>
      <Chat />
    </div>
  );
};

export default Home;
