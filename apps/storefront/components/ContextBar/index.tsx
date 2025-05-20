import { ReactNode } from "react";
import originalStyles from "./styles.module.scss";
import clsx from "clsx";

const ContextBar = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx(originalStyles.container, className)}>{children}</div>
  );
};

export default ContextBar;
