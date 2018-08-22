var connection = require("./connection.js");

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

//test purpose
// console.log(objToSql({name: "Peter", married: true}));

var orm = {
  selectAll: function(tableName, callback) {
    var queryString = "SELECT * FROM " + tableName +";";
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      console.log(queryString);
      console.log("--------------------");
    //   console.log(result);
    //   console.log("");
      callback(result);
    });
  },
  insertOne: function(tableName, cols, vals, callback) {
    var queryString = "INSERT INTO " + tableName;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";
    
    connection.query(queryString, vals, function(err, result) {
      if (err) throw err;
      
      console.log(queryString);
      console.log("--------------------");
    //   console.log(result);
    //   console.log("");
      callback(result);
    });
  },
  updateOne: function(tableName, objColVals, condition, callback) {
    var queryString ="UPDATE " + tableName;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;
    
    console.log(queryString);
    connection.query(
      queryString,
      function(err, result) {
        if (err) throw err;
        
        console.log(queryString);
        console.log("------------------");
        // console.log(result);
        // console.log("");
        callback(result);
      }
    );
  }
};


module.exports = orm;