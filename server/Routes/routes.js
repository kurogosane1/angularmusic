const express = require('express');
const app = express();
const fs = require('fs');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const file = ('dist/assets/uploads');
const musicUploads = require('../models/models')

// Global variables
var directory;
var storedUploads = [];

// Multer services
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './dist/assets/uploads')
  },
  filename: function (req, file, cb) {
    console.log(musicUploads);
    console.log("after");
    console.log(req);
    console.log("This is after");
    console.log(file)
    cb(null, file.originalname + '.mp3')



  }
});
var upload = multer({
  storage: storage
});


//create a cors middleware
router.use(function (req, res, next) {
  //set headers to allow cross origin request.
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', (res, req)=> {
  res.sendFile(path.join(__dirname + '../../dist/index.html'));
});

router.get('/music', (res, req, next) => {
  fs.readdir('./dist/assets/uploads', (err, data) => {
    if (err) {
      console.log("this is line 45 " + " " + err)
    } else {
      directory = data;

      console.log(directory)
    //   req.sendFile(path.join(__dirname + '/uploads/'));
      req.send(JSON.stringify(directory));



    }
  })


});

// this is to remove the file once removed
router.post('/remove', (res, req, next)=> {
 
  fs.unlinkSync('./dist/assets/uploads/'+ res.body, (res, req, next) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log("file removed");
    }
  })
});



router.post('/posts', upload.array('files', 1), function (req, res, next) {

  var length = req.files.length;
  // console.log(req.files);

  for (var i = 0; i < length; i++) {
    storedUploads = {
      "name": req.files[i].originalname,
      "path": req.files[i].path,
      "type": req.files[i].mimetype,
      "destination": req.files[i].destination
    };
    musicUploads.push(storedUploads);

  }


});

module.exports = router;
