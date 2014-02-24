var Record = require('../models/record.js');

exports.index = function(req, res){
  res.render('index', { record: '' });
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
      // do nothing if error
    }
  });
  
  // forward to the index page
  res.render('index', { record: newRecord });

};
