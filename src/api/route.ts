const express = require('express');
const router = express.Router();

router.use('/user', require("./components/users/routes"))
router.use('/car', require("./components/cars/routes"))

module.exports = router;

