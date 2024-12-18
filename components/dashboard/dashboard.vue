<template>
    <div>
      <!-- Containers for the charts -->
      <div id="DevelopResultYearInRFPChart" style="width: 100%; height: 500px;"></div>
      <div id="DevelopResultYearOutRFPChart" style="width: 100%; height: 500px;"></div>
      <div id="SupportResultYearChart" style="width: 100%; height: 500px;"></div>
      <div id="DeveloperResultYearChart" style="width: 100%; height: 500px;"></div>
    </div>
  </template>

<script setup>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { ref, onMounted } from "vue";

// Reactive state for the chart data
const chartData = ref({
  DevelopResultYearInRFP: [],
  DevelopResultYearOutRFP: [],
  SupportResultYear: [],
  DeveloperResultYear: [],
});

// Function to fetch data from the API
async function fetchChartData() {
  try {
    const response = await fetch("/api/v1/getDashboardChartData");
    if (!response.ok) {
      throw new Error("Failed to fetch chart data");
    }
    const data = await response.json();
    chartData.value = data; // Store API response
    initializeCharts(); // Initialize charts with fetched data
  } catch (error) {
    console.error("Error fetching chart data:");
  }
}

// Initialize charts
function initializeCharts() {
  createDevelopResultYearInRFPChart(chartData.value.DevelopResultYearInRFP);
  createDevelopResultYearOutRFPChart(chartData.value.DevelopResultYearOutRFP);
  createSupportResultYearChart(chartData.value.SupportResultYear);
  createDeveloperResultYearChart(chartData.value.DeveloperResultYear);
}

// Example: Create the DevelopResultYearInRFP chart
function createDevelopResultYearInRFPChart(data) {
  const root = am5.Root.new("DevelopResultYearInRFPChart");
  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
    })
  );

  const xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      categoryField: "Month",
      renderer: am5xy.AxisRendererX.new(root, {}),
    })
  );

  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    })
  );

  const series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: "Total",
      xAxis,
      yAxis,
      valueYField: "Total",
      categoryXField: "Month",
    })
  );

  series.data.setAll(data);
  xAxis.data.setAll(data);
}

// Repeat similar functions for other charts...
function createDevelopResultYearOutRFPChart(data) {
  const root = am5.Root.new("DevelopResultYearInRFPChart");
  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
    })
  );

  const xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      categoryField: "Month",
      renderer: am5xy.AxisRendererX.new(root, {}),
    })
  );

  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    })
  );

  const series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: "Total",
      xAxis,
      yAxis,
      valueYField: "Total",
      categoryXField: "Month",
    })
  );

  series.data.setAll(data);
  xAxis.data.setAll(data);
}

function createSupportResultYearChart(data) {
}

function createDeveloperResultYearChart(data) {
}

// Fetch data when the component is mounted
onMounted(() => {
  fetchChartData();
});
</script>