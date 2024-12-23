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
  <hr/>
  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <UiDynamicBulletBarChart
            :data="chartData?.SupportResultYear"
            :seriesList="seriesListSupportResultYear"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRequestTypeStore } from '@/stores/requestTypeStore'
const changeRequestTypeId = useRequestTypeStore();
changeRequestTypeId.showSwitchButton(false);
definePageMeta({
  layout: "panel",
});
const {
  public: { ticketingUrl },
} = useRuntimeConfig();
const chartData = ref<ReportInfo>();
import type { DeveloperResultYear } from "~/models/interfaces/DeveloperResultYear";
import type { DevelopResultYear } from "~/models/interfaces/DevelopResultYear";
import type { SupportResultYear } from "~/models/interfaces/SupportResultYear";
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

interface ReportInfo {
  DevelopResultYearInRFP: DevelopResultYear[];
  DevelopResultYearOutRFP: DevelopResultYear[];
  SupportResultYear: SupportResultYear[];
  DeveloperResultYear: DeveloperResultYear[];
}

try {
  const response = await fetch(`${ticketingUrl}/api/v1/getDashboardChartData`);
  const data = await response.json();
  chartData.value = data || undefined;
} catch (error) {
  console.error("Error fetching dashboard chart data:", error);
}
</script>
