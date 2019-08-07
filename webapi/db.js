const mongoClient = require('mongodb').MongoClient;
const objectID = require('mongodb').ObjectID;

mongoClient.connect('mongodb://localhost/workshop',{ useNewUrlParser: true })
    .then(conn=>global.conn=conn.db("workshop"))
    .catch(err=>console.log(err));

function findCustomers(callback){
    global.conn.collection('customers').find({}).toArray(callback);
}

function findCustomer(id,callback){
    global.conn.collection('customers').findOne(new objectID(id),callback);
}

function insertCustomer(customer,callback){
    global.conn.collection('customers').insert(customer,callback);
}

function updateCustomer(id,customer,callback){
    console.log(customer);
    global.conn.collection('customers').updateOne(
        {_id:new objectID(id)},
        {$set: customer},
        callback);
}

module.exports = {findCustomers,findCustomer,insertCustomer,updateCustomer}