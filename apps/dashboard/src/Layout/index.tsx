import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Header, Sidebar } from "@/components";

import "@andromeda/core/styles/themes.scss";
import styles from "./styles.module.scss";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  return (
    <>
      <header className={styles.header}>
        <Header />
      </header>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <Sidebar />
        </aside>
        <main className={styles.mainContent}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
