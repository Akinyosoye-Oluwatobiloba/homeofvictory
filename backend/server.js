require("./config/db");
const cookieSession = require("cookie-session");
const express = require("express");
const app = express()
const port =  8000 || process.env.PORT;
const UserRouter = require("./api/User");
const passport = require("passport");
const cors = require("cors");
//for collecting post form data
const bodyParser = require('express').json;
app.use(bodyParser());


app.use('/user',UserRouter);


app.use(cookieSession(
    {
        name:"session",
        keys:["tobi"],
        maxAge:24*60*60*1000
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials:true
}))

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));

// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
});

