const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const boddyParser = require('vody-parser');

const app = express();

// Body parser middleware
app.use(boddyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//Db config
const db = require('./config/keys').mongoURI;
//connect to mongodb
mongoose.connect(db)
.then(() => console.log('MongoDb connected'))
.catch(err => console.log(err));
//First route
app.get ('/',(req,res) => res.send("hello!"));
const port = 7002
app.listen(port,()=> console.log(`Server running on port ${port}`));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts)
