global.db = require('./db'); //Faz a conexão com o banco ao carregar o módulo db
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrão

/* Utiliza o middleware body-parser para converter o body das requisições em JSON */
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/* Rotas */
const router = express.Router();

router.get('/',(req,res)=>{
    res.json({message:'Funcionando!'});
});

router.get('/clientes',(req,res)=>{
    global.db.findCustomers((err,docs)=>{
        if(err) res.status(500).json(err);
        else res.json(docs);
    });
});

router.get('/clientes/:id',(req,res)=>{
    global.db.findCustomer(req.params.id,(err,doc)=>{
        if(err) res.status(500).json(err);
        else res.json(doc);

    });
});

router.post('/clientes',(req,res)=>{
    const customer = req.body;
    global.db.insert(customer,(err,result)=>{
        if(err) res.status(500).json(err);
        else result.json({message:'Cliente cadastrado com sucesso!'});
    });
});

app.use(router);

/* Inicializa servidor */
app.listen(port);
console.log('API Funcionando!');