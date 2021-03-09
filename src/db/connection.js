const mongoose = require("mongoose");

// returnning a promise:
mongoose.connect("mongodb://localhost:27017/registration-db",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("Connection Successful");
}).catch((err)=>{
    console.log(err);
});