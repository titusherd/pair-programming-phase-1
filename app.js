const express = require('express');
const router = require('./routes');
const session = require('express-session')
const app = express()
const port = 3000

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));

app.use(session({
  secret : 'laundry_Secret',
  resave : false,
  saveUninitialized : true, 
  cookie : { secure : false, sameSite: true}
}))

app.use(router);

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})