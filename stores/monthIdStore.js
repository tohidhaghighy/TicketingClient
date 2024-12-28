import { defineStore } from 'pinia';

export const useMonthStore = defineStore('monthStore', {
  state: () => ({
    monthId: localStorage.getItem('monthId') ? Number(localStorage.getItem('monthId')) : 0, // Default to 0
  }),
  actions: {
    setMonthId(newMonthId) {
      this.monthId = newMonthId;
      localStorage.setItem('monthId', newMonthId.toString());
    },
  },
});
