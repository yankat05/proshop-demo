import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  async function addToCartHandler (product, qty) {
    dispatch(addToCart({...product, qty}))
  }

  async function removeFromCartHandler (id) {
    dispatch(removeFromCart(id))
    // we're passing in the id , because whatever we pass in here removeFromCart(here) is what gets passed in as the action payload, it will update the state

    // just like with add to Cart, the action payload was the entire item because that's what we passed in
  }

  function checkoutHandler () {
    navigate('/login?redirect=/shipping');
    // if we're not logged in it'll redirect us to /login, if we are logged in then it's gonna redirect us to /shipping
    // because in the log in screen , we're gonna check for this redirect, and if it's here, then we're gonna redirect to whatever this is in this case shipping
  }

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shipping Cart</h1>
        { cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{ item.name }</Link>
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col md={2}>
                  <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                      >
                        {/* this ...Array create an array with a length of whatever many products are in stock, and keys() methods is used to create an array of indexes.  */}
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option
                          key={x + 1}
                          value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type="button" variant="light" onClick={ () => removeFromCartHandler(item._id) }>
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) }
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              ${ cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2) }
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
               type="button"
               className="btn-block"
               disabled={ cartItems.length === 0 } 
               onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  ) 
}

export default CartScreen
