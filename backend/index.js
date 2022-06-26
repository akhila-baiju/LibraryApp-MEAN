const express =require('express');
const Userdata = require('./src/model/UserData')
const Bookdata = require('./src/model/bookData')
const cors = require("cors");
const app=new express();
const jwt=require('jsonwebtoken');
app.use(cors());
app.use(express.json());

username="admin";
password="12345";


app.post('/insert',function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    var user = {
        fName: req.body.item.fName,
        lName: req.body.item.lName,
        mNumber: req.body.item.mNumber,
        emailId: req.body.item.emailId,
        password: req.body.item.password
    }
    var User = new Userdata(user);
   // console.log(User.emailId);
     User.save();
})


function varifyToken(req,res)
{
  if(!req.headers.authorozation){
    return res.status(401).send('Unauthorized Request')
  }
  let token = req.headers.authorization.split('')[1]
  if(token=='null')
  {
    return res.status(401).send('Unauthorized Request')
  }
  let payload = jwt.varify(token,'secretKey')
  console.log(payload)
  if(!payload)
  {
    return res.status(401).send('Unauthorized Request')
    req.userId = payload.subject
    next()
  }
}


app.post('/login', (req, res) => {
   // let userData = req.body
   //console.log("email== :"+userData.email+" pass= : "+userData.password);
   Userdata.findOne({ email: req.body.email } && {password : req.body.password}).then(
    (user) => { 
      //console.log(user);
      if (!user) {
         res.status(401).send('Invalid Username')
       }
   else 
   {

    let payload = {subject: username+password}
    let token = jwt.sign(payload, 'secretKey')
    res.status(200).send({token})
  }
      
    })
})


app.post('/insertBook',function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
  var book = {
      bookURL: req.body.item.bookURL,
      title: req.body.item.title,
      content: req.body.item.content,
      authorURL: req.body.item.authorURL
     
  }
  var books = new Bookdata(book);
 
  books.save();
})

app.get('/books',function(req,res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
  Bookdata.find()
  .then(function(books){
      res.send(books);
  })
})

   app.get('/:id',  (req, res) => {
  
    const id = req.params.id;
    Bookdata.findByIdAndDelete({"_id":id})
    .findOne({"_id":id})
      .then((book)=>{
        //  console.log(product);
          res.send(book);
      });
  })


   app.put('/updateBook',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    
    id=req.body._id,
    //console.log("id= :"+id);
   // title : req.body.title,
    //console.log("title== "+title);
    /*
    bookURL: req.body.bookURL,
    title: req.body.title,
    content: req.body.content,
    authorURL: req.body.authorURL*/
  
    Bookdata.findByIdAndUpdate({"_id":id},
                                {$set:{
                                "bookURL":req.body.bookURL,
                                "title":req.body.title,
                                "content":req.body.content,
                                "authorURL":req.body.authorURL,
                                }})
   .then(function(){
       res.send();
   })
 })


 app.delete('/remove/:id',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
  
     id = req.params.id;
     Bookdata.findByIdAndDelete({"_id":id})
     .then(()=>{
         console.log('success')
         res.send();
     })
   })






app.listen(3000,()=>{
    console.log("server listening port 3000");
})