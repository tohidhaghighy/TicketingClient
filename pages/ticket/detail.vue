<style>
.chat-app-wrapper .chat-app .chat-body .chat-body-messages .message-items .message-item.outgoing-message {
	background: #5867dd;
	color: white;
	margin-right: auto;
}
pre{
  word-wrap: break-word;
  font-family: 'primary-font', segoe ui, tahoma;
  font-weight: bold;
  font-size: 14px;
  white-space: pre-wrap; /* Preserve whitespace and wrap text */
  direction: rtl; /* Set default direction to RTL */
  unicode-bidi: plaintext; /* Handle mixed direction text */
}
.m-color{
	color: white;
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
                <a id="downloadfile" @click="downloadfile(data.ticketInfo.id)"class="btn btn-outline-light text-left align-items-center justify-content-center">
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
                <pre>{{ message.text }}</pre>
                <small class="message-item-date text-muted"> {{ data.ticketInfo.ticketNumber }} : شماره تیکت | {{message.date}} | {{ message.username }}</small>
                <!--download attachmet file-->
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
                <pre class="m-color">{{ message.text }}</pre>
                <small class="message-item-date text-muted"> {{message.date}} | {{ message.username }} </small>
                <!--download attachmet file-->
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
          <div class="form-group input-container d-flex align-items-center" v-if="data.ticketInfo.statusId != UserStatus.Done">
            <!--Send with enter & go one line down with enter+shift-->
            <textarea v-model="messageInfo.text" class="form-control message-input" placeholder="متن خود را بنویسید . . ." @keydown.enter="handleEnter"></textarea>
            <!--Add attachment-->
            <div class="form-group" style="margin: 10px;">
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
          <div class="row" v-if="data.ticketInfo.statusId != UserStatus.Done && userrole.role==UserRole.AdminVira">
            <!--Send to vira state-->
            <div class="m-t-b-20" v-if="data.ticketInfo.statusId==UserStatus.sendtovira">
              <div class="d-flex justify-content-around">
                <button type="button" class="btn btn-danger btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.rejected)">
                  رد کردن و بستن تیکت
                </button>
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.inLine, developerInfo.developerId)">
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
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="virachangestatus(UserStatus.inProgress, developerInfo.developerId)">
                  در حال انجام
                </button>
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="virasendtogroup(UserRole.AdminTaz, developerInfo.developerId, developerInfo.developerTime)">
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
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="virasendtogroup(UserRole.AdminTaz, developerInfo.developerId, developerInfo.developerTime)">
                  رد کردن به دلیل اطلاعات ناکافی
                </button>
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="virafinalchangestatus(UserStatus.awaitingConfirmation, developerInfo.developerId, developerInfo.developerTime)">
                  انجام شد در انتظار تایید
                </button>
              </div>
            </div>
            <!--Rejected state-->
            <div class="m-t-b-20" v-if="data.ticketInfo.statusId==UserStatus.rejected">
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

            <!-- v-if="data.ticketInfo.statusId=!UserStatus.rejected" -->
            <div class="col-md-12" style="margin-top: 10px;">
              <label class="col-md-1" for="input1">زمان انجام تیکت</label>
              <input class="col-md-2" id="ticketTime" type="text" v-model="developerInfo.developerTime"  placeholder="زمان تیکت را وارد کنید" style="border: 1px solid black;">
              <label class="col-md-1" for="statusSelect">برنامه نویس</label>
              <select class="col-md-2" id="developerId" v-model="developerInfo.developerId" >
                <option :value="DeveloperId.p_rezayeh">پویا رضاییه</option>
                <option :value="DeveloperId.m_bagheri">محمد باقری</option>
                <option :value="DeveloperId.t_hagigi">توحید حقیقی</option>
                <option :value="DeveloperId.m_borji">مهسا برجی</option>
                <option :value="DeveloperId.m_salehi">امیر مسعود صالحی</option>
                <option :value="DeveloperId.Sh_kazempour">شکیلا کاظم پور</option>
                <option :value="DeveloperId.e_darvishi">احسان درویشی</option>
                <option :value="DeveloperId.unknown">برنامه نویس را انتخاب کنید</option>
              </select>
              <button type="button" class="btn btn-success btn-rounded" style="margin-right: 20px ;" @click="savechange(developerInfo.developerId, developerInfo.developerTime)">
                  ذخیره
                </button>
            </div>
            <!---->

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {UserRole} from '../../models/enums/userRole'
import {UserStatus} from '../../models/enums/userStatus'
import {DeveloperId} from '../../models/enums/developerId'

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
  text:"",
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

async function handleEnter(event) {
  if (!event.shiftKey) {
    await send();
    }
  if (event.shiftKey && event.key === 'Enter') {
    messageInfo.text == '\n';
  }
}
//@keydown.shift.enter.prevent="messageInfo.text += '\n'"

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

async function savechange(developerId,developerTime) {
  console.log(developerTime);

  developerInfo.developerId=developerId;
  developerInfo.developerTime=developerTime;

  console.log(developerInfo.developerTime);
  console.log(developerInfo.developerId);
  if(developerInfo.developerTime != null && developerInfo.developerId > 0)
  {
    debugger;
    try
    {
    await $fetch(`${ticketingUrl}/api/v1/changeDevelopedBy`,{
			method:'POST',
			body : developerInfo
		});

    toastr.success('با موفقیت ثبت شد');
    refreshpage();
    }
    catch(error)
    {
	      console.log(error);
    }
  }
  else
  {
    toastr.error('لطفا زمان تیکت و توسعه دهنده را وارد کنید');
  }
}

//data need to send /api/v1/changeDevelopedBy
const developerInfo=reactive({
  developerId:0,
  developerTime:"0",
  ticketId:route.query.id
});

//virafinalchangestatus need to fill ticketTime and developerId
async function virafinalchangestatus(status,developerId,ticketTime) {
  developerInfo.developerId=developerId;
  developerInfo.developerTime=ticketTime;
  statusInfo.status=status;
  if(ticketTime != null && ticketTime.trim() !== '' && developerId > 0)
  {
    try
    {
		  await $fetch(`${ticketingUrl}/api/v1/changeStatus`,{
			method:'POST',
			body : statusInfo
		});
    await $fetch(`${ticketingUrl}/api/v1/changeDevelopedBy`,{
			method:'POST',
			body : developerInfo
		});

    toastr.success('با موفقیت ثبت شد');
    refreshpage();
    }
    catch(error)
    {
	      console.log(error);
    }
  }
  else
  {
    toastr.error('لطفا زمان تیکت و توسعه دهنده را وارد کنید');
  }
}

//virachangestatus need to fill developerId
async function virachangestatus(status,developerId) {
  statusInfo.status=status;
  developerInfo.developerId=developerId;
  if(developerId>0)
  {
    try
    {
		  await $fetch(`${ticketingUrl}/api/v1/changeStatus`,{
			method:'POST',
			body : statusInfo
		});
    await $fetch(`${ticketingUrl}/api/v1/changeDevelopedBy`,{
			method:'POST',
			body : developerInfo
		});

    toastr.success('با موفقیت ثبت شد');
    refreshpage();
    }
    catch(error)
    {
	      console.log(error);
    }
  }
  else
  {
    toastr.error('لطفا توسعه دهنده را انتخاب کنید');
  }
}

//virasendtogroup need to fill roleId,developerId and ticketTime
async function virasendtogroup(roleId,developerId,ticketTime) {
  roleInfo.roleId=roleId;
  developerInfo.developerId=developerId;
  developerInfo.developerTime=ticketTime;
  if(ticketTime != null && ticketTime.trim() !== '' && developerId > 0)
  {
    try
    {
		  await $fetch(`${ticketingUrl}/api/v1/changeRole`,{
			method:'POST',
			body : roleInfo
		});
    await $fetch(`${ticketingUrl}/api/v1/changeDevelopedBy`,{
			method:'POST',
			body : developerInfo
		});

    toastr.success('با موفقیت ثبت شد');
    refreshpage();
    }
    catch(error)
    {
	      console.log(error);
    }
  }
  else
  {
    toastr.error('لطفا زمان تیکت و توسعه دهنده را وارد کنید');
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