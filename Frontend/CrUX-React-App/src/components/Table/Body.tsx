import { TableRow, TableCell } from "@mui/material";
import type { Column } from "./Header";
import { ColumnAlignment } from "../../constants/enums";

interface TableRowProps<T> {
  row: T;
  columns: Column<T>[];
}

function TableRowComponent<T>({ row, columns }: TableRowProps<T>) {
  return (
    <TableRow hover>
      {columns.map((column) => {
        const value = row[column.id as keyof T];
        return (
          <TableCell
            key={column.id}
            align={column.align || ColumnAlignment.CENTER}
          >
            {column.render ? column.render(value, row) : String(value)}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export default TableRowComponent;
