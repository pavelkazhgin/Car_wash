require('dotenv').config();
const jwt = require('jsonwebtoken');


export class JWTService {

  constructor(){};
  
   generateAccessToken(payload: any): string {
    console.log(payload)
    return jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '15s' })
  }

  generateRefreshToken(payload: any): string {
    return  jwt.sign(payload, process.env.REFRESH_SECRET)
  }
}


// module.exports = {JWTService};
