import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlist: [],
  },
  reducers: {
    addtowishlist: (state, action) => {
      state.wishlist.push(action.payload);
    },
    deletewishlist:(state,action)=>{
      state.wishlist=state.wishlist.filter((item)=>item.id!=action.payload)
    }
  },
});

export const { addtowishlist ,deletewishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;
