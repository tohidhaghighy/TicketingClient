<template>
  <div class="card-body">
    <h6 class="card-title">گزارش گیری</h6>
      
      <div class="row">
        <div class="col-md-4">
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
        <div class="col-md-4">
          <div class="form-group">
            <label for="exampleFormControlSelect1">اولویت</label>
            <select class="form-control" v-model="query.Priority">
              <option key="1" value="1">بالا</option>
              <option key="2" value="2">متوسط</option>
              <option key="3" value="3">پایین</option>
              <option key="0" value="0">همه</option>
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="exampleFormControlSelect1">نوع درخواست :</label>
            <select class="form-control" v-model="query.RequestType">
              <option key="1" value="1">پشتیبانی</option>
              <option key="2" value="2">توسعه</option>
              <option key="0" value="0">همه</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
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
        <div class="col-md-4">
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
        <div class="col-md-4">
          <div class="form-group">
            <label for="exampleFormControlSelect1">تاریخ شروع</label>
            <input type="text" id="startDateTime" name="date-picker-shamsi-list" class="form-control text-left" dir="ltr">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="exampleFormControlSelect1">تاریخ پایان</label>
            <input type="text" id="endDateTime" name="date-picker-shamsi-list" class="form-control text-left" dir="ltr">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3 m-t-b-20">
          <button class="btn btn-primary btn-rounded" @click="send">ایجاد گرازش</button>
        </div>
      </div>
  </div>
</template>

<script setup>
import jalaali from 'jalaali-js';

const user = useCookie("UserInfo");
const { public: { ticketingUrl }} = useRuntimeConfig();

const query = reactive({
	ProjectId:0,
	Priority:0,
  RequestType:0,
  StatusId:0,
  DeveloperId:0,
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
})

function convertShamsiToGregorian(shamsiDate) {
    // فرض کنید تاریخ ورودی به فرمت "yyyy/MM/dd" باشد
    const [year, month, day] = shamsiDate.split('/').map(Number);
    const { gy, gm, gd } = jalaali.toGregorian(year, month, day);
    
    return `${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`;
}

async function send(){
  var StartDateTime = document.getElementById('startDateTime').value;
  var EndDateTime = document.getElementById('endDateTime').value;
	if(StartDateTime != null && EndDateTime != null){
    try {
    var popout = window.open(`${ticketingUrl}/api/v1/downloadReport?projectId=${query.ProjectId}&priority=${query.Priority}&requestType=${query.RequestType}&statusId=${query.StatusId}&developerId=${query.DeveloperId}&startDateTime=${convertShamsiToGregorian(StartDateTime)}&endDateTime=${convertShamsiToGregorian(EndDateTime)}`);
    window.setTimeout(function () {
      popout.close();
    }, 2000);
    toastr.success('با موفقیت دانلود شد');
  } catch (error) {
    console.log(error);
  }
}else{
  toastr.error('لطفا تاریخ شروع و پایان را مشخص کنید');
}
}

const { data , error } = await useFetch(`${ticketingUrl}/api/v1/getProjects?roleId=${user.value.userRole}`);
</script>
