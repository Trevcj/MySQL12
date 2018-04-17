var mysql = require('mysql')
var inquirer = require('inquirer')
var fs = require('fs')
require('console.table')

var connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "root",
    database : "Garden"
});


connection.connect(function(err){
    if(err){
    console.log('Hey your DATABASE is not connecting!');
    return
    }
    console.log('Yay! You got a connection!');
    run();





function run() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err
        var prodTable = []

        for (var i = 0; i < res.length; i++) {
            prodTable.push({ 'Item ID': res[i].ItemID, 'Plant': res[i].PlantType, 'Price': res[i].Price })
        }

        console.log('')
        console.table(prodTable)
        askEm(prodTable);

    })

}

function askEm(itemsArr) {
    inquirer.prompt([{
        name: 'itemID',
        message: 'Enter the ID for the plant you want.'
    }, {
        name: 'quanity',
        message: 'How many plants would you like?'
    }]).then(function(answers) {

        connection.query("SELECT Amount, PlantType FROM products WHERE ItemID=?", [answers.itemID], function(err, res) {
            if (err) throw err

            var newQuanity = res[0].Amount - answers.quanity
            console.log(res[0].Amount + " " + res[0].PlantType + "s left!");

            if (newQuanity < 0) {
                console.log('There is not enough stock for the quanity you chose please try again')
                console.log('Current quanity for Item ID ' + answers.itemID + ' is ' + res[0].Amount)
                run()
            } else {
                connection.query("UPDATE products SET Amount=? WHERE ItemID=?", [newQuanity, answers.itemID], function(err, res) {
                    if (err) throw err
                    console.log('Thanks for buying some plants!')
                    run()
                })
            }
        })
    })
}
});
