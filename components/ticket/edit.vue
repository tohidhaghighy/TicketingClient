<template>
    <div class="card-body">
      <h6 class="card-title">تیکت جدید</h6>
        <div class="form-group">
          <label for="exampleFormControlInput1">عنوان تیکت </label>
          <input
            id="title"
            type="text"
            class="form-control text-left"
            v-model="ticketData.value.ticketInfo.title"
            placeholder="نمونه عنوان ورودی : مشکل در ثبت اطلاعات"
            dir="ltr"
          />
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label for="exampleFormControlSelect1">سامانه</label>
              <select id="projectId" v-model="ticketData.value.ticketInfo.projectId" class="form-control">
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
              <select id="requestTypeId" class="form-control" v-model="ticketData.value.ticketInfo.requestTypeId">
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
                    <input id="isSchedule" type="checkbox" v-model="ticketData.value.ticketInfo.isSchedule" :true-value="1" :false-value="0">
                    <span class="slider round"></span>
                </label>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for="exampleFormControlSelect1">اولویت</label>
              <select id="priority" class="form-control" v-model="ticketData.value.ticketInfo.priority">
                <option key="1" value="1">بالا</option>
                <option key="2" value="2">متوسط</option>
                <option key="3" value="3">پایین</option>
              </select>
            </div>
          </div>
        </div>
  
        <div class="form-group">
          <label for="exampleFormControlTextarea1">متن پیام</label>
            <textarea class="form-control" v-model="ticketData.value.ticketInfo.text" id="editor-demo1"></textarea>
        </div>
        <div class="row">
          <div class="col-md-3 m-t-b-20">
            <button class="btn btn-primary btn-rounded" @click="send">ثبت تغیرات</button>
          </div>
        </div>
    </div>
  </template>
  
  <script setup>
  const user = useCookie("UserInfo");
  const { public: { ticketingUrl }} = useRuntimeConfig();
  const formValues = reactive({
    RequestType: document.getElementById('requestTypeId'),
  });
  const route = useRoute();
  
  watch(() => formValues.RequestType, (value) => {
    formValues.RequestType = value;
  });
  
  
  async function send(){
    const formData = new FormData();

    var title = document.getElementById('title');
    var text = document.getElementById('editor-demo1');
    var priority = document.getElementById('priority');
    var requestType = document.getElementById('requestTypeId');
    var projectId = document.getElementById('projectId');
    var isSchedule = document.getElementById('isSchedule');
    var ticketId = route.query.id;

    formData.append('TicketId', ticketId);

    formData.append('Title', title);
    formData.append('Text', text);
    formData.append('Priority', priority);
    formData.append('RequestType', requestType);
    formData.append('ProjectId', projectId);
    formData.append('IsSchedule' , isSchedule);
  
    if(title!="" && text!="" && priority!="" && requestType!="" && projectId!="" && isSchedule!="" && formValues.UserId>0){
      try{
            await $fetch(`${ticketingUrl}/api/v1/EditeTicket`,{
              method:'POST',
              body : formData
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
  
  const { data , error } = await useFetch(`${ticketingUrl}/api/v1/getProjects?roleId=${user.value.userRole}`);
//   const { ticket } = await useFetch(`${ticketingUrl}api/v1/getTicketMassages?ticketId=${route.query.id}`);
  // debugger;
  const { data: ticketData } = await useFetch(`${ticketingUrl}/api/v1/getTicketMassages?TicketId=${route.query.id}`);
  </script>
  