import { Alert } from "react-bootstrap"
// children is whatever is being output there.

// variant is color , like danger, or success
const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: 'info', 
};

export default Message
