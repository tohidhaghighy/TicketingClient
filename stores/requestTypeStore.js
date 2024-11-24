import { defineStore } from 'pinia'

export const useRequestTypeStore = defineStore('requestTypeId', {
  state: () => {
    return { requestTypeId: false }
  },
  actions: {
    changeRequestTypeId(requestTypeId) {
      this.requestTypeId = requestTypeId;
    },
  },
})