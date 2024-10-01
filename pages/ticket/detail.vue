<style>
.chat-app-wrapper .chat-app .chat-body .chat-body-messages .message-items .message-item.outgoing-message {
	background: #5867dd;
	color: white;
	margin-right: auto;
}
</style>
<template>
  <div class="card chat-app-wrapper">
    <div class="row chat-app">
      <div class="col-xl-12 col-md-12 chat-body">
        <div class="chat-body-messages" id="chatbody">
          <div class="message-items">
            <div class="message-item">
              <p>عنوان تیکت : {{ data.ticketInfo.title }}</p>
              <p v-if="data.ticketInfo.priority == 1">اولویت : بالا</p>
              <p v-else-if="data.ticketInfo.priority == 2">اولویت : متوسط</p>
              <p v-else>اولویت : پایین</p>
              <p>سامانه : {{ data.ticketInfo.project }}</p>
              <p>متن : {{ data.ticketInfo.text }}</p>
              <p v-if="data.ticketInfo.haveFile==true">
                <a id="downloadfile" @click="downloadfile(data.ticketInfo.id)"
                  class="btn btn-outline-light text-left align-items-center justify-content-center"
                >
                  <i class="fa fa-download font-size-18 m-r-10"></i>
                  <div class="small">
                    <div class="mb-2">فایل برای دانلود</div>
                    <div class="font-size-13" dir="ltr">
                      برای دانلود کلیک کنید
                    </div>
                  </div>
                </a>
              </p>
              <small class="message-item-date text-muted">{{
                data.ticketInfo.date
              }}</small>
            </div>
            <div class="message-item message-item-date-border">
              <span class="badge">{{ data.ticketInfo.date }}</span>
            </div>
            <template v-for="message in data.messageList">
              <div class="message-item" style="min-width: 300px;margin-top: 20px;" v-if="data.ticketInfo.userId==message.userId">
                {{message.text}}
                <small class="message-item-date text-muted">{{message.date}} - {{ message.username }}</small>
              </div>
              <div class="message-item outgoing-message" style="min-width: 300px;margin-top: 20px;" v-else >
                {{message.text}}
                <small class="message-item-date text-muted">{{message.date}} - {{ message.username }}</small>
              </div>
            </template>
          </div>
        </div>
        <div class="chat-body-footer">
          <div class="d-flex align-items-center">
            <input type="text" v-model="messageInfo.text" class="form-control" placeholder="متن خود را بنویسید . . ." v-on:keyup.enter="send"/>
            <div class="d-flex" v-if="data.ticketInfo.statusId != UserStatus.Done && data.ticketInfo.statusId != UserStatus.Reject">
              <button type="button" class="ml-3 btn btn-primary btn-floating" @click="send">
                <i class="fa fa-send"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="chat-body-footer" style="direction: ltr">
          <div class="row" v-if="data.ticketInfo.statusId != UserStatus.Done && data.ticketInfo.statusId != UserStatus.Reject && (userrole.role == UserRole.AdminTaz || userrole.role==UserRole.AdminVira)">
            <div class="col-md-3 m-t-b-20" v-if="userrole.role==UserRole.AdminTaz">
              <button type="button" class="btn btn-primary btn-rounded" @click="sendtogroup(UserRole.AdminVira)">
                تایید و ارسال به ویرا
              </button>
            </div>

            <div class="col-md-3 m-t-b-20" v-if="userrole.role==UserRole.AdminVira">
              <button type="button" class="btn btn-success btn-rounded" @click="sendtogroup(UserRole.AdminTaz)">
                تایید و ارسال به ادمین سامانه
              </button>
            </div>

            <div class="col-md-3 m-t-b-20">
              <button type="button" class="btn btn-primary btn-rounded" @click="changestatus(UserStatus.Done)">
                تایید و بستن تیکت
              </button>
            </div>

            <div class="col-md-3 m-t-b-20">
              <button type="button" class="btn btn-danger btn-rounded" @click="changestatus(UserStatus.Reject)">
                رد کردن و بستن تیکت
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {UserRole} from '../../models/enums/userRole'
import {UserStatus} from '../../models/enums/userStatus'

definePageMeta({
  layout: "panel",
});
toastr.options = {
		timeOut: 3000,
		progressBar: true,
		showMethod: "slideDown",
		hideMethod: "slideUp",
		showDuration: 200,
		hideDuration: 200
};


const route = useRoute();
const user = useCookie("UserInfo");
const { public: { ticketingUrl }} = useRuntimeConfig();

const userrole = reactive({
  role: user.value.userRole
});

const messageInfo = reactive({
  text:'',
  userId:user.value.userId,
  ticketId:route.query.id,
  username:user.value.username
});

async function send() {
  try{
		  await $fetch(`${ticketingUrl}/api/v1/addMassage`,{
			method:'POST',
			body : messageInfo
		});
    toastr.success('پیام با موفقیت ارسال شد');
    messageInfo.text='';
    setTimeout(() => {
      refresh().then(()=>{
        let divElement = document.getElementById('chatbody');
        divElement.scrollTop = divElement.scrollHeight;
      });
    } , 1000);
  }catch(error){
	      console.log(error);
  }
}

const statusInfo=reactive({
  status:0,
  userId:user.value.userId,
  ticketId:route.query.id
});

async function changestatus(status) {
  statusInfo.status=status;
	try{
		  await $fetch(`${ticketingUrl}/api/v1/changeStatus`,{
			method:'POST',
			body : statusInfo
		});
    toastr.success('با موفقیت ثبت شد');
    refreshpage();
  }catch(error){
	      console.log(error);
  }
}

const roleInfo = reactive({
  roleId:0,
  userId:user.value.userId,
  ticketId:route.query.id
});

async function sendtogroup(roleId) {
  roleInfo.roleId=roleId;
	try{
		  await $fetch(`${ticketingUrl}/api/v1/changeRole`,{
			method:'POST',
			body : roleInfo
		});
    toastr.success('با موفقیت ارسال شد');
    refreshpage();
  }catch(error){
	      console.log(error);
  }
}

async function downloadfile(id){
  try{
      var popout = window.open(`${ticketingUrl}/api/v1/downloadFile?ticketId=`+id);
      window.setTimeout(function(){
         popout.close();
      }, 2000);
    toastr.success('با موفقیت دانلود شد');
  }catch(error){
	      console.log(error);
  }
}

onMounted(async () => {
        let divElement = document.getElementById('chatbody');
        divElement.scrollTop = divElement.scrollHeight;
});

const { data: data, error , refresh } = await useFetch(
  `${ticketingUrl}/api/v1/getTicketMassages?TicketId=${route.query.id}`
);

async function refreshpage(){
  setTimeout(() => location.href='/', 1000);
}

</script>
