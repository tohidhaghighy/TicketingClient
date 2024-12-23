<template>
    <div class="card-body">
      <h6 class="card-title">ویرایش تیکت : {{ ticketId }} </h6>
        <div class="form-group">
          <label for="exampleFormControlInput1">عنوان تیکت </label>
          <input
            id="title"
            type="text"
            class="form-control text-left"
            v-model="formValues.title"
            placeholder="نمونه عنوان ورودی : مشکل در ثبت اطلاعات"
            dir="ltr"
          />
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label for="exampleFormControlSelect1">سامانه</label>
              <select id="projectId" v-model="formValues.projectId" class="form-control">
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
              <select id="requestTypeId" class="form-control" v-model="formValues.requestType">
                <option key="1" value="1">پشتیبانی</option>
                <option key="2" value="2">توسعه</option>
              </select>
            </div>
          </div>
          <div v-show="formValues.requestType == 2" class="col-md-4">
            <div class="form-group">
              <label for="exampleFormControlSelect1"> </label>
              <div class="checkbox-container">
                <label style="margin-left: 12px; margin-top: 10px;">آیا بر اساس برنامه زمانبندی می باشد؟ </label>
                <label class="switch">
                    <input id="isSchedule" type="checkbox" v-model="formValues.isSchedule" :true-value="1" :false-value="0">
                    <span class="slider round"></span>
                </label>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for="exampleFormControlSelect1">اولویت</label>
              <select id="priority" class="form-control" v-model="formValues.priority">
                <option key="1" value="1">بالا</option>
                <option key="2" value="2">متوسط</option>
                <option key="3" value="3">پایین</option>
              </select>
            </div>
          </div>
        </div>
  
        <div class="form-group">
          <label for="exampleFormControlTextarea1">متن پیام</label>
            <textarea class="form-control" v-model="formValues.text" id="editor-demo1"></textarea>
        </div>
        <div class="row">
          <div class="col-md-3 m-t-b-20">
            <button class="btn btn-primary btn-rounded" @click="send">ثبت تغیرات</button>
          </div>
        </div>
    </div>
  </template>
  
  <script setup>
  //#region imported data
  import { IsSchaduleEnum } from '~/models/enums/IsSchaduleEnum';
  //#endregion

  //#region variables
  const user = useCookie("UserInfo");
  const { public: { ticketingUrl }} = useRuntimeConfig();
  const route = useRoute();
  const tableData = ref
  const formValues = reactive({
    title:'',
    text:'',
    ticketId:0,
    priority:0,
    requestType:0,
    projectId:0,
    isSchedule:0,
  });
  const ticketId = +route.query.id;
  //#endregion

  //#region watch for requestType change
  watch(() => formValues.requestType, (value) => {
    formValues.requestType = +value;
  });
  //#endregion
  
  //#region Send function
  async function send(){
    formValues.ticketId = ticketId;

    if(formValues.requestType == 2){
      if (formValues.isSchedule == 1) {
        formValues.isSchedule = IsSchaduleEnum.yes;
      } else {
        formValues.isSchedule = IsSchaduleEnum.no;
      }
    }
    else{
      formValues.isSchedule = IsSchaduleEnum.Support;
    }

    const payload = {
      TicketId: formValues.ticketId,
      Title: formValues.title,
      Text: formValues.text,
      Priority: formValues.priority,
      RequestType: formValues.requestType,
      ProjectId: formValues.projectId,
      IsSchedule: formValues.isSchedule,
    };

    if(payload.Title!="" && payload.Text!="" && payload.Priority!="" && payload.RequestType!="" && payload.ProjectId!=""){
      try{
            await $fetch(`${ticketingUrl}/api/v1/EditeTicket`,{
              method:'POST',
              body : JSON.stringify(payload),
          });
      toastr.success('تیکت با موفقیت ویرایش شد');
      setTimeout(() => location.href='/', 2000);
    }catch(error){
            console.log(error);
    }
    }else{
    toastr.error('لطفا فیلد ها را پر کنید');
    }
  }
  //#endregion

  //#region Data required from the server side
  const { data , error } = await useFetch(`${ticketingUrl}/api/v1/getProjects?roleId=${user.value.userRole}`);
  const { data: ticketData } = await useFetch(`${ticketingUrl}/api/v1/getTicketMassages?TicketId=${route.query.id}`);
  tableData.value = ticketData.value;
  //#endregion

  //#region binding data
  formValues.title = tableData.value.ticketInfo.title;
  formValues.text = tableData.value.ticketInfo.text;
  formValues.ticketId = tableData.value.ticketInfo.ticketId;
  formValues.priority = tableData.value.ticketInfo.priority;
  formValues.requestType = tableData.value.ticketInfo.requestTypeId;
  formValues.projectId = tableData.value.ticketInfo.projectId;
  formValues.isSchedule = tableData.value.ticketInfo.isSchedule;
  //#endregion
  
  </script>
  