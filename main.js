var mysql = require("mysql");
var prompt = require("prompt");

//  mysql connection
var connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "root",
    database : "Garden"
});

// Connecting to the Garden Database
connection.connect(function(err){
    if(err){
    console.log('Error connecting to Db');
    return;
    }
    console.log('Connection established');

    var schema = {
        properties: {
            ID: {
            message: "Please enter the ID of the product you would like to buy.",
            pattern: /^[0-9][0-9]$|^[0-9]$/,
            required: true
            },
            howMany: {
            message: "Please enter how many you would like to buy.",
            pattern: /^[0-9][0-9]$|^[0-9][0-9][0-9]$/,
            required: true
            }
        }
    };

    var schema2 = {
        properties: {
            AnotherPurchase: {
            message: "Would you like to buy another item?.",
            pattern: /(no|n|yes|y)/,
            required: true
            },
        }
    };

// Function stop to the app
var stopApp = function(){
    return next(err);
}
// Function to start the app
var beginApp = function(){
    connection.query("SELECT * FROM Products", function(err, result) {
        if (err) throw err;
        return (getGardenProducts(result));

      });
}

    // Function to display all of the products available for sale in a table
    var getGardenProducts = function (products){
        console.log("Hello, Welcome to Garden! Here are all of the products, their costs, and current stock.");
        for (var i = 0; i < products.length; i++) {
            var productsResults = "\r\n"+
            "ItemID: " + products[i].ItemID+"\r\n"+
            "Product Description: " + products[i].PlantType+"\r\n"+
            "Department: " + products[i].Type+"\r\n"+
            "Price: $ "+ products[i].Price+"\r\n"+
            "Current Stock: " + products[i].Amount;
            console.log(productsResults);
        }
        userSelectID();
    }

    // Function to get the user selection
    var userSelectID = function(){
        prompt.start();
        console.log("Please enter the ID of the product you would like to buy.");

        prompt.get(schema, function (err, result) {
            if (err){
                console.log(err)
            }
            //console.log(result);
            var userChoiceID = parseInt(result.ID);
            var userChoiceHowMany = parseInt(result.howMany);
            // console.log("id=" + userChoiceID + " how many=" + userChoiceHowMany);

            // Function to check the inventory of an item
            var checkInventory = function(){
                connection.query('SELECT * FROM Products WHERE ItemID =' + userChoiceID, function(err, result) {
                    if (err) throw err;
                    //console.log(result);

                    var userWantsToBuy = userChoiceHowMany;
                    var productInventory = result[0].Amount;
                    var productsPrice = result[0].Price;
                    var isInStock = productInventory - userWantsToBuy;
                    var totalCost= productsPrice * userWantsToBuy;

                    if (userWantsToBuy > productInventory || productInventory === 0){
                        console.log("Apologies but there isn't enough in stock to complete your order. Please try again."+"\r\n"+"\r\n");
                        userSelectID();
                    } else {
                        console.log("There are "+result[0].Amount+" of "+result[0].PlantType);
                        console.log("You are purchasing "+ userWantsToBuy +" "+result[0].PlantType+"s at $"+ result[0].Price+" per item.");
                        console.log("Your total is $"+totalCost);
                        connection.query('UPDATE Products SET Amount = '+isInStock+' WHERE ItemID ='+userChoiceID, function(err, result){
                        if (err) throw err;
                            connection.query('SELECT ItemID, PlantType, Type, Price, Amount FROM products WHERE ItemID ='+userChoiceID, function(err, result){
                                //console.log(result);
                            });
                        });
                        prompt.get(schema2, function (err, result) {
                            if (err){
                                console.log(err)
                            }
                            console.log(result);
                            var userAnswer = result.AnotherPurchase;
                            if (userAnswer === "n" || userAnswer === "no"){
                                stopApp();
                            }else{
                                beginApp();
                            }
                        });
                    }
                  });
            };
            checkInventory();
        });
    }

// start the app
beginApp();
});
