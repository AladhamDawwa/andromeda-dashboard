import { Table } from "@/components";

const OrdersHistoryPage = () => {
  const columns = [
    "Transaction ID",
    "Customer Name",
    "Order Date",
    "Total Amount",
    "Status",
  ];
  const data = [
    {
      "Transaction ID": "123456",
      "Customer Name": "John Doe",
      "Order Date": "2023-10-01",
      "Total Amount": "$50.00",
      Status: "Completed",
    },
    {
      "Transaction ID": "123457",
      "Customer Name": "Jane Smith",
      "Order Date": "2023-10-02",
      "Total Amount": "$75.00",
      Status: "Pending",
    },
    {
      "Transaction ID": "123458",
      "Customer Name": "Alice Johnson",
      "Order Date": "2023-10-03",
      "Total Amount": "$100.00",
      Status: "Cancelled",
    },
    {
      "Transaction ID": "123459",
      "Customer Name": "Bob Brown",
      "Order Date": "2023-10-04",
      "Total Amount": "$200.00",
      Status: "Completed",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        paddingBlock: "0.75rem",
      }}
    >
      <h2 style={{ fontSize: "1rem", fontWeight: "bold" }}>Orders History</h2>
      <Table
        data={data}
        renderHeader={() => (
          <>
            {columns.map((column, index) => (
              <th
                key={index}
                style={{
                  fontWeight: "bold",
                  fontSize: "0.875rem",
                  padding: "0.5rem 1rem",
                }}
              >
                {column}
              </th>
            ))}
          </>
        )}
        renderRow={(item: any) => (
          <>
            {columns.map((column, index) => (
              <td
                key={index}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.875rem",
                  textAlign: "left",
                }}
              >
                {item[column]}
              </td>
            ))}
          </>
        )}
      />
    </div>
  );
};

export default OrdersHistoryPage;
