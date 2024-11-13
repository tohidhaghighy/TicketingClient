<style>

</style>
<template>
  <div class="card-body">
    <h6 class="card-title">جستجوی پیشرفته</h6>

      <div class="row">
          <div class="col-md-2">
            <div class="form-group">
              <label for="exampleFormControlInput1">شماره تیکت :</label>
              <input type="text" class="form-control text-left" v-model="query.TicketNumber" placeholder="نمونه شماره تیکت : 1403110001" />
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="exampleFormControlInput1">عنوان :</label>
              <input type="text" class="form-control text-left" v-model="query.Title" placeholder="نمونه عنوان تیکت : قبض"/>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="exampleFormControlSelect1">نقش ثبت کننده :</label>
              <select v-model="query.InsertedRoleId" class="form-control">
                <option value="1">ادمین سامانه SSO</option>
                <option value="2">ادمین سامانه مدیریت پرونده ها</option>
                <option value="3">ادمین سامانه میز خدمت</option>
                <option value="4">ادمین تعزیرات</option>
                <option value="5">ادمین ویرا</option>
                <option value="6">ادمین سامانه امحا</option>
                <option value="7">ادمین سامانه تبادل اطلاعات</option>
                <option value="10">هوش تجاری</option>
                <option value="9">زیر ساخت</option>
                <option value="0">همه</option>
              </select>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="exampleFormControlInput1">نام کاربری :</label>
              <input type="text" class="form-control text-left" v-model="query.Username" placeholder="نمونه نام کاربری : admintaz" />
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="exampleFormControlSelect1">ارجاع شده به :</label>
              <select v-model="query.CurrentRoleId" class="form-control">
                <option value="1">ادمین سامانه SSO</option>
                <option value="2">ادمین سامانه مدیریت پرونده ها</option>
                <option value="3">ادمین سامانه میز خدمت</option>
                <option value="4">ادمین تعزیرات</option>
                <option value="5">ادمین ویرا</option>
                <option value="6">ادمین سامانه امحا</option>
                <option value="7">ادمین سامانه تبادل اطلاعات</option>
                <option value="10">هوش تجاری</option>
                <option value="9">زیر ساخت</option>
                <option value="0">همه</option>
              </select>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="exampleFormControlSelect1">وضعیت تیکت</label>
              <select v-model="query.StatusId" class="form-control">
                <option value="1">انجام شده</option>
                <option value="2">جدید</option>
                <option value="3">ارجاع به ویرا</option>
                <option value="4">ردشده</option>
                <option value="5">بازگشت از ویرا</option>
                <option value="6">انجام شد در انتظار تایید</option>
                <option value="7">در صف انجام پردازش</option>
                <option value="8">در حال انجام</option>
                <option value="0">همه</option>
              </select>
            </div>
          </div>
      </div>

      <div class="row">
        <div class="col-md-2">
            <div class="form-group">
              <label for="exampleFormControlSelect1">سامانه</label>
              <select v-model="query.ProjectId" class="form-control">
                <option
                  v-for="item in data"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
                <option key="0" value="0">همه</option>
              </select>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="exampleFormControlSelect1">نوع درخواست :</label>
              <select class="form-control" v-model="query.RequestType">
                <option key="1" value="1">پشتیبانی</option>
                <option key="2" value="2">توسعه</option>
                <option key="0" value="0">همه</option>
              </select>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="exampleFormControlSelect1">انجام دهنده</label>
              <select v-model="query.DeveloperId" class="form-control">
                <option value="1">پویا رضائیه</option>
                <option value="2">محمد باقری</option>
                <option value="3">توحید حقیقی</option>
                <option value="4">مهسا برجی</option>
                <option value="8">الهه ابراهیمی</option>
                <option value="9">ساناز محمد زاده</option>
                <option value="6">شکیلا کاظم پور</option>
                <option value="5">امیر مسعود صالحی</option>
                <option value="7">احسان درویشی</option>
                <option value="0">همه</option>
              </select>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="exampleFormControlSelect1">تاریخ شروع</label>
              <input type="text" id="startDateTime" name="date-picker-shamsi-list" class="form-control text-left" dir="ltr">
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="exampleFormControlSelect1">تاریخ پایان</label>
              <input type="text" id="endDateTime" name="date-picker-shamsi-list" class="form-control text-left" dir="ltr">
            </div>
          </div>
      </div>

      <div class="row">
        <div class="col-md-3 m-t-b-20">
          <button class="btn btn-primary btn-rounded" @click="send">جستجوی پیشرفته</button>
        </div>
      </div>
  </div>
  
  <div class="row">
    <div class="col-md-12">
      <div class="card-body">
        <table id="search" class="table table-striped table-bordered" width="100%">
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
						<th >ایجاد شده توسط</th>
						<th>ارجاع شده به</th>
						<th>وضعیت</th>
						<th>انجام دهنده</th>
						<th>ساعت صرف شده</th>
						<th>جزئیات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in searchResult" :key="id" :name="id">
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
							<td v-if="item.title.length>100">{{item.title.substring(0, 50) + "..."}}</td>
              <td v-else>{{item.title}}</td>
							<td>{{item.project}}</td>
							<td>{{user.userRoleList.find(x => {return x.id == item.insertedRoleId;}).name }}</td>
              <td>{{user.userRoleList.find(x => {return x.id == item.currentRoleId;}).name }}</td>
							<td v-if="item.statusId==1">
								<p class="text-done">{{ item.status }}</p>
							</td>
							<td v-else-if="item.statusId==2">
								<a class="text-inserted">{{ item.status }}</a>
							</td>
							<td v-else-if="item.statusId==3">
								<a class="text-inserted">{{ item.status }}</a>
							</td>
							<td v-else-if="item.statusId==4">
								<a class="text-danger">{{ item.status }}</a>
							</td>
							<td v-else-if="item.statusId==5">
								<a class="text-inserted">{{ item.status }}</a>
							</td>
							<td v-else-if="item.statusId==6">
								<a class="text-inserted">{{ item.status }}</a>
							</td>
							<td v-else-if="item.statusId==7">
								<a class="text-inserted">{{ item.status }}</a>
							</td>
							<td v-else-if="item.statusId==8">
								<a class="text-inserted">{{ item.status }}</a>
							</td>
              <td v-else-if="item.statusId==9">
								<a class="text-awaitingConfirmation">{{ item.status }}</a>
							</td>
							<td v-if="item.developerId==1">
								<p>پویا رضاییه</p>
							</td>
							<td v-else-if="item.developerId==2">
								<p>محمد باقری</p>
							</td>
							<td v-else-if="item.developerId==3">
								<p>توحید حقیقی</p>
							</td>
							<td v-else-if="item.developerId==4">
								<p>مهسا برجی</p>
							</td>
							<td v-else-if="item.developerId==5">
								<p>امیر مسعود صالحی</p>
							</td>
							<td v-else-if="item.developerId==6">
								<p>شکیلا کاظم پور</p>
							</td>
							<td v-else-if="item.developerId==7">
								<p>احسان درویشی</p>
							</td>
							<td v-else-if="item.developerId==8">
								<p>الهه ابراهیمی</p>
							</td>
							<td v-else-if="item.developerId==9">
								<p>ساناز محمد زاده</p>
							</td>
							<td v-else-if="item.developerId==10">
								<p> تخصیص نشده</p>
							</td>
							<td>{{item.ticketTime}}</td>
							<td>
								<nuxt-link :to="{ path: '/ticket/detail', query: {id: item.id}}">مشاهده</nuxt-link>
							</td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  import jalaali from 'jalaali-js';
  
  const user = useCookie("UserInfo");
  const { public: { ticketingUrl }} = useRuntimeConfig();
  const query = reactive({
    TicketNumber: "",
    Title: "",
    InsertedRoleId: 0,
    Username: "",
    CurrentRoleId: 0,
    StatusId: 0,
    ProjectId: 0,
    RequestType: 0,
    DeveloperId: 0,
});
  
  onMounted(() => {
    $('input[name="date-picker-shamsi-list"]').datepicker({
      dateFormat: "yy/mm/dd",
      showOtherMonths: true,
      selectOtherMonths: true,
      changeMonth: true,
      changeYear: true,
      showButtonPanel: true
    });
    $('#search').DataTable({
      responsive: true,
      pageLength: 100,
      searching: false,
		  order: [[3, 'desc']],
		  language: 
      {
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

  function convertShamsiToGregorian(shamsiDate) {
    // فرض کنید تاریخ ورودی به فرمت "yyyy/MM/dd" باشد
    const [year, month, day] = shamsiDate.split('/').map(Number);
    const { gy, gm, gd } = jalaali.toGregorian(year, month, day);
    
    return `${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`;
  }

  const searchResult = ref([]);

  async function send(){
    var StartDateTime = document.getElementById('startDateTime').value;
    var EndDateTime = document.getElementById('endDateTime').value;
    if (!StartDateTime || !EndDateTime) 
    {
    toastr.error('لطفا تاریخ شروع و پایان را مشخص کنید');
    }
    try {
    const { data, error: fetchError } = await useFetch(
      `${ticketingUrl}/api/v1/search?ticketNumber=${query.TicketNumber}&title=${query.Title}&insertedRoleId=${query.InsertedRoleId}&username=${query.Username}&CurrentRoleId=${query.CurrentRoleId}&statusId=${query.StatusId}&projectId=${query.ProjectId}&requestType=${query.RequestType}&developerId=${query.DeveloperId}&startDateTime=${convertShamsiToGregorian(StartDateTime)}&endDateTime=${convertShamsiToGregorian(EndDateTime)}`
    );

    if (fetchError.value) {
      console.error("Fetch error:", fetchError.value);
      error.value = fetchError.value;
    } else {
      searchResult.value = data.value;
    }
  } catch (err) {
    console.error("An unexpected error occurred:", err);
    error.value = err;
  }
  }
  const { data , error } = await useFetch(`${ticketingUrl}/api/v1/getProjects?roleId=${user.value.userRole}`);
</script>
  