const express = require('express');
const mongoose = require('mongoose');

const app = express()

mongoose.connect('mongodb://localhost:27017/pollit')

app.listen(5000, () => {
    console.log("Server is running")
}) 