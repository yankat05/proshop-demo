import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });

    // .sign will create the token , it will take in , first an object with a payload what we wanna send in the payload, second the secret, third the expired date for the token
    // it's just gonna put it in token.
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 Days
    // res.cookie method takes in , the name of the cookie , the value of the cookie we want to set, and some options
  });
}

export default generateToken;