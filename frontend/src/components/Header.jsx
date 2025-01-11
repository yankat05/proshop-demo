import { useNavigate } from 'react-router-dom';
import {Badge ,Navbar , Nav, Container, NavDropdown, NavLink} from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import logo from '../assets/logo.png';

// you can use useSelecter to select something from the state

const Header = () => {
  // you can destructure anything you want from the state by using  useSelector() and passing an function that takes in the state, and the part of the state you want, like state.cart and it's coming from the store,where we name cart in reducer, whatever you call this you can access that like that, we can access anything in our state
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(cartItems)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
      // which will clear the localstorage
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>
            <img src={logo} alt="ProShop" />
            ProShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <SearchBox />
              <Nav.Link href='/cart'><FaShoppingCart /> Cart 
              {
                cartItems.length > 0 && (
                  <Badge pill bg='success' style={{marginLeft: '5px'}} >
                    { cartItems.reduce((a, c) => a + c.qty, 0) }
                  </Badge>
                )
              }
              </Nav.Link>
              { userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <Nav.Link  href='/profile'>
                  <NavDropdown.Item>
                      Profile
                  </NavDropdown.Item>
                  </Nav.Link>
                  <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href='/login'> 
                <FaUser />
                 Sign In 
                </Nav.Link>) }
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="adminmenu">
                    <NavLink href='/admin/productlist'>
                    <NavDropdown.Item>
                      Products
                    </NavDropdown.Item>
                    </NavLink>
                    <NavLink href='/admin/userlist'>
                    <NavDropdown.Item>
                      Users
                    </NavDropdown.Item>
                    </NavLink>
                    <NavLink href='/admin/orderlist'>
                    <NavDropdown.Item>
                      Orders
                    </NavDropdown.Item>
                    </NavLink>
                  </NavDropdown>
                )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;
