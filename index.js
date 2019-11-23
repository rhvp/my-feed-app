const express = require('express');
const connection = require('./config/mongoose');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const hbs = require('express-handlebars');
const passport = require('passport')

const {selectOption } = require('./config/customFunctions')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

const expiryDate = new Date(Date.now() + 60 * 60 * 1000)

app.use(session({
    secret: 'sody-secret',
    saveUninitialized: false,
    resave: true,
    cookie: {
        expires: expiryDate
    },
    store: new MongoStore({
        mongooseConnection: connection
    })
}));




app.engine('handlebars', hbs({defaultLayout: 'default', helpers: {select: selectOption}}));
app.set('view engine', 'handlebars');



app.use(passport.initialize());
app.use(passport.session());

const defaultRoutes = require('./routes/defaultRoutes')
const adminRoutes = require('./routes/adminRoutes')
app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);


const port = process.env.PORT ||'5500';

app.listen(port, ()=>{
    console.log('Server running on '+ port);
});