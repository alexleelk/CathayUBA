var mongodb = require('./db');

function Record(record) {
  this.sessionId = record.sessionId;
  this.memberId = record.memberId;
  this.ipAddress = record.ipAddress;
  this.timestamp = record.timestamp;
  this.elementName = record.elementName;
  this.pathName = record.pathName;
  this.queryString = record.queryString;
  this.type = record.type;
};

module.exports = Record;

//保存功能
Record.prototype.save = function save(callback) {
  //先关闭数据库
  mongodb.close();
  
  // 存入 Mongodb 的文档
  var record = {
    sessionId: this.sessionId
    , memberId: this.memberId
    , ipAddress: this.ipAddress
    , timestamp: this.timestamp
    , elementName: this.elementName
    , pathName: this.pathName
    , queryString: this.queryString
    , type: this.type
  };

  console.log("record="+record);

  mongodb.open(function(err, db) {
    if (err) {
      console.log(err);
    }

    // 读取 records 集合
    db.collection('records', function(err, collection) {
      if (err) {
        mongodb.close();
        console.log(err);
      }

      //console.log("before index");

      // 为 sessionId,timestamp 属性添加索引
      //collection.ensureIndex({"sessionId" : 1, "timestamp" : 1});

      console.log("before insert");

      // 写入 records 文档
      collection.insert(record, 
        {safe: true}, 
        function(err, user) {
          if (err) {
            console.log("insert error");
          } else {
            console.log("insert ok");
          }
          mongodb.close();
        }
      );
    });
  });
};