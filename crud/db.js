const mongoClient = require("mongodb").MongoClient;

mongoClient.connect("mongodb://localhost:27017/workshop",{useNewUrlParser:true})
    .then(conn => global.conn = conn.db("workshop"))
    .catch(err => console.log(err))

function findAll(callback){
    global.conn.collection("customers").find({}).toArray(callback);
}

module.exports = {findAll}