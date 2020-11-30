const express = require('express');
const controller = require("../controllers/controller.js");
let router = express.Router();



// =====================================================================
// 

router.get('/',controller.main);
router.post('/read', controller.read);
router.post('/content', controller.content);



module.exports = router;