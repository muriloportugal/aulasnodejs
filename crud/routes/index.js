var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  global.db.findAll((e,docs)=>{
    if(e){return console.log(e);}
    res.render('index', { docs });
  });
});

/* GET pagina de cadastro */
router.get('/new',function(req,res,next) {
  res.render('new',{title:"Cadastro de Cliente",doc:{},action:"/new"});
});

/* Post cadastra novo cliente */
router.post('/new',function(req,res,next){
  const nome  = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf    = req.body.uf;
  global.db.insert({nome,idade,uf},(err,result)=>{
    if(err){return console.log(err);}
    res.redirect('/?new=true');
  });
});

/* GET Editar cliente */
router.get('/edit/:id',function(req,res,next){
  var id = req.params.id;
  global.db.findOne(id,(e,doc)=>{
    if(e){return console.log(e);}
    //console.log(doc.nome);
    res.render('new',{title:'Edição de Cliente',doc:doc,action:'/edit/'+doc._id});
  });
});

/* POST Update dados do cliente */
router.post('/edit/:id',function(req,res,next){
  const id = req.params.id;
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;

  global.db.update(id,{nome,idade,uf},(e,result)=>{
    if(e){return console.log(e);}
    res.redirect('/?edit=true');
  });

});

/* GET Delete Cliente */
router.get('/delete/:id',function(req,res){
  var id = req.params.id;
  global.db.deleteOne(id,(e,result)=>{
    if(e){return console.log(e);}
    res.redirect('/?delete=true');
  });
});

module.exports = router;