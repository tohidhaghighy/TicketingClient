<template>
    <div>
      <div ref="chartdiv" style="height: 300px;"></div>
    </div>
  </template>

<script setup>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { ref, onMounted } from "vue";

const props = defineProps(['data']);
const chartdiv = ref(null);

onMounted(async () => {
  // Create root element
  root = am5.Root.new(chartdiv.value);

  // Set a theme
  root.setThemes([am5themes_Animated.new(root)]);

  // Create a chart
  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
    })
  );

  // Add X-axis
  const xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {}),
    })
  );

//   xAxis.data.setAll(props.total);

  // Add Y-axis
  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    })
  );

  // Create series 1
  const series1 = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "series1",
      categoryXField: "category",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{name}: {valueY}",
      }),
    })
  );

  series1.data.setAll(props.counts);

  // Create series 2
  const series2 = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: "Series 2",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "series2",
      categoryXField: "category",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{name}: {valueY}",
      }),
    })
  );

  series2.data.setAll(props.times); 

  // Add legend
  const legend = chart.children.push(am5.Legend.new(root, {}));
  legend.data.setAll(chart.series.values);

  // Export menu
  chart.children.push(
    am5.ExportingMenu.new(root, {
      menu: am5.Exporting.defaultExportingMenu,
    })
  );

  onBeforeUnmount(() => {
    if (root) {
      root.dispose();
    }
  });
});
</script>