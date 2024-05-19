const express = require('express')
const app = express() 

const userRoutes = require('./routes/User')
const profileRoutes = require('./routes/Profile')
const paymentRoutes = require('./routes/Payments')
const courseRoutes = require('./routes/Course')

const database = require('./config/database')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {cloudinaryConnect} = require('./config/cloudinary.js');
const fileUpload = require('express-fileupload')
require('dotenv').config()

const PORT = process.env.PORT || 4000;

// database se connect karo 
database.connect()

//  middlewares define karo 
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
)
// [ Manish ]: learn about the importance of CORS and why we are setting origin as the frontend's URL
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir:'/tmp',
    })
)

// cloudinary connection 
cloudinaryConnect();

// routes mounting 
app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/profile', profileRoutes)
app.use('/api/v1/course', courseRoutes)
app.use('/api/v1/payment', paymentRoutes)



// adding a default route 
app.get('/', (req,resp) => {
    return resp.status(200).json({
        success: true,
        message: "Yes your server is UP and runnning... "
    })
})


// activate the server 
app.listen(PORT, () => {
    console.log("Your application is UP and running at PORT : ", PORT);
})