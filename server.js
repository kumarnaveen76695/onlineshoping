const express = require('express');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const connectDB = require('./config/db');
const path = require('path');


mongoose.connect("mongodb+srv://naveen:kumar@cluster0.f7wmb0k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("MongoDB connected successfully!"));

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.get("/", (req, res) => {
    return res.send("Hello World!");
});


app.use('/api/user',require('./routes/user'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/cart',require('./routes/cart'));
app.use('/api/order',require('./routes/order'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000 ;
app.listen(PORT,(req,res) => console.log(`running in ${PORT}`));