import { ReactNode } from "react";

import styles from "./Table.module.scss";
import { Card } from "@andromeda/core/components";

interface TableProps<T> {
  data: T[];
  renderHeader: () => ReactNode;
  renderRow: (row: T, index: number) => ReactNode;
}

const Table = <T,>({ data, renderHeader, renderRow }: TableProps<T>) => {
  return (
    <Card className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>{renderRow(row, index)}</tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default Table;
