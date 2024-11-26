import React from 'react';
import Header from '../Components/Header';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addtoCart } from '../redux/slice/cartSlice';
import {deletewishlist} from '../redux/slice/wishlistslice'

function Wishlist() {
  const { wishlist } = useSelector((state) => state.wishlistReducer);
  console.log(wishlist);

  const dispatch=useDispatch()

  const handleCart=(product)=>{
    dispatch(addtoCart(product))
    dispatch(deletewishlist(product?.id))
  }

  return (
    <>
      <Header />
      <div className="container mt-3">
        <Row>
          {wishlist?.length > 0 ? 
            wishlist.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4}>
                <Card className="ms-3 mt-3 mb-3" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={product?.thumbnail} alt={product?.title} />
                  <Card.Body>
                    <Card.Title>{product?.title}</Card.Title>
                    <Card.Text>{product?.description}</Card.Text>
                  </Card.Body>
                  <Card.Body className="d-flex justify-content-between">
                    <Button onClick={()=>dispatch(deletewishlist(product.id))}>
                      <i className="fa-solid fa-trash fa-xl text-danger"></i>
                    </Button>
                    <Button onClick={()=>handleCart(product)}>
                      <i className="fa-solid fa-cart-plus fa-xl me-1"></i>
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
           : 
           <div className='text-center mb-3'>
<img height={'500px'} width={'70%'} src="https://media.tenor.com/5aE5T7edBz4AAAAM/the-simpsons-homer-simpson.gif" alt="" />
           </div>
          }
        </Row>
      </div>
    </>
  );
}

export default Wishlist;
