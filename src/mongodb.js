// importing the modules

const mongoose = require('mongoose')

// connecting the mongodb with the node

mongoose.connect("mongodb://localhost:27017/userDetail")
.then(()=>{                                                   //for checking the connection is true using the promise 
    console.log("Mongodb is now connected properly");
})
.catch((error)=>{                                                  //for checking the connection is failed using the promise
    console.log("Mongodb is not connected properly",error);
    throw error;
})


//Schema of the documents of the users

const userCollection = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    
    password : {
        type : String,
        required : true,

    }

})





// collection name based on the schema 

const collection = new mongoose.model("Users",userCollection)

// exporting the mongodb.js file using the schema 

module.exports = collection