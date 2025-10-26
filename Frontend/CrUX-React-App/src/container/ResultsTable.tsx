import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import { TableWrapper } from "../components/Table";
import { ColumnsConfig } from "../constants/config";
import MetricCell from "../components/widgets/MetricCell";
import type { CruxMetrics, CruxResult } from "../types/AppTypes";
import type { SortOrder } from "../constants/enums";
import { InputTexts } from "../constants/constants";

interface ResultsTableProps {
  results: CruxResult[];
  loading?: boolean;
  sortBy?: string;
  sortOrder?: SortOrder;
  onSort?: (column: string) => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({
  results,
  loading = false,
  sortBy,
  sortOrder,
  onSort,
}) => {
  const columns = ColumnsConfig.map((item) => {
    if (item.id == "url") {
      return {
        ...item,
        render: (_: string | CruxMetrics | undefined, row: CruxResult) => (
          <Tooltip title={row.url} arrow>
            <Typography
              variant="body2"
              sx={{
                maxWidth: 250,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <strong>{row.url}</strong>
            </Typography>
          </Tooltip>
        ),
      };
    } else {
      return {
        ...item,
        render: (_: string | CruxMetrics | undefined, row: CruxResult) => (
          <MetricCell
            metric={row.metrics[item.id as keyof CruxMetrics]}
            metricName={item.id}
          />
        ),
      };
    }
  });

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Analysis Results
      </Typography>
      <TableWrapper
        columns={columns}
        data={results}
        loading={loading}
        emptyMessage={InputTexts.URL_EMPTY}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={onSort}
        rowKey={(row: CruxResult) => row.url}
      />
    </Box>
  );
};

export default ResultsTable;
