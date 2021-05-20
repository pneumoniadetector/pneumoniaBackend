require("dotenv").config();
const Record = require("../models/record");

exports.addRecord = (req, res) => {
 
  const record = new Record(req.body);
  record.save((err, record) => {
    if (err) {
      console.log(err)
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }
    res.json({
      record
    });
  });
};

exports.getRecord = (req, res) => {
  Record.find({uid:req.body.uid},(err,records)=>{
    return res.json({
      data: records
    })
  })
}