// app/store/productStore.js
import {create} from 'zustand';
import axios from 'axios';

const useProductStore = create((set) => ({
  products: [],
  fetchProducts: async () => {
    try {
      const response = await axios.get('/api/');
      set({ products: response.data.products });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    })),
}));

export default useProductStore;
