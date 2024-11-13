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
          <!--Admin Tazirat role-->
          <div class="row" v-if="data.ticketInfo.statusId != UserStatus.Done && data.ticketInfo.statusId != UserStatus.Reject && userrole.role == UserRole.AdminTaz ">
            <!--Inserted state-->
            <div class="m-t-b-20" v-if="data.ticketInfo.statusId==UserStatus.inserted">
              <div class="d-flex justify-content-around">
                <button class="btn btn-approve-sendtovira btn-rounded" style="margin-right: 20px ;" @click="openPopup('sendToVira')">تایید و ارسال به ویرا</button>
                <div v-if="isOpen && activePopup == 'sendToVira'" class="popup-overlay">
                  <div class="popup-content">
                    <h3>آیا مطمئن هستید؟</h3>
                    <p>آیا می‌خواهید تیکت به ویرا ارسال شود؟</p>
        
                    <!-- دکمه‌های تایید و لغو -->
                    <button @click="sendTogroupViraConfirmAction" class="btn btn-success">تأیید</button>
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
            <!--Awaiting confirmation state-->
            <div class="m-t-b-20" v-if="data.ticketInfo.statusId==UserStatus.awaitingConfirmation">
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
                <button class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="openPopup('sendToVira')">ارسال مجدد به ویرا</button>
                <div v-if="isOpen && activePopup == 'sendToVira'" class="popup-overlay">
                  <div class="popup-content">
                    <h3>آیا مطمئن هستید؟</h3>
                    <p>آیا می‌خواهید تیکت به ویرا ارسال شود؟</p>
        
                    <!-- دکمه‌های تایید و لغو -->
                    <button @click="sendTogroupViraConfirmAction" class="btn btn-success">تأیید</button>
                    <button @click="cancelAction" class="btn btn-danger">لغو</button>
                  </div>
                </div>
              </div>
            </div>
            <!--Send to tazirat state-->
            <div class="m-t-b-20" v-if="data.ticketInfo.statusId==UserStatus.sendtotaz">
              <div class="d-flex justify-content-around">
                <button class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="openPopup('sendToVira')">ارسال مجدد به ویرا</button>
                <div v-if="isOpen && activePopup==('sendToVira')" class="popup-overlay">
                  <div class="popup-content">
                    <h3>آیا مطمئن هستید؟</h3>
                    <p>آیا می‌خواهید تیکت به ویرا ارسال شود؟</p>
        
                    <!-- دکمه‌های تایید و لغو -->
                    <button @click="sendTogroupViraConfirmAction" class="btn btn-success">تأیید</button>
                    <button @click="cancelAction" class="btn btn-danger">لغو</button>
                  </div>
                </div>
                <button class="btn btn-danger" style="margin-right: 20px ;" @click="openPopup('reject')">رد کردن و بستن تیکت</button>
                <div v-if="isOpen && activePopup == 'reject'" class="popup-overlay">
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
            <!--awaiting Rejecting state-->
            <div class="m-t-b-20" v-if="data.ticketInfo.statusId==UserStatus.awaitingRejecting">
              <div class="d-flex justify-content-around">
                <button class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="openPopup('sendToVira')">ارسال مجدد به ویرا</button>
                <div v-if="isOpen && activePopup==('sendToVira')" class="popup-overlay">
                  <div class="popup-content">
                    <h3>آیا مطمئن هستید؟</h3>
                    <p>آیا می‌خواهید تیکت به ویرا ارسال شود؟</p>
        
                    <!-- دکمه‌های تایید و لغو -->
                    <button @click="sendTogroupViraConfirmAction" class="btn btn-success">تأیید</button>
                    <button @click="cancelAction" class="btn btn-danger">لغو</button>
                  </div>
                </div>
                <button class="btn btn-danger btn-rounded" style="margin-right: 20px ;" @click="openPopup('reject')">رد کردن و بستن تیکت</button>
                <div v-if="isOpen && activePopup == 'reject'" class="popup-overlay">
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
          </div>
          <!--Admin Vira role-->
          <div class="row" v-if="data.ticketInfo.statusId != UserStatus.Done && userrole.role==UserRole.AdminVira">
            <!--Send to vira state-->
            <div class="m-t-b-20" v-if="data.ticketInfo.statusId==UserStatus.sendtovira">
              <div class="d-flex justify-content-around">
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.inLine)">
                  اضافه کردن به صف پردازش
                </button>
                <button class="btn btn-danger btn-rounded" style="margin-right: 20px ;" @click="openPopup('reject')">رد کردن در انتظار تأیید</button>
                <div v-if="isOpen && activePopup == 'reject'" class="popup-overlay">
                  <div class="popup-content">
                    <h3>آیا مطمئن هستید؟</h3>
                    <p>آیا می‌خواهید تیکت را رد کرده و در انتظار تایید بمانید؟</p>
        
                    <!-- دکمه‌های تایید و لغو -->
                    <button @click="awaitRejectConfirmAction" class="btn btn-success">تأیید</button>
                    <button @click="cancelAction" class="btn btn-danger">لغو</button>
                  </div>
                </div>
              </div>
            </div>
            <!--In line state-->
            <div class="m-t-b-20" v-if="data.ticketInfo.statusId==UserStatus.inLine">
              <div class="d-flex justify-content-around">
                <button type="button" class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="virachangestatus(UserStatus.inProgress,data.ticketInfo.ticketTime,data.ticketInfo.developerId)">
                  در حال انجام
                </button>
                <button class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="openPopup('sendToTaz')">رد کردن به دلیل اطلاعات ناکافی</button>
                <div v-if="isOpen && activePopup == 'sendToTaz'" class="popup-overlay">
                  <div class="popup-content">
                    <h3>آیا مطمئن هستید؟</h3>
                    <p>آیا می‌خواهید تیکت را به دلیل اطلاعات ناکافی به تعزیرات ارسال کنید؟</p>
        
                    <!-- دکمه‌های تایید و لغو -->
                    <button @click="sendTogroupTazConfirmAction" class="btn btn-success">تأیید</button>
                    <button @click="cancelAction" class="btn btn-danger">لغو</button>
                  </div>
                </div>
                <button class="btn btn-danger btn-rounded" style="margin-right: 20px ;" @click="openPopup('reject')">رد کردن در انتظار تأیید</button>
                <div v-if="isOpen && activePopup == 'reject'" class="popup-overlay">
                  <div class="popup-content">
                    <h3>آیا مطمئن هستید؟</h3>
                    <p>آیا می‌خواهید تیکت را رد کرده و در انتظار تایید بمانید؟</p>
        
                    <!-- دکمه‌های تایید و لغو -->
                    <button @click="finalAwaitRejectConfirmAction(data.ticketInfo.ticketTime,data.ticketInfo.developerId)" class="btn btn-success">تأیید</button>
                    <button @click="cancelAction" class="btn btn-danger">لغو</button>
                  </div>
                </div>
              </div>
            </div>
            <!--In progress state-->
            <div class="m-t-b-20" v-if="data.ticketInfo.statusId==UserStatus.inProgress">
              <div class="d-flex justify-content-around">
                <button  class="btn btn-success btn-rounded" style="margin-right: 20px ;" @click="openPopup('doneAwait')">انجام شد در انتظار تایید</button>
                <div v-if="isOpen && activePopup =='doneAwait'" class="popup-overlay">
                  <div class="popup-content">
                    <h3>آیا مطمئن هستید؟</h3>
                    <p>آیا می‌خواهید تیکت را نهایی کرده و در انتظار تایید تعزیرات بگذارید؟</p>
        
                    <!-- دکمه‌های تایید و لغو -->
                    <button @click="viraConfirmAction(data.ticketInfo.ticketTime,data.ticketInfo.developerId)" class="btn btn-success">تأیید</button>
                    <button @click="cancelAction" class="btn btn-danger">لغو</button>
                  </div>
                </div>
                <button class="btn btn-primary btn-rounded" style="margin-right: 20px ;" @click="openPopup('sendToTaz')">رد کردن به دلیل اطلاعات ناکافی</button>
                <div v-if="isOpen && activePopup == 'sendToTaz'" class="popup-overlay">
                  <div class="popup-content">
                    <h3>آیا مطمئن هستید؟</h3>
                    <p>آیا می‌خواهید تیکت را به دلیل اطلاعات ناکافی به تعزیرات ارسال کنید؟</p>
        
                    <!-- دکمه‌های تایید و لغو -->
                    <button @click="sendTogroupTazConfirmAction(data.ticketInfo.ticketTime,data.ticketInfo.developerId)" class="btn btn-success">تأیید</button>
                    <button @click="cancelAction" class="btn btn-danger">لغو</button>
                  </div>
                </div>
                <button class="btn btn-danger btn-rounded" style="margin-right: 20px ;" @click="openPopup('reject')">رد کردن در انتظار تأیید</button>
                <div v-if="isOpen && activePopup == 'reject'" class="popup-overlay">
                  <div class="popup-content">
                    <h3>آیا مطمئن هستید؟</h3>
                    <p>آیا می‌خواهید تیکت را رد کرده و در انتظار تایید بمانید؟</p>

                    <button @click="finalAwaitRejectConfirmAction(data.ticketInfo.ticketTime,data.ticketInfo.developerId)" class="btn btn-success">تأیید</button>
                    <button @click="cancelAction" class="btn btn-danger">لغو</button>
                  </div>
                </div>
              </div>
            </div>
            <!--Rejected state-->
            <div class="m-t-b-20" v-if="data.ticketInfo.statusId==UserStatus.rejected">
              <div class="d-flex justify-content-around">
                <button type="button" class="btn btn-new btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.inserted)">
                  تغییر وضعیت به جدید
                </button>
                <button type="button" class="btn btn-sendtovira btn-rounded" style="margin-right: 20px ;" @click="sendtogroup(UserRole.AdminVira)">
                  تغییر وضعیت به ارجاع به ویرا
                </button>
                <button type="button" class="btn btn-return-from-vira btn-rounded" style="margin-right: 20px ;" @click="sendtogroup(UserRole.AdminTaz)">
                  تغییر وضعیت به برگشت از ویرا
                </button>
                <button type="button" class="btn btn-in-queue btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.inLine)">
                  تغییر وضعیت به در صف انجام
                </button>
                <button type="button" class="btn btn-in-progress btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.inProgress)">
                  تغییر وضعیت به درحال انجام
                </button>
                <button type="button" class="btn btn-done-awaiting btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.awaitingConfirmation)">
                  تغییر وضعیت به انجام شد در انتظار تایید
                </button>
                <button type="button" class="btn btn-awaiting-reject btn-rounded" style="margin-right: 20px ;" @click="changestatus(UserStatus.awaitingRejecting)">
                  تغییر وضعیت به رد کردن در انتظار تأیید
                </button>
              </div>
            </div>

            <div class="col-md-12" style="margin-top: 10px;">
              <div class="form-group">
                <label class="form-label" for="input1" style="margin-right: 10px; margin-left: 10px;">زمان انجام تیکت</label>
                <input class="form-select rounded-input" type="text" v-model="data.ticketInfo.ticketTime"  placeholder="زمان تیکت را وارد کنید">

                <label class="form-label" for="statusSelect" style="margin-left: 10px;">برنامه نویس</label>
                <select class="form-select rounded-input" id="developerId" v-model="data.ticketInfo.developerId" >
                  <option :value="DeveloperId.p_rezayeh">پویا رضائیه</option>
                  <option :value="DeveloperId.m_bagheri">محمد باقری</option>
                  <option :value="DeveloperId.t_hagigi">توحید حقیقی</option>
                  <option :value="DeveloperId.m_borji">مهسا برجی</option>
                  <option :value="DeveloperId.s_mohamadzadeh">ساناز محمد زاده</option>
                  <option :value="DeveloperId.e_ebrahimi">الهه ابراهیمی</option>
                  <option :value="DeveloperId.m_salehi">امیر مسعود صالحی</option>
                  <option :value="DeveloperId.Sh_kazempour">شکیلا کاظم پور</option>
                  <option :value="DeveloperId.e_darvishi">احسان درویشی</option>
                  <option :value="DeveloperId.unknown">برنامه نویس را انتخاب کنید</option>
                </select>

                <button type="button" class="btn btn-success btn-rounded " style="margin-right: 20px;" @click="savechange(data.ticketInfo.ticketTime, data.ticketInfo.developerId)">
                  ذخیره
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
import {DeveloperId} from '../../models/enums/developerId'
import { ref } from 'vue';

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

async function awaitRejectConfirmAction() {
  await changestatus(UserStatus.awaitingRejecting);
  closePopup();
}

async function finalAwaitRejectConfirmAction(time,developerId) {
  await virafinalchangestatus(UserStatus.awaitingRejecting,time,developerId);
  closePopup();
}

async function sendTogroupViraConfirmAction() {
  await sendtogroup(UserRole.AdminVira);
  closePopup();
}

async function sendTogroupTazConfirmAction() {
  await virasendtogroup(UserRole.AdminTaz);
  closePopup();
}

async function viraConfirmAction(time,developerId) {
  await virafinalchangestatus(UserStatus.awaitingConfirmation,time,developerId);
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
  developerId:DeveloperId.unknown,
  time:"0",
  ticketId:route.query.id
});

async function savechange(time,developerId) {
  developerInfo.developerId=developerId;
  developerInfo.time=time;
  if(time != null && time.trim(" ") != null  && developerId < 10)
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



//virafinalchangestatus need to fill ticketTime and developerId
async function virafinalchangestatus(status,time,developerId) {
  statusInfo.status=status;
  developerInfo.developerId=developerId;
  developerInfo.time=time;
  if(developerInfo.time != null && developerInfo.time.trim(" ") != null && developerInfo.developerId < 10)
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
async function virachangestatus(status,time,developerId) {
  statusInfo.status=status;
  developerInfo.developerId=developerId;
  developerInfo.time=time;
  if(developerInfo.developerId < 10)
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
async function virasendtogroup(roleId) {
  roleInfo.roleId=roleId;

  try
    {
		  await $fetch(`${ticketingUrl}/api/v1/changeRole`,{
			method:'POST',
			body : roleInfo
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