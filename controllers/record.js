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


exports.sendRecord=(req,res)=>{

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.user, 
      pass: process.env.pass, 
    },
  });
  let table=`<table style=" width:450px;margin:0;" cellpadding="15" cellspacing="1" border="2">
  <tr>
    <th>Name</th>
    <th>Results</th>
    <th>Photo</th>
  </tr>
  <tr>
    <td>${req.body.name}</td>
    <td>${req.body.result}</td>
    <td><img src='${req.body.url}' width='100' height='100' /></td>
  </tr>
</table>`
  const mailOptions = {
    from: `Pneumonia detector <${process.env.user}>`, // sender address
    to: req.body.emailto, 
    subject: req.body.subject,
    html:table

  };
  
  // send mail with defined transport object
  transporter.sendMail(mailOptions,(err,info)=>{
      if(err){
          console.log(err)
      }else{
          console.log('email sent success')
          res.status(200).json({
            info
          })
      }
  });
}
