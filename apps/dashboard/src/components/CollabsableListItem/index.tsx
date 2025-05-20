import { IconType } from "react-icons";
import styles from "./CollapsableListItem.module.scss";
export type CollapsableListItemProps = {
  label: string;
  icon: IconType;
  pathname: string;
  isActive?: boolean;
  onActivate?: () => void;
};

export const CollapsableListItem = (props: CollapsableListItemProps) => {
  const {
    label = "",
    icon,
    isActive = false,
    onActivate = () => {},
  } = props || {};
  const IconComponent = icon;
  return (
    <div
      // className={isActive ? styles.activeItem : styles.item}
      className={`${styles.item} ${isActive && styles.activeItem}`}
      onClick={onActivate}
    >
      <IconComponent className={styles.icon}></IconComponent>
      <p className={styles.labelText}>{label}</p>
    </div>
  );
};

export default CollapsableListItem;
