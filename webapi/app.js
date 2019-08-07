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

//GET Busca todos clientes
router.get('/clientes',(req,res)=>{
    global.db.findCustomers((err,docs)=>{
        if(err) res.status(500).json(err);
        else res.json(docs);
    });
});
//GET :id consultar cliente
router.get('/clientes/:id',(req,res)=>{
    global.db.findCustomer(req.params.id,(err,doc)=>{
        if(err) res.status(500).json(err);
        else res.json(doc);

    });
});
//POST cadastrar cliente
router.post('/clientes',(req,res)=>{
    const customer = req.body;
    global.db.insertCustomer(customer,(err,result)=>{
        if(err) res.status(500).json(err);
        else res.json({message:'Cliente cadastrado com sucesso!'});
    });
});
//PUT alterar cliente
router.put('/clientes/:id',(req,res)=>{
    const ids = req.params.id;
    const customer = req.body;
    global.db.updateCustomer(ids,customer,(err,result)=>{
        if(err) res.status(500).json(err);
        else res.json({message:'Cliente alterado com sucesso!'});
    });
});

app.use(router);

/* Inicializa servidor */
app.listen(port);
console.log('API Funcionando!');