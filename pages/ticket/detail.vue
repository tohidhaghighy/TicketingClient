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
              <p>شماره تیکت: {{ data.ticketInfo.ticketNumber }}</p>
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
                <small class="message-item-date text-muted"> {{ data.ticketInfo.ticketNumber }} : شماره تیکت | {{message.date}} | {{ message.username }}</small>
                <!---->
                <p v-if="message.haveFile==true">
                  <a id="downloadfilemessage" @click="downloadmessagefile(message.id)" class="btn btn-outline-light text-left align-items-center justify-content-center">
                    <i class="fa fa-download font-size-18 m-r-10"></i>
                    <div class="small">
                      <div class="mb-1">فایل برای دانلود</div>
                      <div class="font-size-8" dir="ltr" >برای دانلود کلیک کنید </div>
                    </div>
                  </a>
                </p>
                <!---->
              </div>
              <div class="message-item outgoing-message" style="min-width: 300px;margin-top: 20px;" v-else >
                {{message.text}}
                <small class="message-item-date text-muted"> {{message.date}} | {{ message.username }} </small>
                <!---->
                <div v-if="message.haveFile==true">
                  <a id="downloadfilemessage" @click="downloadmessagefile(message.id)" class="btn btn-outline-light text-left align-items-center justify-content-center">
                    <i class="fa fa-download font-size-18 m-r-10"></i>
                    <div class="small">
                      <div class="mb-1">فایل برای دانلود</div>
                      <div class="font-size-8" dir="ltr" >برای دانلود کلیک کنید </div>
                    </div>
                  </a>
                </div>
                <!---->
              </div>
            </template>
          </div>
        </div>
        <div class="chat-body-footer">
          <div class="form-group input-container d-flex align-items-center" v-if="data.ticketInfo.statusId != UserStatus.Done && data.ticketInfo.statusId != UserStatus.Reject">
            <input  type="text" v-model="messageInfo.text" class="form-control message-input" placeholder="متن خود را بنویسید . . ." v-on:keyup.enter="send"/>
            <!--Add attachment-->
            <div class="form-group">
            <label for="exampleFormControlFile1">ورودی فایل </label>
              <input type="file" class="form-control-file" id="File" name="File" accept="image/*,video/*,audio/*,.zip,.rar,.7zip,.pdf,.xml,.docx"/>
            </div>
            <!--Add attachment-->
            <button type="button" class="ml-3 btn btn-primary btn-floating" @click="send">
              <i class="fa fa-send"></i>
            </button>
          </div>
        </div>

        <div class="chat-body-footer" style="direction: rtl">
          <!--Admin Tazirat role-->
          <div class="row" v-if="data.ticketInfo.statusId != UserStatus.Done && data.ticketInfo.statusId != UserStatus.Reject && userrole.role == UserRole.AdminTaz ">
            <!--Inserted state-->
            <div class="m-t-b-20" v-if="data.ticketInfo.statusId==UserStatus.inserted">
              <div class="d-flex justify-content-around">
                <button type="button" class="btn btn-danger btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.rejected)">
                  رد کردن و بستن تیکت
                </button>
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="sendtogroup(UserRole.AdminVira)">
                  تایید و ارسال به ویرا
                </button>
              </div>
            </div>
            <!--Awaiting confirmation state-->
            <div class="m-t-b-20" v-if="data.ticketInfo.statusId==UserStatus.awaitingConfirmation">
              <div class="d-flex justify-content-around">
                <button type="button" class="btn btn-success btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.done)">
                  تایید و بستن تیکت
                </button>
                <button type="button" class="btn btn-danger btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.rejected)">
                  رد کردن و بستن تیکت
                </button>
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="sendtogroup(UserRole.AdminVira)">
                  تایید و ارسال به ویرا
                </button>
              </div>
            </div>
            <!--Send to tazirat state-->
            <div class="m-t-b-20" v-if="data.ticketInfo.statusId==UserStatus.sendtotaz">
              <div class="d-flex justify-content-around">
                <button type="button" class="btn btn-danger btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.rejected)">
                  رد کردن و بستن تیکت
                </button>
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="sendtogroup(UserRole.AdminVira)">
                  تایید و ارسال به ویرا
                </button>
              </div>
            </div>
          </div>
          <!--Admin Vira role-->
          <div class="row" v-if="data.ticketInfo.statusId != UserStatus.Done && data.ticketInfo.statusId != UserStatus.Reject && userrole.role==UserRole.AdminVira">
            <!--Send to vira state-->
            <div class="m-t-b-20" v-if="data.ticketInfo.statusId==UserStatus.sendtovira">
              <div class="d-flex justify-content-around">
                <button type="button" class="btn btn-danger btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.rejected)">
                  رد کردن و بستن تیکت
                </button>
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.inLine)">
                  اضافه کردن به صف پردازش
                </button>
              </div>
            </div>
            <!--In line state-->
            <div class="m-t-b-20" v-if="data.ticketInfo.statusId==UserStatus.inLine">
              <div class="d-flex justify-content-around">
                <button type="button" class="btn btn-danger btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.rejected)">
                  رد کردن و بستن تیکت
                </button>
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.inProgress)">
                  در حال انجام
                </button>
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="sendtogroup(UserRole.AdminTaz)">
                  رد کردن به دلیل اطلاعات ناکافی
                </button>
              </div>
            </div>
            <!--In progress state-->
            <div class="m-t-b-20" v-if="data.ticketInfo.statusId==UserStatus.inProgress">
              <div class="d-flex justify-content-around">
                <button type="button" class="btn btn-danger btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.rejected)">
                  رد کردن و بستن تیکت
                </button>
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.awaitingConfirmation)">
                  انجام شد در انتظار تایید
                </button>
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="sendtogroup(UserRole.AdminTaz)">
                  رد کردن به دلیل اطلاعات ناکافی
                </button>
              </div>
            </div>
            <!--Rejected state-->
            <div class="" v-if="data.ticketInfo.statusId==UserStatus.rejected">
              <div class="d-flex justify-content-around">
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="sendtogroup(UserRole.AdminVira)">
                  تغییر وضعیت به ارجاع به ویرا
                </button>
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="sendtogroup(UserRole.AdminTaz)">
                  تغییر وضعیت به برگشت از ویرا
                </button>
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.inserted)">
                  تغییر وضعیت به جدید
                </button>
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.inLine)">
                  تغییر وضعیت به در صف انجام
                </button>
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.inProgress)">
                  تغییر وضعیت به ارجاع به درحال انجام
                </button>
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.awaitingConfirmation)">
                  تغییر وضعیت به انجام شد در انتظار تایید
                </button>
              </div>
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
  username:user.value.username,
  file : null
});

async function send() {

  const fileInput = document.querySelector('#File');
  const formData = new FormData();
  formData.append('text', messageInfo.text);
  formData.append('userId', messageInfo.userId);
  formData.append('ticketId', messageInfo.ticketId);
  formData.append('username', messageInfo.username);
  formData.append('file', fileInput.files[0]);

  if(messageInfo.text!="" || formData.get('file')!=null){
    try{
		  await $fetch(`${ticketingUrl}/api/v1/addMassage`,{
			method:'POST',
			body : formData
		});
    toastr.success('پیام با موفقیت ارسال شد');
    document.querySelector('#File').value = null;
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
}

const statusInfo=reactive({
  status:0,
  userId:user.value.userId,
  ticketId:route.query.id
});

async function changestatus(status) {
  statusInfo.status=status;
  await send();
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
  await send();
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

async function downloadmessagefile(messageId) {
  try {
    var popout = window.open(`${ticketingUrl}/api/v1/downloadMassageFile?massageId=`+messageId);
    window.setTimeout(function () {
      popout.close();
    }, 2000);
    toastr.success('با موفقیت دانلود شد');
  } catch (error) {
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