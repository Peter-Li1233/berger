var orm = require("../config/orm.js");

var burger = {
    selectAll: function(callback){
        orm.selectAll("burgers", function(result) {
            callback(result);
        });
    },

    insertOne: function(cols, vals, callback){
        orm.insertOne("burgers", cols, vals, function(result) {
        callback(result);
        });
    },

    updateOne: function(objColVals, condition, callback){
        orm.updateOne("burgers", objColVals, condition, function(result) {
        callback(result);
        }); 
    }

}

// Export the database functions for the controller (burgers_Controller.js).
module.exports = burger;

//Test the call back function...
// burger.selectAll(function(result) {
//     console.log(result);
//     console.log("this is another callback");
// });

// burger.insertOne(["burger_name", "devoured"],["blabla",1],function(result) {
//     console.log(result);
//     console.log("one more callback");
// });
// var sample = {
//     burger_name : "Peter li choice",
//     devoured: false
// }

// burger.updateOne(sample, "id = 3", function(result){
//     console.log(result);
//     console.log("the third call back");
// });
