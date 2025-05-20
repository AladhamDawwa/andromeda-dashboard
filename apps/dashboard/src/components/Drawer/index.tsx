import { Portal } from "@andromeda/core/components";
import styles from "./Drawer.module.scss";
import clsx from "clsx";

interface DrawerProps {
  children: React.ReactNode;
  width: number;
  visible: boolean;
  onClose?: () => void;
}

const Drawer = ({ children, visible = false, onClose, width }: DrawerProps) => {
  if (!visible) return null;
  return (
    <Portal>
      {/* Overlay */}
      <div className={styles.overlay} onClick={onClose}></div>

      {/* Slider Panel */}
      <div
        className={clsx(styles.drawer, {
          [styles.open]: visible,
        })}
        style={{
          right: visible ? 0 : `-${width + 20}px`,
          width: `${width}px`,
        }}
      >
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </Portal>
  );
};

export default Drawer;
