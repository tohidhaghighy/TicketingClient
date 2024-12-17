<template>
    <div>
    </div>
</template>

<script setup lang="ts">
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

let root: am5.Root;

onMounted(() => {
    root = am5.Root.new("chartdiv");
    const chartData = ref<any[]>([]);

    // async function fetchChartData() {
    //     try {
    //         var { data , error } = await useFetch("https://api.example.com/chartdata"); // Replace with your API URL
    //         data.value = chartData; // Assuming API returns an array of objects
    //     } catch (error) {
    //         console.error("Error fetching chart data:", error);
    //     }
    // }

    let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout,
        })
    );

    let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
            categoryField: "catagory",
            renderer: am5xy.AxisRendererX.new(root, {
                cellStartLocation: 0.1,
                cellEndLocation: 0.9,
            }),
        })
    );

    let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root,{
            renderer: am5xy.AxisRendererY.new(root,{}),
        })
    );
})
</script>