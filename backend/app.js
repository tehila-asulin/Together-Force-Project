require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const VolunteerRouter =require('./routes/volenteerRoutes')
const volunteeringRoutes =require('./routes/volunteeringRoutes')
const organizationRoutes =require('./routes/organizationRoutes')
const bodyParser = require('body-parser');
const app=express();
app.use(bodyParser.json());
app.use('/TogetherForce/volenteerRoutes', VolunteerRouter);
app.use('/TogetherForce/volunteeringRoutes', volunteeringRoutes);
app.use('/TogetherForce/organizationRoutes', organizationRoutes);
 const PORT=process.env.PORT;

mongoose.connect(process.env.CONECTION_URL).then(
    ()=>app.listen(PORT,()=>console.log(`server runing on port ${PORT}`)))
    .catch((error)=>console.log(error.message));    