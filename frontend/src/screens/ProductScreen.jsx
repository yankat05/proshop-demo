// import { useEffect, useState } from 'react'
// the quantity will be kept in component state
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
// we call addToCart directly, but we need to dispatch that from react redux by using useDispatch
// import axios from "axios";

const ProductScreen = () => {
  // const [product, setProduct] = useState({});
  
  const { id: productId } = useParams();
  // this productId comes from the url
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const [qty, setQty] = useState(1);

  function addToCartHandler () {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart')
  }

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const { data } = await axios.get(`/api/products/${productId}`);
  //     setProduct(data)
  //   }

  //   fetchProduct();
  // }, [productId]);
  // when the value of productId change , then useEffect will run.

 


  return (
    
    <>
      <Link className="btn btn-light my-3" to='/'>
        Go Back
      </Link>
      

      { isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{ error?.data?.message || error.error }</Message>
      ) : (
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>${product.countInStock > 0 ? 'In Stock': 'Out OF Stock'}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              { product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {/* this ...Array create an array with a length of whatever many products are in stock, and keys() methods is used to create an array of indexes.  */}
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option
                          key={x + 1}
                          value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ) }

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      ) }

      
    </>
  )
}

export default ProductScreen;
