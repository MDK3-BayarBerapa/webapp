function BayarBerapa(){
  var api_server = "https://microsoft-apiapp6fbd40dc94904fed8e3421fd2a081a02.azurewebsites.net:443/api";
  var Client = require('node-rest-client').Client;
  this.rest_client = new Client();
  this.rest_client.registerMethod("getProvinsi", api_server + "/GetDaftarProvinsi", "GET");
  this.rest_client.registerMethod("getPemda", api_server + "/GetDaftarPemda", "GET");
  this.rest_client.registerMethod("getJenisLayanan", api_server + "/GetJenisLayanan", "GET");
  this.rest_client.registerMethod("submitMasyarakat", api_server + "/InputDataVersiMasyarakat", "POST");
  this.rest_client.registerMethod("getDetailBayar", api_server + "/GetDetailBayar", "GET");
  this.rest_client.registerMethod("getDataBayarPerProvinsi", api_server + "/GetDataBayarPerProvinsi", "GET");
  this.rest_client.registerMethod("getDataBayarPerDati2", api_server + "/GetDataBayarPerDati2", "GET");
  //this.rest_client.registerMethod("");
}

BayarBerapa.prototype.getProvinsi = function(callback) {
  var args = {
    data: "",
    headers: {"Content-Type": "application/json"}
  }
  this.rest_client.methods.getProvinsi(args, function(data, res){
    callback(data);
  });
}

BayarBerapa.prototype.getPemda = function(prov_id, callback){
  console.log(prov_id);
  var args = {
    data: "",
    //path:{"provinsi": prov_id},
    parameters:{IDProvinsi: prov_id},
    headers: {"Content-Type": "application/json"}
  }
  this.rest_client.methods.getPemda(args, function(data, res){
    console.log(data);
    callback(data);
  });
}

BayarBerapa.prototype.getJenisLayanan = function(callback) {
  var args = {
    data: "",
    headers: {"Content-Type": "application/json"}
  };
  this.rest_client.methods.getJenisLayanan(args, function(data, res){
    callback(data);
  });
}

BayarBerapa.prototype.postTransaksi = function(arg, callback) {
  var args = {
    data: arg,
    headers: {"Content-Type": "application/json"}
  };
  this.rest_client.methods.submitMasyarakat(args, function(data, res){
    callback(data);
  });
}

BayarBerapa.prototype.getDetailBayar = function(pemda_id, callback){
  //console.log(prov_id);
  var args = {
    data: "",
    //path:{"provinsi": prov_id},
    parameters:{IDDAti2: pemda_id},
    headers: {"Content-Type": "application/json"}
  }
  this.rest_client.methods.getDetailBayar(args, function(data, res){
    console.log(data);
    callback(data);
  });
}

BayarBerapa.prototype.getDataBayarPerProvinsi = function(callback) {
  var args = {
    data: "",
    headers: {"Content-Type": "application/json"}
  };
  this.rest_client.methods.getDataBayarPerProvinsi(args, function(data, res){
    callback(data);
  });
}

BayarBerapa.prototype.getDataBayarPerDati2 = function(prov_id, callback) {
  var args = {
    data: "",
    parameters:{IDProv: prov_id},
    headers: {"Content-Type": "application/json"}
  };
  this.rest_client.methods.getDataBayarPerDati2(args, function(data, res){
    callback(data);
  });
}

BayarBerapa.prototype.getDetailBayar = function(dati2_id, callback) {
  var args = {
    data: "",
    parameters:{IDDAti2: dati2_id},
    headers: {"Content-Type": "application/json"}
  };
  this.rest_client.methods.getDetailBayar(args, function(data, res){
    callback(data);
  });
}

module.exports = BayarBerapa;
