import { defineStore } from 'pinia';

export const useBaseStore = defineStore('base', {
  state: (): BaseState => ({
    loading: false,
    componentsWithLoading: [],
  }),
  actions: {
    startLoading(UID: string | number): void {
      if (!this.componentsWithLoading.length) {
        this.loading = true;
      }

      const isExist: boolean = this.componentsWithLoading.includes(UID);

      if (!isExist) {
        this.componentsWithLoading.push(UID);
      }
    },
    endLoading(UID: string | number): void {
      this.componentsWithLoading = this.componentsWithLoading.filter(
        (code: string | number): boolean => code !== UID,
      );

      if (!this.componentsWithLoading.length) {
        this.loading = false;
      }
    },
  },
});
