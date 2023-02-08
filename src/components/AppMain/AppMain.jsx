import React from "react";
import styles from "./AppMain.module.css";

class AppMain extends React.Component {
  render() {
    return <main className={`${styles.AppMain} container`}>{this.props.children}</main>;
  }
}

export default AppMain;
