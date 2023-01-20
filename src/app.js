const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const {accounts, users, writeJSON} = require("./data");

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

app.get('/savings', (req, res) => {
  res.render('account', {
    account: accounts.savings
  });
});

app.get('/checking', (req, res) => {
  res.render('account', {
    account: accounts.checking
  });
});

app.get('/credit', (req, res) => {
  res.render('account', {
    account: accounts.credit
  });
});

app.get('/transfer', (req, res) => {
  res.render('transfer');
});

app.post('/transfer', (req, res) => {
  //Getting post values
  //const {from, to, amount} = req.body;
  let from = req.body.from;
  let to = req.body.to;
  let amount = req.body.amount;

  //Calculating new balances
  accounts[from].balance = parseInt(accounts[from].balance) - parseInt(amount);
  accounts[to].balance = parseInt(accounts[to].balance) + parseInt(amount);

  writeJSON();
  res.render('/transfer', {message: "Transfer Completed"});

});

app.get('/payment', (req, res) => {
  res.render('payment', {account: accounts.credit});
});

app.post('/payment', (req, res) => {
  //Getting post values
  let amount = req.body.amount;
  accounts.credit.balance = parseInt(accounts.credit.balance) - parseInt(amount);
  accounts.credit.available = parseInt(accounts.credit.available) + parseInt(amount);

  writeJSON();
  res.render('payment', { message: "Payment Successful", account: accounts.credit});

});

//Server listening on port 3000
app.listen(PORT, () => {
  console.log(`PS Project Running on port ${PORT}!`);
});
