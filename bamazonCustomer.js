
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


// This function displays products from the database and promts questions to customer
const displayInventory = () => {
  console.log(`\n********** OUR INVENTORY **********\n`)
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) throw err;
    // display the content of the table named products
    console.table(res);
    console.log('\n\n');
    // ask customer to choose products 
    customerPromts();
  });
};

// This function prompts customers questions 
const customerPromts = () => {
  inquirer
  .prompt([
    /* Pass your questions in here */ 
    {
      type: "number",
      name: "id",
      message: "Select the id of the product you would like to purchase ",
    }, {
      type: "number",
      name: "quantity",
      message: "Select the quantiy of the product you would like to purchase",
    }

  ])
  .then(response => {
    // Use user feedback for... whatever!!
    // console.log(response.id);
    // console.log(response.quantity);


  });
}



// RUNNING THE APP AFTER THIS LINE
displayInventory();
// customerPromts();