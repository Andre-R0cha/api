var express = require('express');
var router = express.Router();

router.get('/users', async(req, res, next) => {

    res.json({ bb: "Parabens didi" });
});
module.exports = router;