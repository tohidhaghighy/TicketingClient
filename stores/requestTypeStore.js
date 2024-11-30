import { defineStore } from 'pinia'

export const useRequestTypeStore = defineStore('requestTypeId', {
  state: () => {
    var requestId=localStorage.getItem('requestTypeId');
    return { 
       requestTypeId:(requestId=='true' ? true : false)  || false ,
       isShowButton:localStorage.getItem('isShowButton') || false
      }
  },
  actions: {
    changeRequestTypeId(requestTypeId) {
      this.requestTypeId = requestTypeId;
      localStorage.setItem('requestTypeId', requestTypeId);
    },
    showSwitchButton(isshow) {
      this.isShowButton = isshow;
      localStorage.setItem('isShowButton', isshow);
    },
  },
})