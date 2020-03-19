//import libraries
const express = require("express");

const accounts = require("./account-model");

//activate routers
const router = express.Router();

router.get("/api/accounts", (req, res) => {
  accounts
    .getAllAccounts()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error retrieving the account" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params.id;
  accounts
    .getAccountById(id)
    .then(account => {
      if (account) {
        res.json(account);
      } else {
        res.status(404).json({ message: "There is no account with this id" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error retrieving account" });
      console.log(error);
    });
});

router.post("/", (req, res) => {
  const { name, budget } = req.body;
  if (!name || !budget) {
    res
      .status(404)
      .json({ message: "Insert name and budget to create a new account" });
  } else {
    accounts
      .insertNewAccount({ name, budget })
      .then(account => {
        res.status(201).json(account);
      })
      .catch(error => {
        console.log(error);
        res
          .status(500)
          .json({ message: "There was an error creating this new account" });
      });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, budget } = req.body;
  accounts
    .updateAccount({ id, name, budget })
    .then(account => {
      if (account) {
        res.status(200).json({ message: "Account has been updated" });
      } else {
        res
          .status(404)
          .json({ message: "There was an error finding this account" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error updating this account" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  accounts
    .deleteAccount(id)
    .then(account => {
      res
        .status(200)
        .json({ message: "Account has been deleted successfully" });
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error delete this account" });
    });
});

module.exports = router;
