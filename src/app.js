// importing the modules
require('dotenv').config()
const express = require('express')
const path = require('path')
const ejs = require('ejs')
const collection = require('./mongodb')


const app = express()
const port = 3000 || process.env.PORT

// for parsing the user input data
app.use(express.urlencoded({extended :true}))
app.use(express.json())

// setting the static files
app.use(express.static('public'))

// setting the view page and the path
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'..', 'views'));


// rendering the login page

app.get('/',(req ,res)=>{
    res.render('login')
}) 


// rendering the signup page

app.get('/signup',(req, res)=>{
    res.render('signup')
})


// rendering the admin page

app.get('/admin',(req, res)=>{
    res.render('admin')
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

app.post('/home', async(req ,res ,next)=>{

    try{
        const check = await collection.findOne({name : req.body.name,password : req.body.password})
        
        console.log(check);
        
            if(check.name === req.body.name && check.password === req.body.password){
                res.render('home',{check})
                console.log('Welcome user')
                console.log(check);
            } else {
               return next();
            }
        

    } catch {
        res.redirect('/')
    }

})


// admin credentials..
const admin_details = {
        name1 :'Nischal',
        password1 : 'red',
        role : 'admin'
    }
    
// rendering the adminpanel with the credentials 

app.post('/adminpanel',(req, res)=>{

    const {name, password} = req.body

    if(name===admin_details.name1 && password === admin_details.password1){
        res.render('adminpanel',{name})
        console.log(`Welcome ${name}`);
    } else {
        res.redirect('/')
        console.log("Invalid credentials of the admin");
    }
})

// connecting with the port

app.listen(port, ()=>{
    console.log(`Server connected to the port ${port}..!`);
})