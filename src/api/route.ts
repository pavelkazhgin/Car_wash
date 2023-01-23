const express = require('express');
const router = express.Router();

router.use('/user', require("./components/users/routes"))
router.use('/car', require("./components/cars/routes"))
router.use('/visit', require("./components/visits/routes"))


module.exports = router;

