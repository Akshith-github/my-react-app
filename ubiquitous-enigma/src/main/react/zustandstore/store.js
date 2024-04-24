import {create} from 'zustand';

const useStore = create((set,get) => ({
  currentFormData: {},
  fetchApiResponse: [],
  fetchError: null,
  fetchFormData: { 'fetchType': 'date', 'date': new Date().toISOString().split('T')[0] },
  minDate: '',

  setCurrentFormData: (formData) => set({ currentFormData: formData }),
  setFetchApiResponse: (response) => set({ fetchApiResponse: response }),
  setFetchError: (error) => set({ fetchError: error }),
  setFetchFormData: (formData) => set((state) => ({ fetchFormData: { ...state.fetchFormData, ...formData } })),
  setMinDate: (minDate) => set({ minDate }),

  resetCurrentFormData: () => set({ currentFormData: {} }),
  resetMinDate: () => set({ minDate: '' }),
}));

export default useStore;
