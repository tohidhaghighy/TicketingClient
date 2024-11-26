import { defineStore } from 'pinia'

export const useRequestTypeStore = defineStore('requestTypeId', {
  state: () => {
    return { 
       requestTypeId: localStorage.getItem('requestTypeId')  || false ,
       isShowButton:localStorage.getItem('isShowButton') || true 
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