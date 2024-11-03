<template>
  <div class="card-body">
    <h6 class="card-title">گزارش گیری</h6>
      
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="exampleFormControlInput1">عنوان گزارش </label>
            <input
              type="text"
              class="form-control text-left"
              v-model="query.Title"
              placeholder="نمونه عنوان گزارش : گزارش مهر ماه 1403"
              dir="ltr"
            />
          </div>
        </div>
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
      </div>
      <div class="row">
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
              <option value="1">پویا رضاییه</option>
              <option value="2">محمد باقری</option>
              <option value="3">توحید حقیقی</option>
              <option value="4">مهسا برجی</option>
              <option value="5">الهه ابراهیمی</option>
              <option value="6">ساناز محمد زاده</option>
              <option value="7">شکیلا کاظم پور</option>
              <option value="8">امیر مسعود صالحی</option>
              <option value="9">احسان درویشی</option>
              <option value="-1">همه</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="exampleFormControlSelect1">تاریخ شروع</label>
            <input v-model="query.StartDateTime" type="text" name="date-picker-shamsi-list" class="form-control text-left" dir="ltr">
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="exampleFormControlSelect1">تاریخ پایان</label>
            <input v-model="query.EndDateTime" type="text" name="date-picker-shamsi-list" class="form-control text-left" dir="ltr">
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
const user = useCookie("UserInfo");
const { public: { ticketingUrl }} = useRuntimeConfig();

const query = reactive({
  Title:"",
	ProjectId:0,
	Priority:0,
  RequestType:0,
  StatusId:0,
  DeveloperId:-1,
  StartDateTime:null,
  EndDateTime:null
});

onMounted(()=>{
  $('input[name="date-picker-shamsi-list"]').datepicker({
		dateFormat: "yy/mm/dd",
		showOtherMonths: true,
		selectOtherMonths: true,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true
	});
});

async function send(){
	if(query.Title!=""){
    try {
    var popout = window.open(`${ticketingUrl}/api/v1/downloadReport?title=`+ query.Title , '?prjectId'+query.ProjectId , '?priority'+query.Priority , '?requestType'+query.RequestType , '?statusId'+query.StatusId , '?developerId'+query.DeveloperId , '?statrtDateTime'+query.StartDateTime , '?endDateTime'+query.EndDateTime);
    window.setTimeout(function () {
      popout.close();
    }, 2000);
    toastr.success('با موفقیت دانلود شد');
  } catch (error) {
    console.log(error);
  }
}else{
  toastr.error('عنوان تیکت باید انتخاب شود');
}
}

const { data , error } = await useFetch(`${ticketingUrl}/api/v1/getProjects?roleId=${user.value.userRole}`);
</script>
