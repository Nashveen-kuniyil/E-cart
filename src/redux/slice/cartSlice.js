import { createSlice } from "@reduxjs/toolkit";


const cartSlice=createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        addtoCart:(state,action)=>{
            const existingproduct=state.find(item=>item.id==action.payload.id)
            if(existingproduct){
                const remainingproduct=state.filter(item=>item.id!=existingproduct.id)
existingproduct.quantity++
existingproduct.totalPrice=existingproduct.price*existingproduct.quantity
state=[...existingproduct,remainingproduct]
            }else{
                state.push({...action.payload,quantity:1,totalPrice:action.payload.price})
            }
        },
        removefromcart:(state,action)=>{
            return state=state.filter(item=>item.id!==action.payload)
        },
        emptyCart:(state)=>{
            return state=[]
        }

    }
})

export default cartSlice.reducer;
export const {addtoCart,removefromcart,emptyCart}=cartSlice.actions;

