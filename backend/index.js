const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User =  require('./model/User')
const Credential =  require('./model/Credential')




// App Initialization
const app = express();

// DB Config
const db = require('./config/database');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose.connect(db.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// cross origin mioddleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    next();
});


// Body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// Index Route
app.get('/', (req, res) => {
    const title = 'Welcome To Nodejs CRUD Rest api';
    res.json({
        title: title
    })
});

// Post User Details
app.post('/add-user-profile',(req,res)=>{

    const user =   new User({
        userDetails:req.body.userDetails,
    userDisease:req.body.userDisease,
    score:req.body.score,
    date:req.body.date
    })
user.save().then(()=>{

    res.json({success:"User Data has been Successfully Added"})

}).catch(err=>{
    res.json({error:"Something went Wrong"})
})

})
// Get User Details
app.get('/get-all-user-data',(req,res)=>{

User.find().then(data=>{
    res.json({data:data})
}).catch(err=>{
    res.json({error:"Something went Wrong"})
})


})

// signUp
app.post('/sign-up',(req,res)=>{
const cred = new Credential({userEmail:req.body.userEmail,password:req.body.password});
Credential.find().where("userEmail",req.body.userEmail).then(data=>{
    if(data.length != 0){
        res.json({message:"User Already Exist"})
    }else{
        cred.save().then(()=>{
            res.json({message:"User created Successfully",login:true})
        })
    }
}).catch(err=>{
    res.json({error:"Something went Wrong"})

})
})
 
// Login
app.post('/log-in',(req,res)=>{
    const cred = new Credential({userEmail:req.body.userEmail,password:req.body.password});
Credential.find().where("userEmail",req.body.userEmail).then(data=>{
    if(data.length == 0){
        res.json({message:"User Doesn't Exist"})
    }else{
       const credential = data[0]
       if(req.body.userEmail === credential.userEmail){
           if(req.body.password === credential.password){
               res.json({login:true,message:"Logged In Successfully"})
           }
           else{
               res.json({login:false,message:"Check your password"})
           }
       }
    }
}).catch(err=>{
    res.json({error:"Something went Wrong"})

})
})
// Using port 5000 or environmental port
const port = process.env.PORT || 5000;


// Starting server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});