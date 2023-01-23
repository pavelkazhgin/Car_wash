require('dotenv').config();

const jwt = require('jsonwebtoken');
import {Request, Response} from 'express';
import  redisCli  from '../db/redis/database';

const REFRESH_EXPIRATION: string | undefined = process.env.REFRESH_EXPIRATION;
const REFRESH_SECRET: string | undefined  = process.env.REFRESH_SECRET; 
const ACCESS_EXPIRATION: string | undefined  = process.env.ACCESS_EXPIRATION; 
const ACCESS_SECRET: string | undefined  = process.env.ACCESS_SECRET; 

interface PayloadToken {
  uid: number
}
class JWTService {

  constructor(){};
  
   async generateTokens(userId: number){
    if (ACCESS_SECRET && ACCESS_EXPIRATION && REFRESH_SECRET){
      let payload: PayloadToken = {uid: userId};
        let access_token: string  = await jwt.sign(payload, ACCESS_SECRET, {
          expiresIn: Number(ACCESS_EXPIRATION)
        })
        let refresh_token: string  = await jwt.sign(payload, REFRESH_SECRET)
        if (!(access_token && refresh_token)) return null;
        return [access_token, refresh_token]
    }
    return null
  }

    async validateJwt(req: Request, res: Response, next: void){
      let payload: PayloadToken = {uid: Number(req.body.userId)}

      return new Promise((resolve, reject) => {
        if(ACCESS_SECRET && ACCESS_EXPIRATION && REFRESH_SECRET && REFRESH_EXPIRATION){
          let accesstoken: string | null = req.cookies.access_token || null;
          let refreshtoken:  string | null = req.cookies.refresh_token || null;
  
        if (accesstoken && refreshtoken) {
  
        // They are, so let's verify the access token  
          jwt.verify(accesstoken, ACCESS_SECRET, async function(err: any, decoded: PayloadToken) {
  
            if (err) {
              if (err.name === "TokenExpiredError") {
                let redis_token = redisCli.get(decoded.uid, function(err: any, val: string) {
                  return err ? null : val ? val : null;
                });
  
                if (
                  !redis_token ||
                  redis_token.refresh_token === refreshtoken
                ) {
                  reject("Обнаружена попытка взлома");
                } else {
                  if (redis_token.expires > new Date()) {
                    let refresh_token = await jwt.sign(payload, REFRESH_SECRET, {
                      expiresIn: Number(REFRESH_EXPIRATION)
                    });
  
                    res.cookie("__refresh_token", refresh_token, {
                      // secure: true,
                      httpOnly: true
                    });
  
                    let refreshTokenMaxage = new Date((new Date()).getTime() + Number(REFRESH_EXPIRATION)); // env in ms
                    redisCli.set(
                      decoded.uid,
                      JSON.stringify({
                        refresh_token: refresh_token,
                        expires: refreshTokenMaxage
                      }),
                    );
                  }
  
                  let token = jwt.sign({ uid: decoded.uid }, process.env.ACCESS_SECRET, {
                    expiresIn: Number(ACCESS_EXPIRATION),
                  });
  
                  res.cookie("__access_token", token, {
                    httpOnly: true
                  });
                  resolve({
                    res: res,
                    req: req
                  });
                }
              } else {
                reject(err);
            }
          } else {
            resolve({
              res: res,
              req: req
            });
          }
        });
      } else {
          reject("Токены отсутствуют")
        };
        } else {
          reject("no credentials")
        }
    });
  }
}


module.exports = {JWTService};


