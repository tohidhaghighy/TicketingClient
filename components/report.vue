<template>
  <div class="row">
    <div class="col-md-8">
      <div class="card">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h6 class="card-title">تعداد تیکت</h6>
            <div class="dropdown">
              <a class="btn btn-outline-light btn-sm" data-toggle="dropdown">
                {{ defaultDate }} <i class="ti-angle-down m-l-5"></i>
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <a v-on:click="showdata(requestId, 1403)" class="dropdown-item"
                  >1403</a
                >
                <a v-on:click="showdata(requestId, 1404)" class="dropdown-item"
                  >1404</a
                >
              </div>
            </div>
          </div>
          <Chart :data="chartlistData" />
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="row">
        <!-- تیکت جدید -->
        <div class="col-md-6">
          <ReportCard
            title="تیکت جدید "
            :count="tableData?.inserted"
            :total="tableData?.total"
            url="/ticket/list?status=2"
            color="progress-bar bg-success"
          />
        </div>

        <!-- تیکت انجام شده -->
        <div class="col-md-6">
          <ReportCard
            title="تیکت انجام شده "
            :count="tableData?.done"
            :total="tableData?.total"
            url="/ticket/list?status=1"
            color="progress-bar bg-primary"
          />
        </div>
      </div>

      <div class="row">
        <!-- تیکت در حال انجام -->
        <div class="col-md-6">
          <ReportCard
            title="در حال انجام"
            :count="tableData?.inProgress"
            :total="tableData?.total"
            url="/ticket/list?status=8"
            color="progress-bar bg-primary"
          />
        </div>

        <!-- تیکت رد شده -->
        <div class="col-md-6">
          <ReportCard
            title="تیکت رد شده "
            :count="tableData?.rejected"
            :total="tableData?.total"
            url="/ticket/list?status=4"
            color="progress-bar bg-warning"
          />
        </div>
      </div>

      <div class="row" v-if="user.userRole == 4 || user.userRole == 5">
        <!-- ارجاع به ویرا -->
        <div class="col-md-6">
          <ReportCard
            title="ارجاع به ویرا"
            :count="tableData?.sendtovira"
            :total="tableData?.total"
            url="/ticket/list?status=3"
            color="progress-bar bg-info"
          />
        </div>

        <!-- بازگشت از ویرا -->
        <div class="col-md-6">
          <ReportCard
            title="بازگشت از ویرا"
            :count="tableData?.sendtotaz"
            :total="tableData?.total"
            url="/ticket/list?status=5"
            color="progress-bar bg-info"
          />
        </div>
      </div>

      <div class="row" v-if="user.userRole == 4 || user.userRole == 5">
        <!-- انجام شده در انتظار تایید -->
        <div class="col-md-6">
          <ReportCard
            title="انجام شده در انتظار تایید"
            :count="tableData?.awaitingConfirmation"
            :total="tableData?.total"
            url="/ticket/list?status=6"
            color="progress-bar bg-info"
          />
        </div>

        <!-- در صف انجام پردازش -->
        <div class="col-md-6">
          <ReportCard
            title="در صف انجام پردازش"
            :count="tableData?.inLine"
            :total="tableData?.total"
            url="/ticket/list?status=7"
            color="progress-bar bg-info"
          />
        </div>

        <!-- رد شده در انتظار تایید -->
        <div class="col-md-6">
          <ReportCard
            title="رد شده در انتظار تایید"
            :count="tableData?.awaitingRejecting"
            :total="tableData?.total"
            url="/ticket/list?status=9"
            color="progress-bar bg-info"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserInfo } from "../models/interfaces/UserInfo";
import type { TicketInfo } from "../models/interfaces/TicketInfo";
import type { ChartInfo } from "../models/interfaces/ChartConfig";
import { useRequestTypeStore } from "@/stores/requestTypeStore";

const changeRequestTypeId = useRequestTypeStore();
let defaultDate = 1403;
const tableData = ref<TicketInfo>();
const chartlistData = ref<ChartInfo>();

let requestId = 1;
if (changeRequestTypeId.requestTypeId) {
  requestId = 2;
}
watch(
  () => changeRequestTypeId.requestTypeId,
  (newval) => {
    if (newval) {
      showdata(2, defaultDate);
    } else {
      showdata(1, defaultDate);
    }
  }
);

const {
  public: { ticketingUrl },
} = useRuntimeConfig();
var user = useCookie<UserInfo>("UserInfo");

async function showdata(val: number, date: number) {
  defaultDate = date;
  var { data, error } = await useFetch<TicketInfo>(
    `${ticketingUrl}/api/v1/getRoleTicket?RoleId=${user.value.userRole}&userId=${user.value.userId}&requestTypeId=` +
      val
  );
  tableData.value = data.value || undefined;
  var { data: chartlist, error } = await useFetch<ChartInfo>(
    `${ticketingUrl}/api/v1/getYearTicketInfo?date=${date}&RoleId=${user.value.userRole}&userId=${user.value.userId}&requestTypeId=` +
      val
  );
  chartlistData.value = chartlist.value || undefined;
}
var { data, error } = await useFetch<TicketInfo>(
  `${ticketingUrl}/api/v1/getRoleTicket?RoleId=${user.value.userRole}&userId=${user.value.userId}&requestTypeId=` +
    requestId
);
tableData.value = data.value || undefined;
var { data: chartlist, error } = await useFetch<ChartInfo>(
  `${ticketingUrl}/api/v1/getYearTicketInfo?date=${defaultDate}&RoleId=${user.value.userRole}&userId=${user.value.userId}&requestTypeId=` +
    requestId
);
chartlistData.value = chartlist.value || undefined;
</script>
