import { defineStore } from 'pinia'

export const useRequestTypeStore = defineStore('requestTypeId', {
  state: () => {
    return { requestTypeId: false , isShowButton:true }
  },
  actions: {
    changeRequestTypeId(requestTypeId) {
      this.requestTypeId = requestTypeId;
    },
    showSwitchButton(isshow) {
      this.isShowButton = isshow;
    },
  },
})