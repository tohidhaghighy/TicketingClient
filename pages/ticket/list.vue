<style>
tr > th{
	font-size: 11px;
}
tr > td{
	font-size: 12px;
}
</style>
<template>
    <div class="card">
			<div class="card-body">
				<table id="ticketlist" class="table table-striped table-bordered" width="100%">
					<thead>
						<tr>
							<th>شماره ردیف تیکت</th>
							<th>کد تیکت</th>
							<th>ثبت کننده</th>
							<th>تاریخ ثبت</th>
							<th>نوع درخواست </th>
							<th>اولویت</th>
							<th>عنوان</th>
							<th>سامانه</th>
							<th>ارجاع شده به</th>
							<th>وضعیت</th>
							<th>جزئیات</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in data" :key="Id" :name="Id">
							<td>{{item.ticketRowNumber}} </td>
							<td>{{item.ticketNumber}} </td>
							<td>{{item.username}} </td>
							<td>{{item.date}}</td>
							<td v-if="item.requestType==1">پشتیبانی</td>
							<td v-else-if="item.requestType==2">توسعه</td>
							<td v-else></td>
							<td v-if="item.priority==1">بالا</td>
							<td v-else-if="item.priority==2">متوسط</td>
							<td v-else>پایین</td>
							<td>{{item.title}}</td>
							<td>{{item.project}}</td>
							<td>{{user.userRoleList.find(x => {return x.id == item.currentRoleId;}).name }}</td>
							<td v-if="item.statusId==1">
								<p class="text-success">{{ item.status }}</p>
							</td>
							<td v-else-if="item.statusId==2">
								<a class="text-primary">{{ item.status }}</a>
							</td>
							<td v-else-if="item.statusId==3">
								<a class="text-warning">{{ item.status }}</a>
							</td>
							<td v-else-if="item.statusId==4">
								<a class="text-danger">{{ item.status }}</a>
							</td>
							<td v-else-if="item.statusId==5">
								<a class="text-warning">{{ item.status }}</a>
							</td>
							<td v-else-if="item.statusId==6">
								<a class="text-primary">{{ item.status }}</a>
							</td>
							<td v-else-if="item.statusId==7">
								<a class="text-warning">{{ item.status }}</a>
							</td>
							<td v-else-if="item.statusId==8">
								<a class="text-primary">{{ item.status }}</a>
							</td>
							<td>
								<nuxt-link :to="{ path: '/ticket/detail', query: {id: item.id}}">مشاهده</nuxt-link>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	
</template>

<script setup>
	
definePageMeta({
  layout: 'panel'
});
const route = useRoute();
const user = useCookie("UserInfo");
const { public: { ticketingUrl }} = useRuntimeConfig();
onMounted(() => {
	$('#ticketlist').DataTable({
        responsive: true,
		order: [[3, 'desc']],
		language: {
			"sEmptyTable":     "هیچ داده ای در جدول وجود ندارد",
			"sInfo":           "نمایش _START_ تا _END_ از _TOTAL_ رکورد",
			"sInfoEmpty":      "نمایش 0 تا 0 از 0 رکورد",
			"sInfoFiltered":   "(فیلتر شده از _MAX_ رکورد)",
			"sInfoPostFix":    "",
			"sInfoThousands":  ",",
			"sLengthMenu":     "نمایش _MENU_ رکورد",
			"sLoadingRecords": "در حال بارگزاری...",
			"sProcessing":     "در حال پردازش...",
			"sSearch":         "جستجو:",
			"sZeroRecords":    "رکوردی با این مشخصات پیدا نشد",
			"oPaginate": {
				"sFirst":    "ابتدا",
				"sLast":     "انتها",
				"sNext":     "بعدی",
				"sPrevious": "قبلی"
			},
			"oAria": {
				"sSortAscending":  ": فعال سازی نمایش به صورت صعودی",
				"sSortDescending": ": فعال سازی نمایش به صورت نزولی"
			}
		}
    });
})
const { data : data , error } = await useFetch(`${ticketingUrl}/api/v1/getTicketList?roleId=${user.value.userRole}&status=${route.query.status}&userId=${user.value.userId}`);
</script>