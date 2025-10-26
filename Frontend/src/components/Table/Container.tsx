import {
  Table,
  TableContainer,
  Paper,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import TableHeader, { type Column } from "./Header";
import TableRowComponent from "./Body";
import { SortOrder } from "../../constants/enums";

export interface TableWrapperProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
  onSort?: (column: string) => void;
  rowKey: (row: T) => string | number;
}

function TableWrapper<T>({
  columns,
  data,
  loading = false,
  emptyMessage = "No data available",
  sortBy,
  sortOrder = SortOrder.ASC,
  onSort,
  rowKey,
}: TableWrapperProps<T>) {
  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="body1" color="text.secondary">
          {emptyMessage}
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHeader
          columns={columns}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={onSort}
        />
        <tbody>
          {data.map((row) => (
            <TableRowComponent key={rowKey(row)} row={row} columns={columns} />
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default TableWrapper;
