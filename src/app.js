const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const {accounts, users, writeJSON} = require("./data");
const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');

//Setting views and ejs template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//Rendering static contents
app.use(express.static(path.join(__dirname, '/public/')));

//Middleware to handle Post data
app.use(express.urlencoded({extended:true}));

//Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Account Summary',
    accounts: accounts
  });
});

app.get('/profile', (req, res) => {
  res.render('profile', {
    user: users[0]
  });
});

//Calling the accounts route
app.use('/account', accountRoutes);

//Calling the services route
app.use('/services', servicesRoutes);

//Server listening on port 3000
app.listen(PORT, () => {
  console.log(`PS Project Running on port ${PORT}!`);
});
