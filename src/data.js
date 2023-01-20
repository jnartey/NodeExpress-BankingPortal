const fs = require('fs');
const path = require('path');

//Reading data from json files
const accountData = fs.readFileSync(path.join(__dirname, '/json/accounts.json'), {encoding:'UTF8'});
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname, '/json/users.json'), {encoding:'UTF8'});
const users = JSON.parse(userData);

const writeJSON = () => {
  //Storing JSON string in accountJSON variable
  const accountsJSON = JSON.stringify(accounts);

  try {
    fs.writeFileSync(path.join(__dirname, '/json/accounts.json'), accountsJSON, 'utf8');
  } catch (error) {
    console.error(error);
  }
}

module.exports = {accounts, users, writeJSON};