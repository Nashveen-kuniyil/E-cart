import { configureStore } from "@reduxjs/toolkit";
import productSlice from '../redux/slice/productSlice'
import wishlistSlice from './slice/wishlistslice'
import cartSlice from './slice/cartSlice'

const cartStore=configureStore({
    reducer:{
        productReducer:productSlice,
        wishlistReducer:wishlistSlice,
        cartReducer:cartSlice
        
    }
})

export default cartStore;