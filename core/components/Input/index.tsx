import { CSSProperties, InputHTMLAttributes, ReactNode } from "react";
import styles from "./Input.module.scss";

export type InputProps = {
  label?: string;
  variant?: "default" | "outlined" | "filled";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  error?: string;
  style?: CSSProperties;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  label,
  variant = "default",
  startIcon,
  endIcon,
  error,
  style,
  ...props
}) => {
  return (
    <div
      className={`${styles.inputWrapper} ${styles[variant]} ${error ? styles.error : ""}`}
    >
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.inputContainer}>
        {startIcon && (
          <span className={`${styles.icon} ${styles.startIcon}`}>
            {startIcon}
          </span>
        )}
        <input
          className={styles.input}
          style={{
            paddingInlineStart: startIcon ? "48px" : "16px",
            paddingInlineEnd: endIcon ? "48px" : "16px",
            ...style,
          }}
          {...props}
        />
        {endIcon && (
          <span className={`${styles.icon} ${styles.endIcon}`}>{endIcon}</span>
        )}
      </div>

      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default Input;
