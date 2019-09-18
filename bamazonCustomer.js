
const mysql = require("mysql");
const inquirer = require("inquirer");

// get credentials to connect to database 
require('dotenv').config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});


// This function displays products from the database  
const displayInventory = () => {
  console.log(`\n********** OUR INVENTORY **********\n`)
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) throw err;
    // display the content of the table called products
    console.table(res);
  });
};

// This function prompts questions for the customer 
const customerPromts = () => {
  inquirer
  .prompt([
    /* Pass your questions in here */ 
    {
      type: "number",
      name: "id",
      message: "Select the id of the product you would like to purchase",
    }, {
      type: "number",
      name: "quantity",
      message: "Select the quantiy of the product you would like to purchase",
    }

  ])
  .then(response => {
    // Use user feedback for... whatever!!
    
    console.log(response.id);
    console.log(response.quantity);

  });
}


// RUNNING THE APP AFTER THIS LINE
displayInventory();
// customerPromts();
