const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

//Setting views and ejs template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//Rendering static contents
app.use(express.static(path.join(__dirname, '/public/')));

//Middleware to handle Post data
app.use(express.urlencoded({extended:true}));

//Reading data from json files
const accountData = fs.readFileSync(path.join(__dirname, '/json/accounts.json'), {encoding:'UTF8'});
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname, '/json/users.json'), {encoding:'UTF8'});
const users = JSON.parse(userData);


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
  const {from, to, amount} = req.body;

  //Calculating new balances
  accounts[from].balance = parseInt(accounts[from].balance) - parseInt(amount);
  accounts[to].balance = parseInt(accounts[to].balance) + parseInt(amount);

  //Storing JSON string in accountJSON variable
  const accountsJSON = JSON.stringify(accounts);

  try {
    console.log(path.join(__dirname, '/json/accounts.json'));
    fs.writeFileSync(path.join(__dirname, '/json/accounts.json'), accountsJSON, 'utf8');
    res.render('transfer', {message: "Transfer Completed"});
  } catch (error) {
    res.render('transfer', {error});
    console.error(error);
  }
});

app.get('/payment', (req, res) => {
  res.render('payment', {account: accounts.credit});
});

app.post('/payment', (req, res) => {
  //Getting post values
  const amount = req.body.amount;
  accounts.credit.balance = parseInt(accounts.credit.balance) - parseInt(amount);
  accounts.credit.available = parseInt(accounts.credit.available) + parseInt(amount);

  //Storing JSON string in accountJSON variable
  const accountsJSON = JSON.stringify(accounts);

  try {
    fs.writeFileSync(path.join(__dirname, `/json/accounts.json`), accountsJSON, 'utf8');
    res.render('payment', { message: "Payment Successful", account: accounts.credit});
  } catch (error) {
    res.render('payment', {error});
    console.error(error);
  }

});

//Server listening on port 3000
app.listen(PORT, () => {
  console.log(`PS Project Running on port ${PORT}!`);
});
