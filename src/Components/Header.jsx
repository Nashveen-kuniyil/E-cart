import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchproduct } from '../redux/slice/productSlice';
import { Badge, Container, FormControl, Nav } from 'react-bootstrap';



function Header({insidehome}) {

const dispatch=useDispatch()
const {wishlist}=useSelector(state=>state.wishlistReducer)
const [wishlistcount,setWishListCount]=useState(0)
const [cartcount,setCartCount]=useState(0)
const cart=useSelector((state)=>state.cartReducer)

useEffect(()=>{
  setWishListCount(wishlist.length)
  setCartCount(cart.length)
},[wishlist,cart])
  
  return (
    <Navbar bg="black" variant="dark" expand="lg" className="p-3 fixed-top mb-3">
    <Container>
      <Navbar.Brand href="/" className="d-flex align-items-center">
        <img
          src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
          alt="Flipkart Logo"
          height="40"
          className="me-2"
        />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse id="responsive-navbar-nav">
        {insidehome && (
          <Form className="d-flex w-50 mx-auto my-2 my-lg-0">
            <FormControl
              type="search"
              placeholder="Search for Products, Brands and More"
              className="me-2"
              aria-label="Search"
              onChange={(e) => dispatch(searchproduct(e.target.value.toLowerCase())) }
            />
          </Form>
        )}

        <Nav className="ms-auto d-flex align-items-center gap-4">
          <Link to="/wishlist" className="text-white text-decoration-none">
            <i className="fa-solid fa-heart me-1"></i> Wishlist
            <Badge>{wishlistcount}</Badge>
          </Link>
          <Link to="/cart" className="text-white text-decoration-none">
            <i className="fa-solid fa-cart-shopping me-1"></i> Cart
            <Badge>{cartcount}</Badge>
          </Link>
          <Link to="/login" className="text-white text-decoration-none">
            <i className="fa-solid fa-user me-1"></i> Login
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default Header;
