// importing the modules

const mongoose = require('mongoose')

// connecting the mongodb with the node

mongoose.connect("mongodb://localhost:27017/userDetail")
.then(()=>{                                                      //for checking the connection is true using the promoise 
    console.log("Mongodb is now connected");
})
.catch(()=>{                                                      //for checking the connection is failed using the promise
    console.log("Mongodb is not connected properly");
})


//Schema of the documents 

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

const collection = new mongoose.model("Collection_1",userCollection)

// exporting the mongodb.js file using the schema 

module.exports = collection