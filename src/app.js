const express = require("express");
const path = require("path");
const ejs = require("ejs");

const app = express();

app.use(express.urlencoded({extended:false}));


//encryption
const bcrypt = require("bcryptjs");
const saltRounds = 8;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


// db connection
require("./db/connection.js");
const Register = require("./models/register");

// static files
app.use(express.static(path.join(__dirname,"../public")));  // finds index.html and run if present

// setting view engine
app.set("views",path.join(__dirname,"../templates/views")); // instead of looking views, search for template/views
app.set('view engine', 'ejs');


app.get("/",(req,res)=>{
    res.redirect("/register");
});

app.get("/register",(req,res)=>{
    res.render("register");
});

app.post("/register",async (req,res)=>{
    try {
        // console.log(req.body);
        const pwd1 = req.body.psw;
        const pwd2 = req.body.psw_repeat;
        if(pwd1 === pwd2){

            var hash1 = bcrypt.hashSync(myPlaintextPassword, saltRounds);
            // Password Hash:
            var user = new Register({
                name: req.body.name,
                email:req.body.email,
                password: hash1,
                gender:req.body.sex,
                dob:req.body.birthday
            });

            console.log(user);
            await user.save((err,data)=>{
                if(data){
                    res.render("success");
                }else{
                    console.log(err);
                    res.render("error",{err:err});
                }
            });

        }else{
            // res.send("Passwords Not Matched.");
            const err ={
                name:"Password-not-matched"
            };
            res.render("error",{err: err});
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/login",async(req,res)=>{
    try {

        const email = req.body.email;
        const pwd = req.body.psw;
        const user = await Register.findOne({email:email});
        if(user && bcrypt.compare(pwd,user.password)){
            console.log(user);
            res.render("home");
        }else{
            const err = {
                name: "invalid-Id"
            }
            res.render("error",{err:err});
        }

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});