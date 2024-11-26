import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchproducts=createAsyncThunk("products/fetchproducts",async()=>{
    const result=await axios.get("https://dummyjson.com/products")
    localStorage.setItem('allProducts',JSON.stringify(result.data.products))
    return result.data.products
})


 const productSlice=createSlice({
    name:"products",

    initialState:{
        allproducts:[],
        allproductsdummy:[],
        loading:false,
        error:""
    },

    reducers:{
        searchproduct:(state,action)=>{
            state.allproducts=state.allproductsdummy.filter(item=>item.title.toLowerCase().includes(action.payload))
        }
    },

    extraReducers:(builder)=>{
        builder.addCase(fetchproducts.fulfilled,(state,action)=>{
            state.allproducts=action.payload
            state.allproductsdummy=action.payload
            state.loading=false
            state.error=""
        })
        builder.addCase(fetchproducts.pending,(state,action)=>{
            state.allproducts=[]
            state.allproductsdummy=[]
            state.loading=true
            state.error=""
        })
        builder.addCase(fetchproducts.rejected,(state,action)=>{
            state.allproducts=[]
            state.allproductsdummy=[]
            state.loading=false
            state.error="API call failed...!"
        })
    }
})



export default productSlice.reducer;
export const {searchproduct}=productSlice.actions

