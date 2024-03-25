const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const expressLayouts = require('express-ejs-layouts');




//routes
const userRoutes = require('./routes/userRoutes')
const friendsRoutes = require('./routes/friendsRoutes')
const postsRoutes = require('./routes/postsRoutes')
const feedRoutes = require('./routes/feedRoutes')
const uploadroutes = require('./routes/uploadImage')

//middleware 
const {userCheck , requireAuth } = require('./middleware.js/authCheck')
const userStats = require('./middleware.js/userStats')

// Conect db and run server 
// my libs
const conectDb = require('./db/conectdb')
const PORT = process.env.PORT || 3001
const app = express()
conectDb(() => app.listen(PORT , console.log(`server is running on port ${PORT} ...`))  )

//express midllware 
app.use(expressLayouts);
app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

// check user data if logged in 
 app.use('*' , userCheck , userStats , (req , res , next ) => {
    next()
 })
 
 app.use(userRoutes)
 app.use(friendsRoutes)
app.use(postsRoutes)
app.use(feedRoutes)

 app.get('/' , requireAuth , (req , res , next ) => res.render('home' , {
    error : null , data : null , username : null
 }))

 app.use((req , res ) => res.render('404'))





      

