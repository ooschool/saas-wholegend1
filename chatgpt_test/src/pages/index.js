import React from "react";
import Chat from "./components/Chat/Chat";
import ImageGenerate from "./components/ImageGenerate/ImageGenerate";
import Navbar from "./components/Navbar/Navbar";
// import Chat from "./components/Chat";
import styles from "./index.module.css";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["ImageGenerate", "Chat"],
      webComponent: "ImageGenerate",
    };
  }
  webChange = (webComponent) => {
    console.log(webComponent);
    this.setState({ webComponent: webComponent });
  };
  render() {
    const { data, webComponent } = this.state;
    return (
      <div className={styles.app}>
        <Navbar webComponent={webComponent} webChange={this.webChange} />
        {webComponent === "ImageGenerate" ? (
          <ImageGenerate />
        ) : webComponent === "Chat" ? (
          <Chat />
        ) : (
          <div className="content">789</div>
        )}
      </div>
    );
  }
}
