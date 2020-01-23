const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const personnel = require('./models/personnel');

const app = express();
app.use(bodyParser.json());





app.listen(process.env.PORT || 3000,()=>{
    console.log('server running on port 3000');
});
