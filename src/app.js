// importing the modules
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const path = require('path')
const ejs = require('ejs')
const collection = require('./mongodb')


const app = express()
const PORT = process.env.PORT || 3000

// for parsing the user input data
app.use(express.urlencoded({extended :true}))
app.use(express.json())

// session creation
app.use(session({
    secret : 'secretkey',
    saveUninitialized : true,
    resave : false,
}))

// storing the session message
app.use((req ,res ,next)=>{
    res.locals.message = req.session.message
    delete req.session.message
    next()
})

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
            email : req.body.email,
            phone : req.body.phone,
            

            
        }
        console.log(data)
        await collection.insertMany([data])     // inserting the values from the page to the sign-in page
        res.redirect('/')


})

// rendering the homepage if username and password is correct

app.post('/home', async(req ,res ,next)=>{

    try{
        
        const check = await collection.findOne({email : req.body.email,password : req.body.password})
        
        console.log("value inserted in the login page..",check);
        
            if(check.email === req.body.email && check.password === req.body.password){
                res.render('home',{check})
                console.log(`Welcome user :- ${check.email}`)
                console.log(check);
            } else {
                console.log("hi...");
               return next();
            }
        

    } catch {
        console.log("helo...");
        res.redirect('/')
    }

})


// admin credentials..
const admin_details = {
        name1 :'Nischal',
        password1 : 'red',
       
    }
    
// rendering the adminpanel with the credentials 

app.post('/adminpanel',(req, res)=>{

    const {name, password} = req.body

    if(name===admin_details.name1 && password === admin_details.password1){
        res.render('adminpanel',{name})
        console.log(`Welcome admin :- ${name}`);
    } else {
        res.redirect('/')
        console.log("Invalid credentials of the admin");
    }
})

// connecting with the port

app.listen(PORT, ()=>{
    console.log(`Server connected http://localhost${PORT}`);
})