//import database config
const db = require("../data/dbConfig");

//DB helpers
function getAllAccounts() {
  return db("accounts");
}

function getAccountById(id) {
  return db("account")
    .where({ id })
    .select("id", "account", "budget");
}

function insertNewAccount({ name, budget }) {
  return db("accounts").insert({ name, budget });
}

function updateAccountById({ id, name, budget }) {
  return db("accounts")
    .where({ id })
    .update({ name, budget });
}

function deleteAccountById(id) {
  return db("accounts")
    .where({ id })
    .delete();
}

module.exports = {
  getAllAccounts,
  getAccountById,
  insertNewAccount,
  updateAccountById,
  deleteAccountById
};
