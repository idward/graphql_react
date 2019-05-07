const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const expressGraphQL = require('express-graphql');
const MongoStore = require('connect-mongo')(session);
const models = require('./models');
const schema = require('./schema/schema');

const app = express();

//Passport
const passportConfig = require('./services/auth');

// Replace with your mongoLab URI
const MONGO_URI = `mongodb://idward:!dwardlu0@ds215563.mlab.com:15563/lyrical-graphql`;
if (!MONGO_URI) {
    throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {useNewUrlParser: true});
mongoose.connection
    .on('connect', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'aaabbbccc',
    store: new MongoStore({
        url: MONGO_URI,
        mongooseCollection: mongoose.connection
    })
}));

app.use(cors());
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//GraphQL
// app.use('/graphql', (req, res, next) => {
//     console.log(req.session);
//     return expressGraphQL({
//         schema,
//         graphiql: true
//     })(req, res, next);
// });
app.use('/graphql', expressGraphQL({
    graphql: true,
    schema
}));

module.exports = app;
