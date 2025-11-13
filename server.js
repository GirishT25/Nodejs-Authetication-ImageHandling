require('dotenv').config();
const express = require('express')
const app = express();
app.use(express.json());
const Database = require('./database/DB.js')
const routes = require('./routes/auth-routes.js');
const Homeroutes = require('./routes/home-route.js');
const AdminRoutes = require('./routes/admin-route.js');
const uploadRoutes = require('./routes/image-upload.js');


// database connection
Database();
// console.log("Database connected successfully 25 ")

const PORT = process.env.PORT || 3000

app.use('/api/auth' , routes);
app.use('/api/home' , Homeroutes);
app.use('/api/admin' , AdminRoutes);
app.use('/api/image' , uploadRoutes);




app.listen(PORT , ()=>{
    console.log(`Server is listening on the ${PORT}`);
})