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

// This function displays products from the database and connection
const displayInventory = () => {
  console.log(`\n********** SELECT FROM OUR INVENTORY **********\n`);
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) throw err;
    // display the content of the table named products
    console.table(res);
    console.log("\n\n");

    // promt customers about inventory 
    inquirer
      .prompt([
        /* Pass your questions in here */
        {
          type: "number",
          name: "id",
          message: "Select the id of the product you would like to purchase ",
          filter: Number
        },
        {
          type: "number",
          name: "quantity",
          message:
            "Select the quantiy of the product you would like to purchase",
          filter: Number
        }
      ])
      .then(response => {
        let selectedItemID = response.id;
        let selectedQuantity = response.quantity;

        connection.query("SELECT * FROM products", (err, res) => {
          if (err) throw err;
          // display the content of the table named products
          for (let i = 0; i < res.length; i++) {
            console.log(res[i].item_id);
            let itemID = res[i].item_id;
            let itemQuantity = res[i].stock_quantity;
            if (selectedItemID != itemID) {
              console.log(`We don't have this product on the stock. Try again `);
            } else if (selectedItemID < 0) {
              console.log(`Item must be greater than 0. Try again`);
            }

          }
        });
      });
  });
};

// RUNNING APP HERE

displayInventory();
