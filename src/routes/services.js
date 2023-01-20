const express = require('express');
const router = express.Router();

const {accounts, writeJSON} = require("../data");

router.get('/transfer', (req, res) => {
  res.render('transfer');
});

router.post('/transfer', (req, res) => {
  //Getting post values
  //const {from, to, amount} = req.body;
  let from = req.body.from;
  let to = req.body.to;
  let amount = req.body.amount;

  //Calculating new balances
  accounts[from].balance = parseInt(accounts[from].balance) - parseInt(amount);
  accounts[to].balance = parseInt(accounts[to].balance) + parseInt(amount);

  writeJSON();
  res.render('transfer', {message: "Transfer Completed"});

});

router.get('/payment', (req, res) => {
  res.render('payment', {account: accounts.credit});
});

router.post('/payment', (req, res) => {
  //Getting post values
  let amount = req.body.amount;
  accounts.credit.balance = parseInt(accounts.credit.balance) - parseInt(amount);
  accounts.credit.available = parseInt(accounts.credit.available) + parseInt(amount);

  writeJSON();
  res.render('payment', { message: "Payment Successful", account: accounts.credit});

});

module.exports = router;