import React from "react";
import classNames from "classnames";
import styles from "./Tab.module.css";

interface TabProps {
  type: string;
  text: string;
  currentTab: string;
  onClick: (tab: string) => void;
}

const Tab: React.FC<TabProps> = (props) => {
  const { type, text, currentTab, onClick } = props;

  // type === currentTab ? "tab_type_current" : "tab-underline"
  // type === currentTab ? "text-white" : "text_color_inactive"
  return (
    <div
      className={classNames(styles.tab, {
        [styles.tab__active]: type === currentTab,
        [styles.tab__notactive]: type !== currentTab,
      })}
      onClick={() => onClick(type)}
    >
      <span className={classNames(styles.tab__text)}>{text}</span>
    </div>
  );
};

export default Tab;
