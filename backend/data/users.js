// to hash passwords, we're gonna be using a package called Bcrypt, on the terminal it's gonna be npm i bcryptjs

// the second parameter for hashSync , is that the higher the number the more secure the password would be
import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdim: false,
  },
  {
    name: 'Jane Doe',
    email: 'Jane@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdim: false,
  },
]

export default users;