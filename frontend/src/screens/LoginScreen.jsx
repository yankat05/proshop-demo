import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {Form, Button, Row, Col} from 'react-bootstrap';
// in order to interact with the state, we need to bring in , useDispatch and useSelector,
// useDispatch is used to dispatch action such as login, and useSelector is to get something from the state such as the user.
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";


const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth)
  // we select the auth state

  // we need to check to see , if redirect is there if it is , we then want to redirect to the shipping page,
  // to do that we use the search property from the useLocation hook

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';
  // so it's going to get what it is in redirect='/shipping' or '/'

  useEffect(() => {
    // if there's userInfo in LocalStorage then it will redirect to the redirect is
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);
  // [dependencies ] use userInfo cause it's in the useEffect , redirect and navigate
  // the useEffect will be used to check to see if we're logged in, if we're logged in then it will redirect us to the shipping or what is in the redirect=?


  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      const res = await login({email, password}).unwrap();
      dispatch(setCredentials({...res,}))
      navigate(redirect)
      // unwrap() Unwraps a mutation call to provide the raw response/error
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
     
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Passord</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-2" disabled={ isLoading }>
          Sign In
        </Button>

        { isLoading && <Loader /> }
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link to={ redirect ? `/register?redirect=${redirect}` : '/register' }>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen;
