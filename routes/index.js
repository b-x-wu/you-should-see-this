var express = require('express');
const http = require('http');
var router = express.Router();

express.json();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title : 'Express' });
});

router.post('/addpin', function(req, res) {
  var db = req.db;
  var pins = db.collection('pins');
  // res.send({ debug : "", body : req.body });
  pins.insert(req.body, function(e, result) {
    res.send(
      (e === null) ? { msg : '', body : req.body } : { msg : "Add pin Error: " + e }
    );
  });
});

router.get('/toppin', function(req, res) {
  var db = req.db;
  var pins = db.collection('pins');
  pins.findOne({}, { sort : { _id : -1 } }, function(e, docs) {
    res.json(docs);
  });
});

router.delete('/deletepin', function(req, res) {
  var db = req.db;
  var pins = db.collection('pins');
  pins.findOneAndDelete({}, { sort : { _id : -1 } }, function(e, docs) {
    res.send((e === null) ? { msg : '' } : { msg : "Delete pin Error: " + e });
  });
});

router.get('/allpins', function(req, res) {
  var db = req.db;
  var pins = db.collection('pins');
  pins.find({}, { sort : { _id : -1 } }).toArray(function(e, docs) {
    res.send(docs);
  });
});

module.exports = router;
