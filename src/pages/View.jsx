import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Header from '../Components/Header';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addtowishlist } from '../redux/slice/wishlistslice';
import { addtoCart } from '../redux/slice/cartSlice';

function View() {
  const { id } = useParams(); // Handle path-related information
  const [product, setProduct] = useState({});
  const { wishlist } = useSelector((state) => state.wishlistReducer);
  const dispatch = useDispatch();
  const cart=useSelector((state)=>state.cartReducer)


  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem('allProducts'));
    console.log(allProducts);

    setProduct(allProducts?.find((product) => product?.id == id));
  }, [id]);

  console.log('Current product:', product);

  const handleAddToWishList = (product) => {
    console.log('Product to add:', product);
    console.log('Current wishlist:', wishlist);
    const existingProduct = wishlist.find((item) => item.id == product.id);
    if (existingProduct) {
      Swal.fire({
        icon: 'warning',
        iconColor: 'black',
        title: 'warning',
        text: 'Already added to wishlist',
        confirmButtonColor: 'black',
        confirmButtonText: '<span style="color: white;">OK</span>',
       background: 'yellow',
        color: 'black',
    });      } else {
      dispatch(addtowishlist(product));
      console.log('Product added to wishlist');
      Swal.fire({
        icon: 'success',
        iconColor: 'white',
        title: 'success',
        text: 'Added to wishlist',
        confirmButtonColor: 'white',
        confirmButtonText: '<span style="color: black;">OK</span>',
       background: 'green',
        color: 'white',
    });    }
  };


  const  handleCart=(product)=>{
    const existingProduct=cart?.find(item=>item.id==product.id)
    if(existingProduct){
      Swal.fire({
        icon: 'warning',
        iconColor: 'black',
        title: 'warning',
        text: 'Already added to cart',
        confirmButtonColor: 'black',
        confirmButtonText: '<span style="color: white;">OK</span>',
       background: 'yellow',
        color: 'black',
    });      dispatch(addtoCart(product))
    }else{
      Swal.fire({
        icon: 'success',
        iconColor: 'white',
        title: 'success',
        text: 'Item Added',
        confirmButtonColor: 'white',
        confirmButtonText: '<span style="color: black;">OK</span>',
       background: 'green',
        color: 'white',
    });      dispatch(addtoCart(product))
  
    }
  }


  return (
    <>
      <Header />
      <div className="container mt-3 mb-3 ms-2 row">
        <div className="col-lg-4">
          <img
            style={{ width: '400px' }}
            src={product?.thumbnail}
            alt="product image"
          />
        </div>
        <div className="col-lg-2"></div>
        <div className="col-lg-6">
          <p>pID: {product?.id}</p>
          <h1>{product?.title}</h1>
          <p>{product?.description}</p>
          <h3>
            Price: <span className="text-danger">{product?.price}</span>
          </h3>
          <div className="d-flex justify-content-between">
          <Button onClick={() => handleAddToWishList(product)} ><i style={{color:"red"}} className="fa-solid fa-heart fa-xl me-1"></i></Button>

                   <Button onClick={()=>handleCart(product)} ><i className="fa-solid fa-cart-plus fa-xl me-1"></i></Button>

          </div>
        </div>
      </div>
    </>
  );
}

export default View;
