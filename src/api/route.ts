const express = require('express');
const router = express.Router();
const JwtAuth = (new (require("../services/jwt_service").JWTService)()).validateJwt


router.use('/user',  require("./components/users/routes"))
router.use('/car', JwtAuth, require("./components/cars/routes"))
router.use('/visit', JwtAuth, require("./components/visits/routes"))


module.exports = router;

