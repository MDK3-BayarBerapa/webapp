var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:view', function(req, res, next) {
  var view = req.params.view;
  res.render(view);
});


module.exports = router;
