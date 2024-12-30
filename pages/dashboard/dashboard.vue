<template>
  <div class="row">
    <div class="col-md-6">
      <h1>توسعه بر اساس برنامه زمانی</h1>
      <div class="card">
        <div class="card-body">
          <UiDynamicClusterdChart
            :data="chartData?.DevelopResultYearInRFP"
            :seriesList="seriesListDevelopResultYearInRFP"
          />
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h1>توسعه خارج از برنامه زمانی</h1>
      <div class="card">
        <div class="card-body">
          <UiDynamicClusterdChart
            :data="chartData?.DevelopResultYearOutRFP"
            :seriesList="seriesListDevelopResultYearOutRFP"
          />
        </div>
      </div>
    </div>
  </div>
  <hr />
  <div class="row">
    <div class="col-md-6">
      <h1>پشتیبانی</h1>
      <div class="card">
        <div class="card-body">
          <UiDynamicClusterdChart
            :data="chartData?.SupportResultYear"
            :seriesList="seriesListSupportResultYear"
          />
        </div>
      </div>
    </div>
  </div>
  <hr />
  <div class="row">
    <div class="col-md-6">
      <h1>تعداد تیکت های توسعه - {{ months[month-1] }}</h1>
      <div class="card">
        <div class="card-body">
          <UiDynamicBulletBarChart
            :data="chartData?.DeveloperResultCount_develop"
            :seriesList="seriesListDeveloperCounts"
          />
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h1>میزان ساعت کارکرد تیکت های توسعه - {{ months[month-1] }}</h1>
      <div class="card">
        <div class="card-body">
          <UiDynamicBulletBarChart
            :data="chartData?.DeveloperResultTime_develop"
            :seriesList="seriesListDeveloperTimes"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6">
      <h1>تعداد تیکت های پشتیبانی - {{ months[month-1] }}</h1>
      <div class="card">
        <div class="card-body">
          <UiDynamicBulletBarChart
            :data="chartData?.DeveloperResultCount_support"
            :seriesList="seriesListDeveloperCounts"
          />
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h1>میزان ساعت کارکرد تیکت های پشتیبانی - {{ months[month-1] }}</h1>
      <div class="card">
        <div class="card-body">
          <UiDynamicBulletBarChart
            :data="chartData?.DeveloperResultTime_support"
            :seriesList="seriesListDeveloperTimes"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div id="month-buttons">
        <button v-for="(month, index) in months" :key="index" @click="changeMonth(index+1)">
          {{ month }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

//#region imports
import { useRequestTypeStore } from "@/stores/requestTypeStore";
import type { DeveloperData } from "~/models/interfaces/DeveloperData";
import type { DevelopResultYear } from "~/models/interfaces/DevelopResultYear";
import type { SupportResultYear } from "~/models/interfaces/SupportResultYear";
//#endregion

//#region const
const chartData = ref<ReportInfo>();
const {public: { ticketingUrl },} = useRuntimeConfig();

const changeRequestTypeId = useRequestTypeStore();
changeRequestTypeId.showSwitchButton(false);
definePageMeta({
  layout: "panel",
});

const months = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];
//#endregion
var month=1;
//#region changeMonth function
async function changeMonth(newMonthId: number) {
  month = newMonthId;
  try {
    const response = await fetch(`${ticketingUrl}/api/v1/getDashboardChartData?monthId=${newMonthId}`);
    const data = await response.json();
    chartData.value = data || undefined;
  } catch (error) {
    console.error("Error fetching dashboard chart data:", error);
  }
}
//#endregion

//#region Series
var seriesListSupportResultYear = [
  {
    name: "زمان تعهد پشتیبانی",
    value: "CompanyCommitmentTime",
  },
  {
    name: "زمان پشتیبانی",
    value: "SupportTime",
  },
];

var seriesListDevelopResultYearInRFP = [
  {
    name: "تیکت های وارده",
    value: "Total",
  },
  {
    name: "تیکت های انجام شده",
    value: "Done",
  },
];

var seriesListDevelopResultYearOutRFP = [
  {
    name: "تیکت های وارده",
    value: "Total",
  },
  {
    name: "تیکت های انجام شده",
    value: "Done",
  },
];

var seriesListDeveloperCounts = [
  {
    name: "تعداد تیکت های انجام شده",
    value: "DeveloperCounts",
  },
];

var seriesListDeveloperTimes = [
  {
    name: "زمان صرف شده برای تیکت ها",
    value: "DeveloperTimes",
  },
];
//#endregion

//#region ReportInfo interface
interface ReportInfo {
  DevelopResultYearInRFP: DevelopResultYear[];
  DevelopResultYearOutRFP: DevelopResultYear[];
  SupportResultYear: SupportResultYear[];
  DeveloperResultCount_support: DeveloperData[];
  DeveloperResultTime_support: DeveloperData[];
  DeveloperResultCount_develop: DeveloperData[];
  DeveloperResultTime_develop: DeveloperData[];
}
//#endregion

try {
  const response = await fetch(`${ticketingUrl}/api/v1/getDashboardChartData?monthId=0`);
  const data = await response.json();
  chartData.value = data || undefined;
} catch (error) {
  console.error("Error fetching dashboard chart data:", error);
}
</script>
