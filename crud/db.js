const mongoClient = require("mongodb").MongoClient;

mongoClient.connect("mongodb://localhost:27017/workshop",{useNewUrlParser:true})
    .then(conn => global.conn = conn.db("workshop"))
    .catch(err => console.log(err))

function findAll(callback){
    global.conn.collection("customers").find({}).toArray(callback);
}

function insert(customer,callback){
    global.conn.collection("customers").insert(customer,callback);
}
//O id vindo da página vem como String, por isso devemos converter em ObjectID do mongodb
const objectId = require("mongodb").ObjectID;
function findOne(id,callback){
    global.conn.collection("customers").findOne(
        new objectId(id),
        callback);
}

function update(id,customer,callback){
    global.conn.collection("customers").updateOne(
        {_id:new objectId(id)},
        {$set:customer},
        callback);
}

function deleteOne(id,callback){
    global.conn.collection("customers").deleteOne({_id:new objectId(id)},callback);
}

module.exports = {findAll,insert,findOne,update,deleteOne}