import React, { ReactNode, useRef } from "react";
import styles from "./Layout.module.scss";

type SubLayoutProps = { children: ReactNode; noRedirect?: boolean };

export default function SubLayout({ children, noRedirect }: SubLayoutProps) {

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.mainContainer} ref={ref}>
      <div className={styles.subContainer}>{children}</div>
    </div>
  );
}
