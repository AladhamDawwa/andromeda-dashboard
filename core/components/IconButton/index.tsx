import Button from "../Button";
import styles from "./IconButton.module.scss";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

const index = ({ icon, ...rest }: IconButtonProps) => {
  return (
    <Button className={styles.iconButton} {...rest}>
      {icon}
    </Button>
  );
};

export default index;
