// importing the modules

require('dotenv').config()
const express = require('express')
// const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const ejs = require('ejs')
const collection = require('./mongodb')


const app = express()
const port = 4000 || process.env.PORT

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

// // admin credentials..
// const admin_details = {
//     name :'Nischal',
//     password : 'red'
// }


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
        res.redirect('/')
    }

    

})




// rendering the admin page by the password which is already set


app.post('/admin',(req, res)=>{

    const {name, password} = req.body

    if(name===admin_details.name && password === admin_details.password){
        res.render('admin')
        console.log("Valid admin....!");
    } else {
        res.redirect('/')
        console.log("Invalid credentials of the admin");
    }
})

// connecting with the port

app.listen(port, ()=>{
    console.log(`Server connected to the port ${port}..!`);
})