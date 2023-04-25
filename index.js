var admin = require("firebase-admin");
var serviceAccount = require("./frebase_config.json");
// var firebase = require('firebase');
// var firebaseui = require('firebaseui');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var db = admin.firestore();
var items;
const config = require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const auth = require('./routes/auth')
const port = process.env.PORT || 4000; // Port the app runs on
const mainController = require("./controller/main_controller")
const fileUpload = require('express-fileupload');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({
  extended: false
}));
app.use(ejsLayouts);
app.set("view engine", "ejs");
app.use(fileUpload());

const session = require('express-session');

const passport = require('passport');
const {
  ensureAuthenticated
} = require("./middleware/checkAuth")

app.use(
  session({
    secret: 'hjTp7Cf5HaYtxtwYagNzMSvgE9UQPWCNVa5rh9PzxzAHH26fQgZc',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // Expiry
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Use Google+
var GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
    clientID: '725034729418-6kmg1f6hah0ctf7hdi8nu7d84crp2f83.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: process.env.CALLBACKURL
  },

  function (accessToken, refreshToken, profile, cb) {
    cb(null, profile);
  }
));


// Routes
app.get("/", mainController.getIndex);
app.get("/index", mainController.getIndex);
app.get("/index.html", mainController.getIndex);

// app.get("/menu", mainController.getMenu);

app.get("/programs", mainController.getPrograms);
app.get("/programs.html", mainController.getPrograms);

app.get("/aboutus", mainController.getAboutUs);
app.get("/aboutus.html", mainController.getAboutUs);

app.get("/mealdelivery", mainController.getMealDelivery);
app.get("/mealdelivery.html", mainController.getMealDelivery);

app.get("/volunteer", mainController.getVolunteer);
app.get("/supportus.html", mainController.getVolunteer);

app.get("/aldergrove", mainController.getAldergrove);
app.get("/neighbourhoodHouse.html", mainController.getAldergrove);

app.get("/supporters", mainController.getSupporters);

app.get("/pay", mainController.getPay);
app.get("/pay.html", mainController.getPay);

app.get("/signup", mainController.getSignUp);

app.get("/donate", mainController.getDonate);
app.get("/donate.html", mainController.getDonate);

app.get("/contact", mainController.getContact);
app.get("/contact.html", mainController.getContact);

app.get("/login", mainController.getLogin);

app.get("/news", mainController.getNews);
app.get("/news,html", mainController.getNews);


app.get("/inventory", mainController.getInventory);
app.get("/shift", mainController.getShifts);

// CMS routes here
let content = require("./content").content;
let writeJSON = require("./content").writeJSON;

app.get("/edit/:page/:id", ensureAuthenticated, mainController.edit);
app.post("/update/:page/:id", ensureAuthenticated, mainController.update);
app.get("/add/:page", ensureAuthenticated, mainController.add); // Creates a new item then immediately redirects to edit.
app.get("/delete/:page/:id", ensureAuthenticated, mainController.delete);
app.post("/delete/:page/:id", ensureAuthenticated, function (req, res) {

  const itemToEdit = req.params.id
  const pageToEdit = req.params.page
  const origin = '/' + pageToEdit

  const pageDetails = content.find(function (page) {
    return page.page == pageToEdit
  });

  for (let i = 0; i < pageDetails.details.length; i++) {
    if (pageDetails.details[i].id == itemToEdit) {
      pageDetails.details.splice(i, 1)
      break;
    }
  }

  res.redirect(origin);
  writeJSON(req.params.page);
});

app.get("/editimage/:page/:id", ensureAuthenticated, mainController.editImage);
app.post("/updateimage/:page/:id", ensureAuthenticated, function (req, res) {

  const itemToEdit = req.params.id
  const pageToEdit = req.params.page
  const origin = '/edit/' + pageToEdit + '/' + itemToEdit

  // Find correct page first
  const pageDetails = content.find(function (page) {
    return page.page == pageToEdit
  });
  // Find correct box on page
  const itemDetails = pageDetails.details.find(function (item) {
    return item.id == itemToEdit;
  });
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  let uploadPath = __dirname + '/public/images/' + sampleFile.name;

  // Different upload path if pdf
  let fileExt = sampleFile.name.split('.')

  let uploadDir = 'images'
  if (fileExt[fileExt.length - 1] == "pdf") {
    uploadPath = __dirname + '/public/PDFs/' + sampleFile.name;
    uploadDir = 'PDFs'
  }

  itemDetails.imagePath = "/" + uploadDir + "/" + sampleFile.name;
  // Use the mv() method to place the file somewhere on your server

  sampleFile.mv(uploadPath, function (err) {
    if (err)
      return res.status(500).send(err);
  });

  res.redirect(origin);
  writeJSON(req.params.page);
});

app.post("/updateNewsImages/", function (req, res) {

  db.collection("updates").doc()
    .set({
      title: req.body.titleForm,
      body: req.body.bodyForm,
      buttonpath: req.body.buttonForm,
      imagepath: req.body.imageForm,
      id: db.collection("updates").doc().id,
    })

  // if (!req.files || Object.keys(req.files).length === 0) {
  //     return res.status(400).send('No files were uploaded.');
  // }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  if (req.files) {
    let sampleFile = req.files.sampleFile;
    let uploadPath = __dirname + '/public/images/' + sampleFile.name;

    // Different upload path if pdf
    let fileExt = sampleFile.name.split('.')

    let uploadDir = 'images'
    if (fileExt[fileExt.length - 1] == "pdf") {
      uploadPath = __dirname + '/public/PDFs/' + sampleFile.name;
      uploadDir = 'PDFs'
    }

    // Use the mv() method to place the file somewhere on your server

    sampleFile.mv(uploadPath, function (err) {
      if (err)
        return res.status(500).send(err);
    });
  }

  res.redirect("/")

});

// Authentication routes
app.use('/auth', auth)

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
})

// // Everything not defined goes to home page
// app.get('*', function(req, res) {
//   res.redirect('/');
// });

// App runs on port 4000 by default
app.listen(port, function () {
  console.log(
    "Server running on localhost:4000"
  );
});

// module.exports.items = items