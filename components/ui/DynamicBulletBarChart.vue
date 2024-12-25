<template>
  <div>
    <div ref="chartdiv" style="height: 500px"></div>
  </div>
</template>

<script setup>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

var props = defineProps(["data", "seriesList"]);
const chartdiv = ref(null);
let series = null;

onMounted(() => {
  am5.ready(function () {
    /* Chart code */
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new(chartdiv.value);

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    let apidata = props.data;

    let data = [
      {
        name: "پویا رضائیه",
        value: apidata[0].value,
        pictureSettings: {
          src: "",
        },
      },
      {
        name: "محمد باقری",
        value: apidata[1].value,
        pictureSettings: {
          src: "",
        },
      },
      {
        name: "توحید حقیقی",
        value: apidata[2].value,
        pictureSettings: {
          src: "",
        },
      },
      {
        name: "مهسا برجی",
        value: apidata[3].value,
        pictureSettings: {
          src: "",
        },
      },
      {
        name: "ساناز محمد زاده",
        value: apidata[8].value,
        pictureSettings: {
          src: "",
        },
      },
      {
        name: "شکیلا کاظم پور",
        value: apidata[5].value,
        pictureSettings: {
          src: "",
        },
      },
      {
        name: "امیر مسعود صالحی",
        value: apidata[4].value,
        pictureSettings: {
          src: "",
        },
      },
      {
        name: "احسان درویشی",
        value: apidata[6].value,
        pictureSettings: {
          src: "/Ehsan.png",
        },
      },
    ];

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingBottom: 50,
        paddingTop: 40,
        paddingLeft: 0,
        paddingRight: 0,
      })
    );

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
        paddingTop: 40,
        categoryField: "name", //Month[i] inside the foreach lop
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        min: 0,
        renderer: yRenderer,
      })
    );

    let tooltipRtl = am5.Tooltip.new(root, {
      labelText: "{valueY}",
    });
    tooltipRtl.label.setAll({
      direction: "rtl",
      fontFamily: "Vazir",
    });

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "name",
        sequencedInterpolation: true,
        calculateAggregates: true,
        maskBullets: false,
        tooltip: tooltipRtl
      })
    );

    series.columns.template.setAll({
      strokeOpacity: 0,
      cornerRadiusBR: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusTL: 10,
      maxWidth: 50,
      fillOpacity: 0.8,
    });

    let currentlyHovered;

    series.columns.template.events.on("pointerover", function (e) {
      handleHover(e.target.dataItem);
    });

    series.columns.template.events.on("pointerout", function (e) {
      handleOut();
    });

    function handleHover(dataItem) {
      if (dataItem && currentlyHovered != dataItem) {
        handleOut();
        currentlyHovered = dataItem;
        let bullet = dataItem.bullets[0];
        bullet.animate({
          key: "locationY",
          to: 1,
          duration: 400,
          easing: am5.ease.out(am5.ease.cubic),
        });
      }
    }

    function handleOut() {
      if (currentlyHovered) {
        let bullet = currentlyHovered.bullets[0];
        bullet.animate({
          key: "locationY",
          to: 0,
          duration: 400,
          easing: am5.ease.out(am5.ease.cubic),
        });
      }
    }

    let circleTemplate = am5.Template.new({});

    series.bullets.push(function (root, series, dataItem) {
      let bulletContainer = am5.Container.new(root, {});
      let circle = bulletContainer.children.push(
        am5.Circle.new(
          root,
          {
            radius: 26,
          },
          circleTemplate
        )
      );

      let maskCircle = bulletContainer.children.push(
        am5.Circle.new(root, { radius: 22 })
      );

      // only containers can be masked, so we add image to another container
      let imageContainer = bulletContainer.children.push(
        am5.Container.new(root, {
          mask: maskCircle,
        })
      );

      let image = imageContainer.children.push(
        am5.Picture.new(root, {
          templateField: "pictureSettings",
          centerX: am5.p50,
          centerY: am5.p50,
          width: 60,
          height: 60,
        })
      );

      return am5.Bullet.new(root, {
        locationY: 0,
        sprite: bulletContainer,
      });
    });

    // heatrule
    series.set("heatRules", [
      {
        dataField: "valueY",
        max: am5.color("#2f65b0"),
        min: am5.color("#6794DC"),
        target: series.columns.template,
        key: "fill",
      },
      {
        dataField: "valueY",
        max: am5.color("#2f65b0"),
        min: am5.color("#6794DC"),
        target: circleTemplate,
        key: "fill",
      },
    ]);

    series.data.setAll(data);
    xAxis.data.setAll(data);

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("visible", false);
    cursor.lineY.set("visible", false);

    cursor.events.on("cursormoved", function () {
      let dataItem = series.get("tooltip").dataItem;
      if (dataItem) {
        handleHover(dataItem);
      } else {
        handleOut();
      }
    });

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear();
    chart.appear(1000, 100);
  }); // end am5.ready()
});

watch(
  () => props.data,
  (newval) => {
    if (series) {
      debugger;
      // Ensure series is initialized
      let data = [
        {
          name: "پویا رضائیه",
          value: newval[0].value,
          pictureSettings: {
            src: "",
          },
        },
        {
          name: "محمد باقری",
          value: newval[1].value,
          pictureSettings: {
            src: "",
          },
        },
        {
          name: "توحید حقیقی",
          value: newval[2].value,
          pictureSettings: {
            src: "",
          },
        },
        {
          name: "مهسا برجی",
          value: newval[3].value,
          pictureSettings: {
            src: "",
          },
        },
        {
          name: "ساناز محمد زاده",
          value: newval[8].value,
          pictureSettings: {
            src: "",
          },
        },
        {
          name: "شکیلا کاظم پور",
          value: newval[5].value,
          pictureSettings: {
            src: "",
          },
        },
        {
          name: "امیر مسعود صالحی",
          value: newval[4].value,
          pictureSettings: {
            src: "",
          },
        },
        {
          name: "احسان درویشی",
          value: newval[6].value,
          pictureSettings: {
            src: "/Ehsan.png",
          },
        },
      ];
      series.data.setAll(data);
      // xAxis.data.setAll(data.name);
      // chart.appear(1000, 100);
      // series.appear();
    }
  }
);
</script>
