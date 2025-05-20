import React from "react";

import styles from "./OrdersList.module.scss";

const OrdersList = ({
  children,
  columnHeader,
}: {
  children: React.ReactNode;
  columnHeader: string;
}) => {
  return (
    <div className={styles.gridItem}>
      <section className={styles.ordersListContainer}>
        <h1>{columnHeader}</h1>
        <section className={styles.ordersList}>{children}</section>
      </section>
    </div>
  );
};

export default OrdersList;
