<template>
  <div class="card-body">
    <h6 class="card-title">جستجوی پیشرفته</h6>

      <div class="row">
          <div class="col-md-2">
            <div class="form-group">
              <label for="exampleFormControlInput1">شماره تیکت :</label>
              <input type="text" class="form-control text-left" v-model="query.TicketNumber" autocomplete="off" placeholder="نمونه شماره تیکت : 1403110001" />
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="exampleFormControlInput1">عنوان :</label>
              <input type="text" class="form-control text-left" v-model="query.Title" autocomplete="off" placeholder="نمونه عنوان تیکت : قبض"/>
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
              <input type="text" class="form-control text-left" v-model="query.Username" autocomplete="off" placeholder="نمونه نام کاربری : admintaz" />
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
              <label for="exampleFormControlSelect1">وضعیت تیکت :</label>
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
              <label for="exampleFormControlSelect1">سامانه :</label>
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
              <label for="exampleFormControlSelect1">انجام دهنده :</label>
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
              <label for="exampleFormControlSelect1">تاریخ شروع :</label>
              <input type="text" id="startDateTime" name="date-picker-shamsi-list" class="form-control text-left" dir="ltr" autocomplete="off">
            </div>
        </div>
        <div class="col-md-2">
            <div class="form-group">
              <label for="exampleFormControlSelect1">تاریخ پایان :</label>
              <input type="text" id="endDateTime" name="date-picker-shamsi-list" class="form-control text-left" dir="ltr" autocomplete="off">
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
        <table id="searchResult" class="table table-striped table-bordered" width="100%">
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
        </table>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  import jalaali from 'jalaali-js';
  
  const user = useCookie("UserInfo");
  const { public: { ticketingUrl }} = useRuntimeConfig();
  const { data , error } = await useFetch(`${ticketingUrl}/api/v1/getProjects?roleId=${user.value.userRole}`);
  const searchResult = reactive([]);
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
    $('#searchResult').DataTable({
      responsive: true,
      pageLength: 100,
      // lengthChange: false,
      // searching: false,
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
    document.onkeydown = async function(evt) {
      evt = evt || window.event;
      if (evt.key === 'Enter') {await send();}
    }; //For get search resualt with press Enter key
  })
  
  function convertShamsiToGregorian(shamsiDate) {
    // فرض کنید تاریخ ورودی به فرمت "yyyy/MM/dd" باشد
    const [year, month, day] = shamsiDate.split('/').map(Number);
    const { gy, gm, gd } = jalaali.toGregorian(year, month, day);
    
    return `${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`;
  }

  async function send()
  {
    var StartDateTime = document.getElementById('startDateTime').value;
    var EndDateTime = document.getElementById('endDateTime').value;
    
    try {
      const { data, error: fetchError } = await useFetch
      (
        `${ticketingUrl}/api/v1/search?ticketNumber=${query.TicketNumber}&title=${query.Title}&insertedRoleId=${query.InsertedRoleId}&username=${query.Username}&CurrentRoleId=${query.CurrentRoleId}&statusId=${query.StatusId}&projectId=${query.ProjectId}&requestType=${query.RequestType}&developerId=${query.DeveloperId}${StartDateTime==''?'':'&startDateTime='+convertShamsiToGregorian(StartDateTime)}${EndDateTime==''?'':'&endDateTime='+convertShamsiToGregorian(EndDateTime)}`       
      );

      if (!fetchError.value) //fetchError.value == null or empty
      {
        searchResult.value = data.value;
        
        // Destroy existing DataTable instance
        $('#searchResult').DataTable().destroy();
        // Reinitialize DataTable with updated data
        $('#searchResult').DataTable({
          data: searchResult.value,
          responsive: true,
          pageLength: 100,
          // lengthChange: false,
          //searching: false,
          order: [[3, 'desc']],
          columns: [
            { data: 'ticketRowNumber' },
            { data: 'ticketNumber' },
            { data: 'username' },
            { data: 'date' },
            { 
              data: 'requestType',
              render: (data) => (data === 1 ? 'پشتیبانی' : (data === 2 ? 'توسعه' : ''))
            },
            { 
              data: 'priority',
              render: (data) => (data === 1 ? 'بالا' : (data === 2 ? 'متوسط' : 'پایین'))
            },
            { 
              data: 'title',
              render: (data) => (data.length > 100 ? data.substring(0, 50) + "..." : data)
            },
            { data: 'project' },
            { 
              data: 'insertedRoleId',
              render: (data) => user.value.userRoleList.find(x => x.id == data)?.name || ''
            },
            { 
              data: 'currentRoleId',
              render: (data) => user.value.userRoleList.find(x => x.id == data)?.name || ''
            },
            { 
              data: 'statusId',
              render: (data, type, row) => {
                let statusClass = '';
                let statusText = '';
                switch (data) 
                {
                  case 1:
                    statusClass = 'text-done';
                    statusText = row.status;
                    break;
                  case 2:
                  case 3:
                  case 5:
                  case 6:
                  case 7:
                  case 8:
                    statusClass = 'text-inserted';
                    statusText = row.status;
                    break;
                  case 4:
                    statusClass = 'text-danger';
                    statusText = row.status;
                    break;
                  case 9:
                    statusClass = 'text-awaitingConfirmation';
                    statusText = row.status;
                    break;
                }
                return `<a class="${statusClass}">${statusText}</a>`;
              }
            },
            { 
              data: 'developerId',
              render: (data) => {
                const developers = {
                  1: 'پویا رضاییه',
                  2: 'محمد باقری',
                  3: 'توحید حقیقی',
                  4: 'مهسا برجی',
                  5: 'امیر مسعود صالحی',
                  6: 'شکیلا کاظم پور',
                  7: 'احسان درویشی',
                  8: 'الهه ابراهیمی',
                  9: 'ساناز محمد زاده',
                  10: 'تخصیص نشده'
                };
                return developers[data] || '';
              }
            },
            { data: 'ticketTime' },
            {
              data: 'id',
              render: (id) => {
                return `<a href="/ticket/detail?id=${id}" class="custom-link">مشاهده</a>`;
              }
            },
          ],
          language: {
            sEmptyTable: "هیچ داده ای در جدول وجود ندارد",
            sInfo: "نمایش _START_ تا _END_ از _TOTAL_ رکورد",
            sInfoEmpty: "نمایش 0 تا 0 از 0 رکورد",
            sInfoFiltered: "(فیلتر شده از _MAX_ رکورد)",
            sLoadingRecords: "در حال بارگزاری...",
            sProcessing: "در حال پردازش...",
            sSearch: "جستجو:",
            sZeroRecords: "رکوردی با این مشخصات پیدا نشد",
            oPaginate: {
              sFirst: "ابتدا",
              sLast: "انتها",
              sNext: "بعدی",
              sPrevious: "قبلی",
            },
          },
        });
      } 
      else 
      {
        console.error("Fetch error:", fetchError.value);
        error.value = fetchError.value;
      }
    } 
    catch (err) {
      console.error("An unexpected error occurred:", err);
    }
  }

  
</script>
  