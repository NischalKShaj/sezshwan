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



// rendering the signup page

app.get('/signup',(req, res)=>{
    res.render('signup')
})



// loading the new values from the signup page to the database 

app.post('/', async(req, res)=>{


        const data ={
            name : req.body.name,
            password : req.body.password,

            
        }
        console.log(data)
        await collection.insertMany([data])     // inserting the values from the page to the sign-in page
        res.redirect('/')


})

// rendering the homepage if username and password is correct

app.post('/home', async(req ,res)=>{

    try{
        const check = await collection.findOne({name : req.body.name})
        console.log(check);

        
            if(check.password === req.body.password){
                res.render('home')
                console.log('Welcome user')
            } else {
                res.redirect('signup')
                console.log('invalid user')
            }
        

    } catch {
        res.send('Unexpected error')
    }

})



// connecting with the port

app.listen(4000, ()=>{
    console.log("Server connected to the port 4000....!");
})