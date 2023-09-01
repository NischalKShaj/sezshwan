// importing the modules

const express = require('express')
const path = require('path')
const ejs = require('ejs')
const collection = require('./mongodb')

const app = express()

// for parsing the user input data

app.use(express.json())

// setting the view page and the path

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'..', 'views'));
app.use(express.urlencoded({extended :false}))

// rendering the login page

app.get('/',(req ,res)=>{
    res.render('login')
}) 


// Testing whether the rendering is working or not
app.post('/home',(req, res)=>{
    res.render('home')
})

// rendering the signup page

app.get('/signup',(req, res)=>{
    res.render('signup')
})

// rendering the login page

app.post('/',(req ,res)=>{
    res.render('login')
})

// loading the mongodb file in the database

app.post('/signin', async(req, res)=>{
    try{

        const data ={
            name : req.body.name,
            password : req.body.password,
        }
        await collection.insertMany([data])     // inserting the values from the page to the login page
        res.render('home')
    }catch(error){                              // to check whether any error took place while connecting with the mongodb
        console.error("Error inserting the data", error)
        res.status(500).send("Error inserting the data")
    }

})

// connecting with the port

app.listen(4000, ()=>{
    console.log("Server connected to the port 4000....!");
})