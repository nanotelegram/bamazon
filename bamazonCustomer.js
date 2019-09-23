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
          console.log("\tWelcome to BAMAZON!");
          return shop();
        }
      });
  });
};

const checkInventory = (id, quantity) => {
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) throw err;
    // console.log(`\tYour Produc ID ${id}`);
    // console.log(`\tYour Procut Quantity ${quantity}`);
    // // validate user's inputs  
    // if (id <= 0) {
    //   console.log("\tInvalid Id. Select a valid id");
    //   return shop();
    // } if (id = "NaN") {
    //   console.log(`\tInvalid input. ID cannot be left empty`);
    //   return shop();
    // }

    for (let i = 0; i < res.length; i++) {
      let productID = res[i].item_id;
      let productQunatity = res[i].stock_quantity;
      let producName = res[i].product_name;
      let productPrice = res[i].price;
      let total = quantity * productPrice;
      if (id == productID ) {
        console.log(`\tSelected item id: ${id}`);
        console.log(`\tSelected quanity: ${quantity}`);

        console.log(`\tProduct name: ${producName}`);
        console.log(`\tUnits avialable: ${productQunatity}`)
        console.log(`\tPrice per unit: ${productPrice}`);
        console.log(`\tYour total is: $${total} `)
      }
    }
    updateInventory(id, quantity);
    goodByeMessage();
  });
}

// This function takes order from the customer
const shop = () => {
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: "number",
        name: "id",
        filter: Number,
        message: "Select the id of the product you would like to purchase"
      },
      {
        type: "number",
        name: "quantity",
        filter: Number,
        message: "Select the quantiy of the product you would like to purchase"
      }
    ])
    .then(answers => {
      var selectedItemID = parseInt(answers.id);
      var selectedQuantity = parseInt(answers.quantity);
      checkInventory(selectedItemID, selectedQuantity);
    });
};

const updateInventory = (updateID, updateQuantity) => {
  console.log(`Inventory updated`);
  connection.end();
}

const goodByeMessage = () => {
  console.log(`\tThank you for shopping with Us`);
  console.log(`\tHave a wonderfull day!`);
  console.log(`\tWe will look forward to see you soon`);
}

// RUN APP HERE
displayInventory();