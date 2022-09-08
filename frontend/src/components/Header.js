import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  console.log("userLogin",userLogin);
  const {userInfo} = userLogin

  const logoutHandler = () => {
    console.log("dispatch")
    dispatch(logout())
  }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>  
            <Container>
    <Navbar.Brand href="/">ProShop</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id = "basic-navbar-nav" style = {{justifyContent : "flex-end"}}>
    <Nav className="mr-auto">
      <Nav.Link href="/cart" style={{marginTop:'12px'}}><i className='fas fa-shopping-cart'></i>Cart</Nav.Link> 
      {
        userInfo ? (
          <>
          <Nav.Link href = "/profile" style={{marginTop:'12px'}}>
           <NavDropdown title = {userInfo.name} id = 'username'>
             <NavDropdown.Item>Profile</NavDropdown.Item>
             <NavDropdown.Item onClick = {logoutHandler}>Logout</NavDropdown.Item>
             </NavDropdown>
           </Nav.Link>
           </>
        ) : <Nav.Link href="/login" style={{marginTop:'12px'}}><i className='fas fa-user'></i>Login</Nav.Link> }
    </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
        </header>
    )
}

export default Header
