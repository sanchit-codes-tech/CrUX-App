import { useState, useMemo } from "react";
import type { CruxResult } from "../types/AppTypes";
import { SortOrder } from "../constants/enums";

interface UseTableFiltersProps {
  data: CruxResult[];
}

interface UseTableFiltersReturn {
  filteredData: CruxResult[];
  sortBy: string;
  sortOrder: SortOrder;
  filterMetric: string;
  filterThreshold: string;
  setSortBy: (sortBy: string) => void;
  toggleSortOrder: () => void;
  setFilterMetric: (metric: string) => void;
  setFilterThreshold: (threshold: string) => void;
  handleSort: (column: string) => void;
}

export const useTableFilters = ({
  data,
}: UseTableFiltersProps): UseTableFiltersReturn => {
  const [sortBy, setSortBy] = useState<string>("url");
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);
  const [filterMetric, setFilterMetric] = useState<string>("all");
  const [filterThreshold, setFilterThreshold] = useState<string>("");

  const toggleSortOrder = () => {
    setSortOrder((prev) =>
      prev === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC
    );
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      toggleSortOrder();
    } else {
      setSortBy(column);
      setSortOrder(SortOrder.ASC);
    }
  };

  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply metric filter
    if (filterMetric !== "all" && filterThreshold) {
      const threshold = parseFloat(filterThreshold);
      if (!isNaN(threshold)) {
        result = result.filter((item) => {
          const metricValue =
            item.metrics[filterMetric as keyof typeof item.metrics]?.value;
          return metricValue !== undefined && metricValue >= threshold;
        });
      }
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      if (sortBy === "url") {
        aValue = a.url;
        bValue = b.url;
      } else {
        aValue = a.metrics[sortBy as keyof typeof a.metrics]?.value ?? 0;
        bValue = b.metrics[sortBy as keyof typeof b.metrics]?.value ?? 0;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === SortOrder.ASC
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === SortOrder.ASC ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return result;
  }, [data, sortBy, sortOrder, filterMetric, filterThreshold]);

  return {
    filteredData,
    sortBy,
    sortOrder,
    filterMetric,
    filterThreshold,
    setSortBy,
    toggleSortOrder,
    setFilterMetric,
    setFilterThreshold,
    handleSort,
  };
};
