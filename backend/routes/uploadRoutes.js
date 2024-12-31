import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});
// we need to create a function to check the file type, we don't want people to upload pdf etc.

function checkFileType(file, cb) {
  // regular expression to what we want to allow
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}
// test is just to see if it's gonna match our regular expression

// doing the actual upload
const upload = multer({
  storage,
});

// creating our route
// upload.single('this is the fieldname'); with this we will upload one file.
// the actual uplaod is handled by the middleware(upload.single('this is the fieldname')

router.post('/', upload.single('image'), (req, res) => {
  res.send({
    message: 'Image Uploaded',
    image: `/${req.file.path}`
  });
})

export default router;


// before we create our route, we need to describe where we want our image to go, which storage we want to use, we can use amazon bucket , or diskStorage()
// we want to be on a server.
// destination() will describe where we want to save this., cb is the callback that we want to call inside of destination(); cb(null, 'uploads/') , null pertains to an error, and the second argument is where we want our upload to go, it'll be in a folder called uploads in the root.

// any images that get uploaded will get into that folder ("uploads/");

// we're gonna have filename function, because this is how we want our filename to be formatted.