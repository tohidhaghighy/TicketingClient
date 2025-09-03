<template>
  <div class="card-body">
    <h6 class="card-title">گزارش گیری</h6>
      
      <div class="row">
        <div class="custom-col col">
          <div class="form-group">
            <label for="exampleFormControlSelect1">سامانه :</label>
            <select id='ProjectId' class="form-control js-example-basic-multiple" multiple>
              <option
                v-for="item in data"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="custom-col col">
          <div class="form-group">
            <label for="exampleFormControlSelect1">اولویت :</label>
            <select id="Priority" class="form-control js-example-basic-multiple" multiple>
              <option key="1" value="1">بالا</option>
              <option key="2" value="2">متوسط</option>
              <option key="3" value="3">پایین</option>
            </select>
          </div>
        </div>
        <div class="custom-col col">
          <div class="form-group">
            <label for="exampleFormControlSelect1">نوع درخواست :</label>
            <select id='RequestType' class="form-control js-example-basic-multiple" multiple>
              <option key="1" value="1">پشتیبانی</option>
              <option key="2" value="2">توسعه</option>
            </select>
          </div>
        </div>
        <div class="custom-col col">
            <div class="form-group">
              <label>بر اساس برنامه زمانبندی می باشد؟ </label>
              <select id='IsSchadule' class="form-control js-example-basic-multiple" multiple :disabled="IsSchaduleChange">
                <option key="1" value=1>بله</option>
                <option key="2" value=0>خیر</option>
              </select>
            </div>
        </div>
        <div class="custom-col col">
          <div class="form-group">
            <label for="exampleFormControlSelect1">وضعیت تیکت :</label>
            <select id='StatusId' class="form-control js-example-basic-multiple" multiple>
              <option value="2">جدید</option>
              <option value="7">در صف انجام پردازش</option>
              <option value="8">در حال انجام</option>
              <option value="1">انجام شده</option>
              <option value="4">ردشده</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="custom-col col">
          <div class="form-group">
            <label for="exampleFormControlSelect1">انجام دهنده :</label>
            <select id="DeveloperId" class="form-control js-example-basic-multiple" multiple>
              <option value="1">پویا رضائیه</option>
              <option value="2">محمد باقری</option>
              <option value="3">توحید حقیقی</option>
              <option value="4">مهسا برجی</option>
              <option value="8">الهه ابراهیمی</option>
              <option value="9">ساناز محمد زاده</option>
              <option value="6">شکیلا کاظم پور</option>
              <option value="5">امیر مسعود صالحی</option>
              <option value="7">احسان درویشی</option>
            </select>
          </div>
        </div>
        <div class="custom-col col">
            <div class="form-group">
              <label for="exampleFormControlSelect1">از تاریخ ایجاد تیکت:</label>
              <input type="text" id="InsertStartDateTime" name="date-picker-shamsi-list" class="form-control text-left" dir="ltr" autocomplete="off">
            </div>
        </div>
        <div class="custom-col col">
            <div class="form-group">
              <label for="exampleFormControlSelect1">تا تاریخ ایجاد تیکت:</label>
              <input type="text" id="InsertEndDateTime" name="date-picker-shamsi-list" class="form-control text-left" dir="ltr" autocomplete="off">
            </div>
        </div>
        <div class="custom-col col">
            <div class="form-group">
              <label for="exampleFormControlSelect1">از تاریخ تحویل تیکت:</label>
              <input type="text" id="CloseStartDateTime" name="date-picker-shamsi-list" class="form-control text-left" dir="ltr" autocomplete="off">
            </div>
        </div>
        <div class="custom-col col">
            <div class="form-group">
              <label for="exampleFormControlSelect1">تا تاریخ تحویل تیکت:</label>
              <input type="text" id="CloseEndDateTime" name="date-picker-shamsi-list" class="form-control text-left" dir="ltr" autocomplete="off">
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
//#region imported item
import jalaali from 'jalaali-js';
//#endregion

//#region variables
const user = useCookie("UserInfo");
const { public: { ticketingUrl }} = useRuntimeConfig();
var IsSchaduleChange = ref(true);
//#endregion

//#region onMounted
onMounted(() => {
  $('input[name="date-picker-shamsi-list"]').datepicker({
		dateFormat: "yy/mm/dd",
		showOtherMonths: true,
		selectOtherMonths: true,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true
	});
  document.onkeydown = async function(evt) {
      evt = evt || window.evt;
      if (evt.shiftKey && evt.key === 'Enter') {await send();}
  }; //For get search resualt with press Enter key
  $('.js-example-basic-multiple').select2({
      placeholder: '                           انتخاب کنید',
      allowClear: true
  });
  // Update placeholder with number of selected items
  $('.js-example-basic-multiple').on('change', function () {
    const selectedCount = $(this).val() ? $(this).val().length : 0;
    if(selectedCount>0){
      $(this).next('.select2').find('.select2-selection__rendered').text(`${selectedCount} : تعداد انتخاب شده`);
    }
    else{
      $(this).next('.select2').find('.select2-selection__rendered').text('موردی انتخاب نشده');
    }

    var RequestTypeData = $('#RequestType').select2('data').map(option => option.id);
    IsSchaduleChange.value = true;

    RequestTypeData.forEach(element => {
      if(RequestTypeData.length == 1 && element == "2"){
        IsSchaduleChange.value = false;
        const SCount = $('#IsSchadule').val() ? $('#IsSchadule').val().length : 0;
        if(SCount>0)
        {
          $('#IsSchadule').next('.select2').find('.select2-selection__rendered').text(`${selectedCount} : تعداد انتخاب شده`);
        }
        else{
          $('#IsSchadule').val(null);
          $('#IsSchadule').next('.select2').find('.select2-selection__rendered').text('موردی انتخاب نشده');
        }
      }
      else{
        $('#IsSchadule').val(null);
        $('#IsSchadule').next('.select2').find('.select2-selection__rendered').text('موردی انتخاب نشده');
      }
    });
  });
})
//#endregion

//#region convertShamsiToGregorian function
function convertShamsiToGregorian(shamsiDate) {
    // فرض کنید تاریخ ورودی به فرمت "yyyy/MM/dd" باشد
    const [year, month, day] = shamsiDate.split('/').map(Number);
    const { gy, gm, gd } = jalaali.toGregorian(year, month, day);
    
    return `${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`;
}
//#endregion

//#region Send function
async function send(){
  //#region getTime
  var InsertStart = document.getElementById('InsertStartDateTime').value;
  var InsertEnd = document.getElementById('InsertEndDateTime').value;
  var CloseStartD = document.getElementById('CloseStartDateTime').value;
  var CloseEnd = document.getElementById('CloseEndDateTime').value;
  //#endregion

  //#region getValues
  var Priority = $('#Priority').select2('data').map(option => option.id);
  var StatusId = $('#StatusId').select2('data').map(option => option.id);
  var ProjectId = $('#ProjectId').select2('data').map(option => option.id);
  var RequestType = $('#RequestType').select2('data').map(option => option.id);
  var DeveloperId = $('#DeveloperId').select2('data').map(option => option.id);
  var IsSchadule = $('#IsSchadule').select2('data').map(option => option.id);
  //#endregion
  RequestType.forEach(requestType => {
    if(requestType == 1){
      IsSchadule = '';
    }
  });

	
  try {
    var popout = window.open(`${ticketingUrl}/api/v1/downloadReport?projectId=${ProjectId}&priority=${Priority}&requestType=${RequestType}&statusId=${StatusId}&developerId=${DeveloperId}${InsertStart==''?'':'&insertStartDateTime='+convertShamsiToGregorian(InsertStart)}${InsertEnd==''?'':'&insertEndDateTime='+convertShamsiToGregorian(InsertEnd)}${CloseStartD==''?'':'&closeStartDateTime='+convertShamsiToGregorian(CloseStartD)}${CloseEnd==''?'':'&closeEndDateTime='+convertShamsiToGregorian(CloseEnd)}&IsSchadule=${IsSchadule}`);
    window.setTimeout(function () {
      popout.close();
    }, 2000);
    toastr.success('با موفقیت دانلود شد');
  }
  catch (error) {
    console.log(error);
  }
}
//#endregion

//#region get project api
const { data , error } = await useFetch(`${ticketingUrl}/api/v1/getProjects?roleId=${user.value.userRole}`);
//#endregion
</script>
