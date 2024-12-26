import {Container, Row, Col} from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          { children }
        </Col>
      </Row>
    </Container>
  )
}
// justify-content-md-center , on medium screen , justify-content will be to the center
//so now we can just wrap whatever we want in this form container component.

export default FormContainer;

// to make this form work, we have to call the login from the userApiSlice.js to send the request to the back end and set the cookie.
// once we get the user data back, we then want to call from the auth slice setcredentials.