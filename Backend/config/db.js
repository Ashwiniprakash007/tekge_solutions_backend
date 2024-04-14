const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://ashwiniprakash231996:AKOx8Catnm41cfXN@cluster1.xv5nrwv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
);

module.exports = connection;
