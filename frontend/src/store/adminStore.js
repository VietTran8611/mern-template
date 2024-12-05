import {create} from 'zustand'
import axios from 'axios'

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/admin" : "/api/admin";

export const useAdminStore = create((set)=>({
    admin: [],
    isLoading: false,
    error:null,
    fetchAdminData: async()=>{
        set({isLoading: true, error: null})
        try {
            const res = await fetch(`${API_URL}`);
            const data = await res.json();
            set({ admin: data.data });
            
        } catch (error) {
            set({error:error.response.data.message || "error fetching image", isLoading:false})
            throw error
        }
    },createAdminData: async (newProduct) => {
        set({isLoading:true,error:null})
        try{
          const response = await axios.post(API_URL, newProduct)
          set((state) => ({ isLoading:false }));
          return { success: true, message: "image created successfully" };
        }catch(error){
          console.log(error)
        }
      }

}))