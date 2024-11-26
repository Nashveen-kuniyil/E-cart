import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { emptyCart, removefromcart } from '../redux/slice/cartSlice'
import { Link } from 'react-router-dom'





function Cart() {

  const dispatch=useDispatch()

  const cart=useSelector((state)=>state.cartReducer)
 const [totalprice,setTotalPrice]=useState(0)


 useEffect(()=>{
if(cart?.length>0){
  setTotalPrice(cart?.map(pro=>pro?.totalPrice).reduce((a,b)=>a+b))
}else{
  setTotalPrice(0)
}
 },[cart])



 


  return (
    <>
    
    <Header/>

    { cart.length>0?( <div className="row container">
      <div className="col-lg-7">

      <div className="table shadow container-mt-5">
<table>
  <tr>
    <th>#</th>
    <th>title</th>
    <th>image</th>
    <th>price</th>
    <th>action</th>
  </tr>



 { cart?.map((product,index)=>
 <tr>
    <td>{index+1}</td>
    <td>{product.title}</td>
    <td><img width={'70%'} height={"200px"} src={product.thumbnail} alt="" /></td>
    <td>{product.price}</td>
    <td><button onClick={()=>dispatch(removefromcart(product?.id))} className='btn'><i class="fa-solid fa-trash fa-xl text-danger"></i></button></td>
  </tr>
)}


</table>
<div className="d-flex justify-content-between p-3">
  <button onClick={()=>dispatch(emptyCart())} className='btn btn-danger'>empty cart</button>
  <Link to={'/'}>
  <button className='btn btn-success bg-success text-white'>shop more</button>

  </Link>
</div>
      </div>
      
      
      </div>
    

      <div className="col-lg-1"></div>
      <div className="col-lg-3">
        <div className="card shadow rounded mt-5 p-5">
          <h2>cart summary</h2>
          <h3>Total products<span>{cart?.length}</span></h3>
          <h3>Total price<span>${totalprice}</span></h3>
          <div className="d-grid">
        <button>checkout</button>
      </div>
        </div>
      </div>
      
     </div>
): <div className='text-center mb-3'>
<img height={'500px'} width={'70%'} src="https://media.tenor.com/5aE5T7edBz4AAAAM/the-simpsons-homer-simpson.gif" alt="" />
           </div>
}

    </>
  )
}

export default Cart
