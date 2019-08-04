var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  global.db.findAll((e,docs)=>{
    if(e){return console.log(e);}
    res.render('index', { docs });
  });
});

router.get('/new',function(req,res,next) {
  res.render('new',{title:"Cadastro de Cliente",action:"/new"});  
});

router.post('/new',function(req,res,next){
  res.redirect('/?new=true');
});

module.exports = router;
