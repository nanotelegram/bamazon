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

    // end connection after display the product 
    connection.end();
  });
};

const customerPromts = () => {
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
        message: "Select the quantiy of the product you would like to purchase",
        filter: Number
      }
    ])
    .then(response => {
      // Use user feedback for... whatever!!
      // console.log(response.id);
      // console.log(response.quantity);
      let selectedItemID = response.id;
      let selectedQuantity = response.quantity;

      connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        // display the content of the table named products
        for (let i = 0; i < res.length; i++) {
          console.log(res[i].item_id);
        }
      });


      // if (selectedItemID <= 0 || selectedItemID == "") {
      //   console.log("\n>>> Invalid input! Item number must be greater than 0 <<<\n");
      //   return customerPromts();
      // } else if (selectedQuantity <= 0 || selectedQuantity == "") {
      //   console.log("\n>>> Invalid input! Quantity must be greater than 0 <<<\n");
      //   return customerPromts();
      // } 
      
      // for (let i = 0; i< response.length; i++ ) {
      //   if (selectedItemID == response[i].item_id && selectedQuantity <= response.length) {
      //     return true;
      //   } else {
      //    console.log(`Invalid input. Please Try again`)
      //   }
      // }

 

    });
};

const checkingInventory = () => {
    
}

// RUN APP HERE
displayInventory();
customerPromts();
