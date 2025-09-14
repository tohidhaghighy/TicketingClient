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
              <small class="message-item-date text-muted">
                {{ data.ticketInfo.date }}
              </small>
            </div>
            <div class="message-item message-item-date-border">
              <span class="badge">{{ data.ticketInfo.date }}</span>
            </div>
            <template v-for="message in data.messageList">
              <div class="message-item" style="min-width: 350px;margin-top: 20px; margin-bottom: 20px;" v-if="data.ticketInfo.userId==message.userId">
                <pre>{{ message.text }}</pre>
                <small class="message-item-date text-muted"> [ {{ data.ticketInfo.ticketNumber }} : شماره تیکت ] - {{message.date}} | {{ message.username }}</small>
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
              <div class="message-item outgoing-message" style="min-width: 350px;margin-top: 20px;" v-else >
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
          <div
            class="form-group input-container d-flex align-items-center justify-content-between"
            v-if="data.ticketInfo.statusId != UserStatus.Done"
          >
            <!-- Send message input -->
            <textarea
              v-model="messageInfo.text"
              class="form-control message-input"
              placeholder="متن خود را بنویسید . . ."
              @keydown.enter="handleEnter"
            ></textarea>

            <!-- Add attachment -->
            <div class="form-group file-upload-container">
              <label for="File" class="file-label">
                <i class="fa fa-paperclip"></i>
              </label>
              <input
                type="file"
                class="form-control-file file-input"
                id="File"
                name="File"
                @change="handleFileChange"
                accept="image/*,video/*,audio/*,.zip,.rar,.7zip,.pdf,.xml,.docx"
              />
              <span v-if="fileName" class="file-name">{{ fileName }}</span>
            </div>

            <!-- Send button -->
            <button type="button" class="btn btn-lg btn-gradient text-white send-button" @click="send">
              <i class="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
        <div class="chat-body-footer" style="direction: rtl">
          <!--Admins role-->
          <div class="row" v-if="data.ticketInfo.statusId != UserStatus.Done && data.ticketInfo.statusId != UserStatus.Reject && userrole.role != UserRole.normalUser">
            <div class="m-t-b-20" v-if="data.ticketInfo.statusId==UserStatus.inserted  && userrole.role != UserRole.admindir">
              <div class="d-flex justify-content-around">
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.inLine)">
                  اضافه کردن به صف پردازش
                </button>
                <button class="btn btn-danger btn-rounded" style="margin-right: 20px ;" @click="openPopup('reject')">رد کردن و بستن تیکت</button>
                <div v-if="isOpen && activePopup == 'reject'" class="popup-overlay" id="exampleModal1">
                  <div class="popup-content">
                    <h3>آیا مطمئن هستید؟</h3>
                    <p>آیا می‌خواهید تیکت را بسته و آن را رد کنید؟</p>
        
                    <!-- دکمه‌های تایید و لغو -->
                    <button @click="rejectConfirmAction" class="btn btn-success">تأیید</button>
                    <button @click="cancelAction" class="btn btn-danger">لغو</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="m-t-b-20" v-if="data.ticketInfo.statusId==UserStatus.inLine  && userrole.role != UserRole.admindir">
              <div class="d-flex justify-content-around">
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="virachangestatus(UserStatus.inProgress,data.ticketInfo.ticketTime,data.ticketInfo.developerId)">
                در حال انجام
                </button>
                <button class="btn btn-danger btn-rounded" style="margin-right: 20px ;" @click="openPopup('reject')">رد کردن و بستن تیکت</button>
                <div v-if="isOpen && activePopup == 'reject'" class="popup-overlay" id="exampleModal1">
                  <div class="popup-content">
                    <h3>آیا مطمئن هستید؟</h3>
                    <p>آیا می‌خواهید تیکت را بسته و آن را رد کنید؟</p>
        
                    <!-- دکمه‌های تایید و لغو -->
                    <button @click="rejectConfirmAction" class="btn btn-success">تأیید</button>
                    <button @click="cancelAction" class="btn btn-danger">لغو</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="m-t-b-20" v-if="data.ticketInfo.statusId==UserStatus.inProgress  && userrole.role != UserRole.admindir">
              <div class="d-flex justify-content-around">
                <button class="btn btn-success btn-rounded" style="margin-right: 20px ;" @click="openPopup('done')">تایید و بستن تیکت</button>
                <div v-if="isOpen && activePopup == 'done'" class="popup-overlay">
                    <div class="popup-content">
                      <h3>آیا مطمئن هستید؟</h3>
                      <p>آیا می‌خواهید تیکت را تایید کنید و ببندید؟</p>
          
                      <!-- دکمه‌های تایید و لغو -->
                      <button @click="doneConfirmAction" class="btn btn-success">تأیید</button>
                      <button @click="cancelAction" class="btn btn-danger">لغو</button>
                    </div>
                </div>
                <button class="btn btn-danger btn-rounded" style="margin-right: 20px ;" @click="openPopup('reject')">رد کردن و بستن تیکت</button>
                <div v-if="isOpen && activePopup == 'reject'" class="popup-overlay" id="exampleModal1">
                  <div class="popup-content">
                  <h3>آیا مطمئن هستید؟</h3>
                  <p>آیا می‌خواهید تیکت را بسته و آن را رد کنید؟</p>
        
                  <!-- دکمه‌های تایید و لغو -->
                  <button @click="rejectConfirmAction" class="btn btn-success">تأیید</button>
                  <button @click="cancelAction" class="btn btn-danger">لغو</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12" style="margin-top: 10px;">
              <div class="card">
                <div class="card-header" style="border-bottom: none; border-radius: 8px;">
                  <div class="d-flex justify-content-start gap-3 mb-3">
        
                    <!-- First Column: Ticket Time and Developer Selection -->
                    <div v-if="
                    (userrole.role == UserRole.adminsta) || 
                    (userrole.role == UserRole.adminina) || 
                    (userrole.role == UserRole.adminita) || 
                    (userrole.role == UserRole.TicketingAdmin)" class="col-md-6">
                      <div class="card">
                        <div class="card-header"
                        data-toggle="collapse"
                        data-target="#multiCollapseExample1"
                        aria-expanded="false"
                        aria-controls="multiCollapseExample1"
                        style="border: 1px solid #ddd; 
                        border-radius: 8px; 
                        border-bottom-left-radius: 0px; 
                        border-bottom-right-radius: 0px;"
                        >
                          <button class="btn btn-link">انجام دهنده</button>
                        </div>
                        <div class="collapse" id="multiCollapseExample1">
                          <div class="card card-body" style="border-top: none; border-radius: 8px; border-top-left-radius: 0px; border-top-right-radius: 0px;">
                            <div class="d-flex justify-content-between align-items-center">
                              <!-- Ticket Time Input -->
                              <div class="me-2 flex-grow-1">
                                <label class="form-label" for="input1" style="margin-right: 10px; margin-left: 10px;">زمان انجام تیکت :</label>
                                <input class="form-select rounded-input" type="text" v-model="data.ticketInfo.ticketTime" placeholder="زمان تیکت را وارد کنید">
                              </div>

                              <!-- Developer Select -->
                              <div class="me-2 flex-grow-1">
                                <label class="form-label" for="statusSelect" style="margin-right: 10px; margin-left: 10px;">متولی :</label>
                                <!-- <label class="form-label" style="margin-right: 10px; margin-left: 10px;">{{ data.ticketInfo.assignUserName }}</label> -->
                                <select class="form-select rounded-input" id="developerId" v-model="data.ticketInfo.assignUserId">
                                  <option
                                    v-for="item in developerList"
                                    :key="item.userId"
                                    :value="item.userId"
                                  >
                                    {{ item.name }}
                                  </option>
                                </select>
                              </div>

                              <!-- Save Button -->
                              <div class="flex-shrink-0">
                                <button type="button" class="btn btn-success btn-rounded" style="margin-right: 10px;" @click="savechange(data.ticketInfo.ticketTime, data.ticketInfo.assignUserId)">
                                  ذخیره
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Second Column: Ticket Flow -->
                    <div class="col-md-6">
                      <div class="card">
                        <div class="card-header" 
                        data-toggle="collapse"
                        data-target="#multiCollapseExample2"
                        aria-expanded="false"
                        aria-controls="multiCollapseExample2"
                        style="border: 1px solid #ddd; border-radius: 8px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;"
                        >
                          <button class="btn btn-link">گردش کار</button>
                        </div>
                        <div class="collapse" id="multiCollapseExample2">
                          <div class="card card-body" style="border-top: none; border-radius: 8px; border-top-left-radius: 0px; border-top-right-radius: 0px;">
                            <ticketFlow :ticketId="route.query.id" />
                          </div>
                        </div>
                      </div>
                    </div>
        
                  </div>
                </div>
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
import { ref } from 'vue';
import { useRequestTypeStore } from '@/stores/requestTypeStore'
const changeRequestTypeId = useRequestTypeStore();
changeRequestTypeId.showSwitchButton(false)
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
const { public: { ticketingUrl,ssoUrl }} = useRuntimeConfig();

const isOpen = ref(false);
const activePopup = ref(null);

const fileName = ref('');

function handleFileChange(event) {
  const file = event.target.files[0];
  fileName.value = file ? file.name : '';
}

function openPopup(popupType) {
  isOpen.value = true;
  activePopup.value = popupType;
}

function closePopup() {
  isOpen.value = false;
}

async function rejectConfirmAction() {
  await changestatus(UserStatus.rejected);
  closePopup();
}

async function doneConfirmAction() {
  await changestatus(UserStatus.done);
  closePopup();
}

function cancelAction() {
  toastr.warning("عملیات لغو شد");
  closePopup();
}

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
    fileName.value='';
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

//data need to send /api/v1/changeDevelopedBy
const developerInfo=reactive({
  AssignUserId:0,
  time:"0",
  ticketId:route.query.id,
  AssignUserName:""
});

const selectedDeveloperName = computed(() => {
  const dev = developerList.value.find(
    (d) => d.userId === data.value.ticketInfo.assignUserId
  );
  return dev ? dev.name : "";
});

async function savechange(time,developerId) {
  developerInfo.AssignUserId=developerId;
  developerInfo.time=time;
  developerInfo.AssignUserName = selectedDeveloperName
  if(time != null && time.trim(" ") != null)
  {
    try
    {
    await $fetch(`${ticketingUrl}/api/v1/changeDevelopedBy`,{
			method:'POST',
			body : developerInfo
		});

    console.log(developerInfo);

    toastr.success('با موفقیت ثبت شد');
    //refreshpage();
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
async function virachangestatus(status,time,developerId) {
  statusInfo.status=status;
  developerInfo.developerId=developerId;
  developerInfo.time=time;

  try
    {
		  await $fetch(`${ticketingUrl}/api/v1/changeStatus`,{
			method:'POST',
			body : statusInfo
		});

    toastr.success('با موفقیت ثبت شد');
    refreshpage();
    }
    catch(error)
    {
	      console.log(error);
    }
}

const roleInfo = reactive({
  roleId:0,
  userId:user.value.userId,
  ticketId:route.query.id
});


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

const { data: developerData, error: developerError } = await useFetch(
  `${ssoUrl}/GetUserRole?roleId=${user.value.userRole}`
);
const developerList = computed(() => developerData.value.data ?? []);

async function refreshpage(){
  setTimeout(() => location.href='/', 1000);
}

</script>