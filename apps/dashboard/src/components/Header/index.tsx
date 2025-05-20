import styles from "./styles.module.scss";
import { Logout } from "@/components";
import LocaleButton from "../LocaleButton";
import DineoonLogo from "./Dine-oon.png";

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <div
        dir="ltr"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <img className={styles.logo} src={DineoonLogo} alt="Dine-oon" />
        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "1.25rem",
            margin: 0,
          }}
        >
          dashboard
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <LocaleButton />
        <Logout />
      </div>
    </div>
  );
}
