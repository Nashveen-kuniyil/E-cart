import React, { useEffect } from 'react'
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {fetchproducts} from '../redux/slice/productSlice'
import Header from '../Components/Header'
import { addtowishlist } from '../redux/slice/wishlistslice'
import {addtoCart} from '../redux/slice/cartSlice'






function Home() {

const dispatch=useDispatch()

const{allproducts,loading,error}=useSelector(state=>state.productReducer)
const { wishlist } = useSelector((state) => state.wishlistReducer);
const cart=useSelector((state)=>state.cartReducer)


useEffect(()=>{
  dispatch(fetchproducts())
},[])


const handleAddToWishList = product => {
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
  });    } else {
    Swal.fire({
      icon: 'success',
      iconColor: 'white',
      title: 'success',
      text: `${product.title} Added to wishlist`,
      confirmButtonColor: 'white',
      confirmButtonText: '<span style="color: black;">OK</span>',
     background: 'green',
      color: 'white',
  });     dispatch(addtowishlist(product));
   
  }
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
      text: `${product.title}  Added to Cart`,
      confirmButtonColor: 'white',
      confirmButtonText: '<span style="color: black;">OK</span>',
     background: 'green',
      color: 'white',
  });    dispatch(addtoCart(product))

  }
}



  return (
    <>
         <Header insidehome={true}/>

    <div>
     { loading?  <div className='text-center mt-5'>
    <Spinner animation='border' variant='primary'/>
     </div>:
     <Row>
      {allproducts?.length>0?allproducts.map(product=>(

    
        <Col key={product?.id}>
        <Card className='ms-3 mt-3 mb-3' style={{ width: '18rem',height:"500px" }}>
     <Link to={`/view/${product?.id}`}>
     <Card.Img width={'100%'} variant="top" src={product.thumbnail} />

     </Link>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          {product.description.slice(0,30)}
        </Card.Text>
        <Card.Text className='d-flex justify-content-between'>
          <div>Price:${product.price}</div>
         <div> Rating:${product.rating}</div>
        </Card.Text>
      </Card.Body>
     
      <Card.Body className='d-flex justify-content-between'>
        <Button onClick={() => handleAddToWishList(product)} ><i style={{color:"red"}} className="fa-solid fa-heart fa-xl me-1"></i></Button>
        <Button onClick={()=>handleCart(product)} ><i className="fa-solid fa-cart-plus fa-xl me-1"></i></Button>
      </Card.Body>
    </Card>
        </Col>)):<p className='text-danger'>nothing to display</p>
        }
      </Row>}
   
    </div>
    </>
  )
}

export default Home
