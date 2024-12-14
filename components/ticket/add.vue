<template>
  <div class="card-body">
    <h6 class="card-title">تیکت جدید</h6>
      <div class="form-group">
        <label for="exampleFormControlInput1">عنوان تیکت </label>
        <input
          type="text"
          class="form-control text-left"
          v-model="formValues.Title"
          placeholder="نمونه عنوان ورودی : مشکل در ثبت اطلاعات"
          dir="ltr"
        />
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="exampleFormControlSelect1">سامانه</label>
            <select v-model="formValues.ProjectId" class="form-control">
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
        <div class="col-md-4">
          <div class="form-group">
            <label for="exampleFormControlSelect1">نوع درخواست :</label>
            <select id="requestType" class="form-control" v-model="formValues.RequestType">
              <option key="1" value="1">پشتیبانی</option>
              <option key="2" value="2">توسعه</option>
            </select>
          </div>
        </div>
        <div v-show="formValues.RequestType == 2" class="col-md-4">
          <div class="form-group">
            <label for="exampleFormControlSelect1"> </label>
            <div class="checkbox-container">
              <label style="margin-left: 12px; margin-top: 10px;">آیا بر اساس برنامه زمانبندی می باشد؟ </label>
              <label class="switch">
                  <input id="IsSchedule" type="checkbox" v-model="formValues.IsSchedule" :true-value="1" :false-value="0">
                  <span class="slider round"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="exampleFormControlSelect1">اولویت</label>
            <select class="form-control" v-model="formValues.Priority">
              <option key="1" value="1">بالا</option>
              <option key="2" value="2">متوسط</option>
              <option key="3" value="3">پایین</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="exampleFormControlTextarea1">متن پیام</label>
          <textarea class="form-control" v-model="formValues.Text" id="editor-demo1"></textarea>
      </div>
      <div class="form-group">
        <label for="exampleFormControlFile1">ورودی فایل </label>
        <input type="file" class="form-control-file" id="File" name="File" accept="image/*,video/*,audio/*,.zip,.rar,.7zip,.pdf,.xml,.docx"/>
      </div>

      <div class="row">
        <div class="col-md-3 m-t-b-20">
          <button class="btn btn-primary btn-rounded" @click="send">ثبت</button>
        </div>
      </div>
  </div>
</template>

<script setup>
import { IsSchaduleEnum } from '~/models/enums/IsSchaduleEnum';

const user = useCookie("UserInfo");
const { public: { ticketingUrl }} = useRuntimeConfig();
const formValues = reactive({
	ProjectId : 0,
	Title :'',
	Text:'',
	Priority:1,
  UserId : user.value.userId,
  RoleId : user.value.userRole,
  Username : user.value.username,
  RequestType: 1,
  IsSchedule: 1
});

watch(() => formValues.RequestType, (value) => {
  formValues.RequestType = value;
});


async function send(){
  const fileInput = document.querySelector('#File');
  const formData = new FormData();
  formData.append('RoleId', formValues.RoleId);
  formData.append('ProjectId', formValues.ProjectId);
  formData.append('Title', formValues.Title);
  formData.append('Text', formValues.Text);
  formData.append('Priority', formValues.Priority);
  formData.append('UserId', formValues.UserId);
  formData.append('Username', formValues.Username);
  formData.append('RequestType', formValues.RequestType);
  formData.append('file', fileInput.files[0]);
  formData.append('IsSchedule' , formValues.IsSchedule);

	if(formValues.Text!="" && formValues.Title!="" && formValues.ProjectId>0 && formValues.UserId>0){
    try{
		  await $fetch(`${ticketingUrl}/api/v1/addTicket`,{
			method:'POST',
			body : formData
		});
    toastr.success('تیکت با موفقیت ثبت شد');
    setTimeout(() => location.href='/', 2000);
  }catch(error){
	      console.log(error);
  }
}else{
  toastr.error('سامانه و عنوان تیکت باید انتخاب شود');
}
}

const { data , error } = await useFetch(`${ticketingUrl}/api/v1/getProjects?roleId=${user.value.userRole}`);
</script>
