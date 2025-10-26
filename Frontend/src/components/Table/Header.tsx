import React, { type JSX } from "react";
import { TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material";
import { ColumnAlignment, SortOrder } from "../../constants/enums";

export interface Column<T> {
  id: string;
  label: string;
  sortable: boolean;
  render?: (value: T[keyof T], row: T) => JSX.Element | React.ReactNode;
  align?: ColumnAlignment;
  width?: string | number;
}

interface TableHeaderProps<T> {
  columns: Column<T>[];
  sortBy?: Column<T>["id"];
  sortOrder?: SortOrder;
  onSort?: (column: Column<T>["id"]) => void;
}

function TableHeader<T>({
  columns,
  sortBy,
  sortOrder = SortOrder.ASC,
  onSort,
}: TableHeaderProps<T>) {
  const handleSort = (columnId: string) => {
    if (onSort) {
      onSort(columnId);
    }
  };

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: "primary.main" }}>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align || "center"}
            sx={{
              color: "white",
              fontWeight: "bold",
              width: column.width,
            }}
          >
            {column.sortable && onSort ? (
              <TableSortLabel
                active={sortBy === column.id}
                direction={sortBy === column.id ? sortOrder : SortOrder.ASC}
                onClick={() => handleSort(column.id)}
                sx={{
                  color: "white !important",
                  "&.Mui-active": {
                    color: "white !important",
                  },
                  "& .MuiTableSortLabel-icon": {
                    color: "white !important",
                  },
                }}
              >
                {column.label}
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
