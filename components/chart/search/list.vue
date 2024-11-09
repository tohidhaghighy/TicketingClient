<style>
tr > th{
	font-size: 11px;
}
tr > td{
	font-size: 12px;
}
</style>
<template>
    <div class="row">
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
							<th v-if="user.userRole==5">ایجاد شده توسط</th>
							<th>ارجاع شده به</th>
							<th>وضعیت</th>
							<th v-if="user.userRole==5">انجام دهنده</th>
							<th v-if="user.userRole==5">ساعت صرف شده</th>
							<th>جزئیات</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in data" :key="item.id" :name="item.id">
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
							<td v-if="item.developerId==1 && user.userRole==5">
								<p>پویا رضاییه</p>
							</td>
							<td v-else-if="item.developerId==2 && user.userRole==5">
								<p>محمد باقری</p>
							</td>
							<td v-else-if="item.developerId==3 && user.userRole==5">
								<p>توحید حقیقی</p>
							</td>
							<td v-else-if="item.developerId==4 && user.userRole==5">
								<p>مهسا برجی</p>
							</td>
							<td v-else-if="item.developerId==5 && user.userRole==5">
								<p>امیر مسعود صالحی</p>
							</td>
							<td v-else-if="item.developerId==6 && user.userRole==5">
								<p>شکیلا کاظم پور</p>
							</td>
							<td v-else-if="item.developerId==7 && user.userRole==5">
								<p>احسان درویشی</p>
							</td>
							<td v-else-if="item.developerId==8 && user.userRole==5">
								<p>الهه ابراهیمی</p>
							</td>
							<td v-else-if="item.developerId==9 && user.userRole==5">
								<p>ساناز محمد زاده</p>
							</td>
							<td v-else-if="item.developerId==10 && user.userRole==5">
								<p> تخصیص نشده</p>
							</td>
							<td v-if="user.userRole==5">{{item.ticketTime}}</td>
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
	
const user = useCookie("UserInfo");
debugger;
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
const props = defineProps(['data'])
</script>