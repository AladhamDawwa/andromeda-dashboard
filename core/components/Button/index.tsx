import { ButtonHTMLAttributes, ReactNode } from "react";

import clsx from "clsx";

import styles from "./Button.module.scss";
type TButtonProps = {
  className?: string;
  children: ReactNode;
  variant?: "primary" | "outline";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  variant = "primary",
  disabled = false,
  onClick,
  className,
  ...rest
}: TButtonProps) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], className)}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
