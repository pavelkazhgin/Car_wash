require('dotenv').config();
const jwt = require('jsonwebtoken');
import {Request, Response} from 'express';

export class JWTService {

  constructor(){};
  
   generateAccessToken(payload: any, req: Request, res: Response, next: void): string {
    let { userId } = req.body;

    console.log(payload)  
    return jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '15s' })
  }

  generateRefreshToken(payload: any): string {
    return  jwt.sign(payload, process.env.REFRESH_SECRET)
  }
}


// module.exports = {JWTService};
