const mongoose = require('mongoose');

mongoose.connect(process.env.ATLAS_signup_login,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function () {
    console.log(`Connected to Database :: ${this.name}`);
});

module.exports = db;