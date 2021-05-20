var express = require("express");
var router = express.Router();
const { addRecord, getRecord } = require("../controllers/record");

router.post(
  "/addRecord",
  addRecord
);

router.post(
 "/getRecord",
 getRecord
);

module.exports = router;