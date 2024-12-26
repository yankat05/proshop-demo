import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
// to make an admin, we need to go to database to change the default value of isAdmin to true
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true,
});
// we add a method on userSchema which is matchPassword takes in enteredPassword , which is what the user enters which will be plain text, we're gonna compare that to the Hashed password, compare is gonna take in enteredPassword , and we're gonna compare this to this.password which is the password that's currently stored in the database for this user, we need to use this method in our controller user , otherwise it wont do anything
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

// .pre allows us to do something before it's saved in the database.
// if we're saving something to the database , this .pre method will run before , so we can hash the password
// we can also do .post which will do something after 
// there's different action we can do , in this case we'll do before a save

userSchema.pre('save', async function (next) { 
  // if the password of this user is not modified then call the next piece of middleware , it's for mongoose
  // this pertens to the current user that we're saving
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password , salt);
  // bcrypt.hash takes in the password , and the salt
  // this password will be saved before the user is saved in the.
});

const User = mongoose.model('User', userSchema);

export default User;