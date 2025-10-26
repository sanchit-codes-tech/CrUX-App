import React, { useEffect, useState } from "react";
import { CssBaseline, Alert, Box, ThemeProvider, Divider } from "@mui/material";
import { UrlInput, FilterPanel } from "./container";
import { useCruxData } from "./hooks/useCruxData";
import { useTableFilters } from "./hooks/useTableFilters";
import { validateUrls } from "./components/utlility/Validator";
import { MAX_URLS } from "./constants/config";
import Header from "./layout/Header";
import Container from "./layout/Container";
import ResultsTable from "./container/ResultsTable";
import { MuiTheme } from "./theme/MuiTheme";
import UrlSummaryList from "./container/URLSummaryList";
import Toast from "./components/common/Toast";

const App: React.FC = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const {
    data,
    loading,
    error,
    toast,
    fetchData,
    clearError,
    clearData,
    hideToast,
  } = useCruxData();

  const {
    filteredData,
    sortBy,
    sortOrder,
    filterMetric,
    filterThreshold,
    setFilterMetric,
    setFilterThreshold,
    handleSort,
  } = useTableFilters({ data });

  useEffect(() => {
    if (urls.length == 0) {
      clearData();
    }
  }, [urls]);

  const handleSearch = async () => {
    clearError();

    if (urls.length === 0) {
      return;
    }

    // Validate URLs
    const { valid, invalid } = validateUrls(urls);

    if (valid.length === 0) {
      return;
    }

    if (invalid.length > 0) {
      console.warn("Some URLs are invalid:", invalid);
    }

    // Fetch data for valid URLs
    await fetchData(valid);
  };

  return (
    <ThemeProvider theme={MuiTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "Background",
        }}
      >
        <Header />

        <Container>
          <Box sx={{ mb: 3 }}>
            <Alert severity="info">
              <strong>Chrome UX Report Dashboard</strong> - Analyze Core Web
              Vitals for up to {MAX_URLS} URLs. Enter valid URLs starting with
              http:// or https://
            </Alert>
          </Box>

          <UrlInput
            urls={urls}
            onUrlsChange={setUrls}
            onSearch={handleSearch}
            loading={loading}
            maxUrls={MAX_URLS}
          />

          {error && (
            <Box sx={{ mt: 3 }}>
              <Alert severity="error" onClose={clearError}>
                {error}
              </Alert>
            </Box>
          )}

          {data.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <UrlSummaryList results={data} />
              <Divider sx={{ my: 4 }} />

              <FilterPanel
                filterMetric={filterMetric}
                onFilterMetricChange={setFilterMetric}
                filterThreshold={filterThreshold}
                onFilterThresholdChange={setFilterThreshold}
                sortBy={sortBy}
                onSortByChange={(value: string) => handleSort(value)}
              />

              <ResultsTable
                results={filteredData}
                loading={loading}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
            </Box>
          )}
          <Toast
            open={toast.open}
            message={toast.message}
            severity={toast.severity}
            onClose={hideToast}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
