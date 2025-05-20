import React from "react";
import styles from "./Card.module.scss";
import { HTMLAttributes } from "react";
import clsx from "clsx";
type TProps = {
  className?: string;
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Card = ({ children, className }: TProps) => {
  return <div className={clsx(styles.card, className)}>{children}</div>;
};

export default Card;
