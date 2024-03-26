var express = require("express");

var router = express.Router();

router.get("", function(req, res){
    res.sendFile(process.cwd() + "/www_root/home.html");
})

module.exports = router;