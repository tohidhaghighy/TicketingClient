<template>
    <div class="row">
			<div class="col-md-8">
				<div class="card">
					<div class="card-body">
						<div class="d-flex justify-content-between">
							<h6 class="card-title">تعداد تیکت</h6>
							<div class="dropdown">
								<a class="btn btn-outline-light btn-sm" href="#" data-toggle="dropdown">
									1403 <i class="ti-angle-down m-l-5"></i>
								</a>
								<div class="dropdown-menu dropdown-menu-right">
									<a href="#" class="dropdown-item">1403</a>
								</div>
							</div>
						</div>
						<ClientOnly>
        						<Chart :data="chartlist"/>
    					</ClientOnly>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="row">
					<div class="col-md-6">
						<ReportCard title="تیکت جدید " :count="data?.inserted" :total="data?.total" url="/ticket/list?status=2" color="progress-bar bg-success" />
					</div>
					<div class="col-md-6">
						<ReportCard title="تیکت انجام شده " :count="data?.done" :total="data?.total" url="/ticket/list?status=1" color="progress-bar bg-primary" />
					</div>
					<div class="col-md-6">
						<ReportCard title="تیکت رد شده " :count="data?.rejected" :total="data?.total" url="/ticket/list?status=4" color="progress-bar bg-warning" />
					</div>
					<div class="col-md-6" v-if="user.userRole==4 || user.userRole==5">
						<ReportCard title="انجام شده در انتظار تایید" :count="data?.awaitingConfirmation" :total="data?.total" url="/ticket/list?status=6" color="progress-bar bg-info" />
					</div>
				</div>
				<div class="row">
					<div class="col-md-6" v-if="user.userRole==4 || user.userRole==5">
						<ReportCard title="ارجاع به ویرا" :count="data?.sendtovira" :total="data?.total" url="/ticket/list?status=3" color="progress-bar bg-info" />
					</div>
					<div class="col-md-6" v-if="user.userRole==4 || user.userRole==5">
						<ReportCard title="بازگشت از ویرا" :count="data?.sendtotaz" :total="data?.total" url="/ticket/list?status=5" color="progress-bar bg-info" />
					</div>
					<div class="col-md-6" v-if="user.userRole==4 || user.userRole==5">
						<ReportCard title="در حال انجام" :count="data?.inProgress" :total="data?.total" url="/ticket/list?status=8" color="progress-bar bg-primary" />
					</div>
					<div class="col-md-6" v-if="user.userRole==4 || user.userRole==5">
						<ReportCard title="در صف انجام پردازش" :count="data?.inLine" :total="data?.total" url="/ticket/list?status=7" color="progress-bar bg-info" />
					</div>
				</div>
			</div>
		</div>
</template>

<script setup lang="ts">
	import type { UserInfo } from '../models/interfaces/UserInfo'
	import type { TicketInfo } from '../models/interfaces/TicketInfo'
	import type { ChartInfo } from '../models/interfaces/ChartConfig'

	const { public: { ticketingUrl }} = useRuntimeConfig();	
	var user = useCookie<UserInfo>("UserInfo");

	const { data , error } = await useFetch<TicketInfo>(`${ticketingUrl}/api/v1/getRoleTicket?RoleId=${user.value.userRole}&userId=${user.value.userId}`);
   
	const { data:chartlist } = await useFetch<ChartInfo>(`${ticketingUrl}/api/v1/getYearTicketInfo?RoleId=${user.value.userRole}&userId=${user.value.userId}`);

	onMounted(()=>{
		
	});

</script>