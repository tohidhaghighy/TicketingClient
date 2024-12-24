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
      <h1>تعداد تیکت ها</h1>
      <div class="card">
        <div class="card-body">
          <UiDynamicBulletBarChart
            :data="chartData?.DeveloperResultCount[monthId]"
            :seriesList="seriesListDeveloperCounts"
          />
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h1>میزان ساعت کارکرد</h1>
      <div class="card">
        <div class="card-body">
          <UiDynamicBulletBarChart
            :data="chartData?.DeveloperResultTime[monthId]"
            :seriesList="seriesListDeveloperTimes"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div id="month-buttons">
        <button @click="changeMonth(0)">فروردین</button>
        <button @click="changeMonth(1)">اردیبهشت</button>
        <button @click="changeMonth(2)">خرداد</button>
        <button @click="changeMonth(3)">تیر</button>
        <button @click="changeMonth(4)">مرداد</button>
        <button @click="changeMonth(5)">شهریور</button>
        <button @click="changeMonth(6)">مهر</button>
        <button @click="changeMonth(7)">آبان</button>
        <button @click="changeMonth(8)">آذر</button>
        <button @click="changeMonth(9)">دی</button>
        <button @click="changeMonth(10)">بهمن</button>
        <button @click="changeMonth(11)">اسفند</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRequestTypeStore } from "@/stores/requestTypeStore";
import type { DeveloperData } from "~/models/interfaces/DeveloperData";
import type { DevelopResultYear } from "~/models/interfaces/DevelopResultYear";
import type { SupportResultYear } from "~/models/interfaces/SupportResultYear";

const chartData = ref<ReportInfo>();
const {public: { ticketingUrl },} = useRuntimeConfig();

const changeRequestTypeId = useRequestTypeStore();
changeRequestTypeId.showSwitchButton(false);
definePageMeta({
  layout: "panel",
});

var monthId = ref(0);
async function changeMonth(newMonthId: number) {
  monthId.value = newMonthId;
}

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

interface ReportInfo {
  DevelopResultYearInRFP: DevelopResultYear[];
  DevelopResultYearOutRFP: DevelopResultYear[];
  SupportResultYear: SupportResultYear[];
  DeveloperResultCount: [DeveloperData[]];
  DeveloperResultTime: [DeveloperData[]];
}

try {
  const response = await fetch(`${ticketingUrl}/api/v1/getDashboardChartData`);
  const data = await response.json();
  chartData.value = data || undefined;
} catch (error) {
  console.error("Error fetching dashboard chart data:", error);
}
</script>
