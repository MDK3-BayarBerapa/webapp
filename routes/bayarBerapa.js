//require('https').globalAgent.options.rejectUnauthorized = false;
var express = require('express');
var router = express.Router();
var BayarBerapa = require('../BayarBerapa');

/* GET home page. */
router.get('/getProvinsi', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  var bb = new BayarBerapa();
  bb.getProvinsi(function(data){
    console.dir(data.toString());
    var ret = JSON.parse(data.toString());
    res.send(ret);
  });
});

router.get('/getPemda/:provinsi', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  var prov_id = req.params.provinsi;
  var bb = new BayarBerapa();
  bb.getPemda(prov_id, function(data){
    console.dir(data.toString());
    var ret = JSON.parse(data.toString());
    res.send(ret);
  });
});

router.get('/getJenisLayanan', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  var bb = new BayarBerapa();
  bb.getJenisLayanan(function(data){
    console.dir(data.toString());
    var ret = JSON.parse(data.toString());
    res.send(ret);
  });
});

router.post('/kirimTransaksi', function(req, res, next) {
  var params = req.body;
  console.log(params);
  //res.send("OK");
  var bb = new BayarBerapa();
  bb.postTransaksi(params, function(){
    res.send("OK");
  });
});

router.get('/getDataBayarPerProvinsi', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  var bb = new BayarBerapa();
  bb.getDataBayarPerProvinsi(function(data){
    console.dir(data.toString());
    var ret = JSON.parse(data.toString());
    res.send(ret);
  });
});

router.get('/getDataBayarPerDati2/:prov_id', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  var prov_id = req.params.prov_id;
  var bb = new BayarBerapa();
  bb.getDataBayarPerDati2(prov_id, function(data){
    console.dir(data.toString());
    var ret = JSON.parse(data.toString());
    res.send(ret);
  });
});

router.get('/getDetailBayar/:dati2_id', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  var dati2_id = req.params.dati2_id;
  var bb = new BayarBerapa();
  bb.getDetailBayar(dati2_id, function(data){
    console.dir(data.toString());
    var ret = JSON.parse(data.toString());
    res.send(ret);
  });
});
module.exports = router;
