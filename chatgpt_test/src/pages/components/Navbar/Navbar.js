import React from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }
  render() {
    return (
      <div className={styles.section}>
        <div className={styles.logo}>
          <Image src="/openai.svg" width="50" height="50" />
        </div>
        <div className={styles.btnbg}>
          <Image
            src="/image.svg"
            width="50"
            height="50"
            onClick={() => this.props.webChange("ImageGenerate")}
          />
        </div>
        <div className={styles.btnbg}>
          <Image
            src="/chat-square-dots.svg"
            width="50"
            height="50"
            onClick={() => this.props.webChange("Chat")}
          />
        </div>
      </div>
    );
  }
}
