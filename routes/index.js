var Record = require('../models/record.js');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.mouse = function(req, res){
  
  console.log("req.session.id="+req.session.sid);

  var newRecord = new Record({
    sessionId: req.session.id
    , memberId: req.query.memberId
    , ipAddress: req.ip
    , timestamp: new Date()
    , elementName: req.query.elementName
    , pathName: req.query.pathName
    , queryString: req.query.queryString
    , type: req.query.type
  });

  console.log(newRecord);

  newRecord.save(function(err) {
    if (err) {
      //错误不做任何处理
    }
  });
};