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
    global.conn.collection('customers').insertOne(customer,callback);
}

//Aviso Mongodb update esta depreciada, vai ser subtituído por updateOne
function updateCustomer(id,customer,callback){
    global.conn.collection('customers').update(
        {_id:new objectID(id)},
        customer,
        callback
    );
}

function patchCustomer(id,updates,callback){
    global.conn.collection('customers').updateOne(
        {_id:new objectID(id)},
        {$set:updates},
        callback
    );
}

function deleteCustomer(id,callback){
    global.conn.collection('customers').deleteOne({_id: new objectID(id)},callback);
}

module.exports = {findCustomers,findCustomer,insertCustomer,updateCustomer,patchCustomer,deleteCustomer};