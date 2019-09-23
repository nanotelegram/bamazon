const mysql = require("mysql");
const inquirer = require("inquirer");

// get credentials to connect to database
require("dotenv").config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// This function displays products from the database and promt customer to shop with us
const displayInventory = () => {
  console.log(`\n********** SELECT FROM OUR INVENTORY **********\n`);
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) throw err;
    // display the content of the table named products
    console.table(res);
    console.log("\n");

    // protm the user about shopping with us
    inquirer
      .prompt([
        {
          type: "list",
          name: "answer",
          message: "Would you like to shop with Us Today?",
          choices: ["YES", "NO"]
        }
      ])
      .then(response => {
        let selectedAnswer = response.answer;
        if (selectedAnswer != "YES") {
          console.log(`\tYour answer is ${selectedAnswer}`);
          console.log(`\tThen we wish you a wonderful day`);
          console.log(`\tWe will look forward to seeing you soon!\n`);
          return connection.end();
        } else {
          console.log("\tWelcome to our store!");
          return shop();
        }
      });
  });
};

// This function takes order from the customer
const shop = () => {
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) throw err;

    // response from the database and quering the user
    inquirer
      .prompt([
        /* Pass your questions in here */
        {
          type: "number",
          name: "id",
          message: "Select the id of the product you would like to purchase",
          validate: function (value) {
            for (let i = 0; i < res.length; i++) {
                if (value == res[i].item_id) {

                    return true;
                }
            }
            console.log(`\nPlease enter a valid id`)
            return false;

        }
        },
        {
          type: "number",
          name: "quantity",
          message:
            "Select the quantiy of the product you would like to purchase", 
            validate: function (value) {
              if (isNaN(value) || (value<1)) {
                  console.log(`\nPlease enter a valid number!`)
                  return false;
              }
              return true;
          }
        }
      ])
      .then(answers => {
        // Use user feedback for... whatever!!
        // var selectedItemID = answers.id;
        // var selectedQuantity = answers.quantity;
      });
  });
};

// RUN APP HERE
displayInventory();
