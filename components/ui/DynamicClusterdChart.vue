<template>
  <div>
    <div ref="chartdiv" style="height: 300px"></div>
  </div>
</template>

<script setup>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const props = defineProps(["data", "seriesList"]);
const chartdiv = ref(null);
let series = null;
onMounted(() => {
  am5.ready(function () {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new(chartdiv.value);

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
      })
    );

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );

    let data = props.data;

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/

    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15,
      direction: "rtl",
      fontFamily: "Vazir",
    });

    let yRenderer = am5xy.AxisRendererY.new(root, {});
    yRenderer.labels.template.setAll({
      direction: "rtl",
      fontFamily: "Vazir",
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "Month",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    if (data != undefined) xAxis.data.setAll(data);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: yRenderer,
      })
    );

    let tooltipRtl = am5.Tooltip.new(root, {
      labelText: "{categoryX} : {valueY}",
    });
    tooltipRtl.label.setAll({
      direction: "rtl",
      fontFamily: "Vazir",
    });
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: "Month",
        })
      );

      series.columns.template.setAll({
        tooltipText: "{categoryX} : {valueY}",
        tooltipY: 0,
        strokeOpacity: 0,
        tooltip: tooltipRtl,
      });

      if (data != undefined) series.data.setAll(data);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 0,
          sprite: am5.Label.new(root, {
            text: "{valueY}",
            fill: root.interfaceColors.get("alternativeText"),
            centerY: 0,
            centerX: am5.p50,
            populateText: true,
          }),
        });
      });

      legend.data.push(series);
    }

    props.seriesList.forEach((element) => {
      makeSeries("        " + element.name, element.value);
    });

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
  }); // end am5.ready()
});

watch(
  () => props.data,
  (newval) => {
    if (series) {
      series.data.setAll(newval);
    }
  }
);
</script>
