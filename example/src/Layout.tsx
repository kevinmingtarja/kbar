import * as React from "react";
import styles from "./Layout.module.scss";
import Logo from "./Logo";

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Hypermode ⌘K</h1>
      </div>
      {props.children}
    </div>
  );
}
