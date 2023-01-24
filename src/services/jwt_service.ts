require('dotenv').config();

const jwt = require('jsonwebtoken');
import {NextFunction, Request, Response} from 'express';
import { nextTick } from 'process';
import  redisCli  from '../db/redis/database';

const REFRESH_EXPIRATION: string | undefined = process.env.REFRESH_EXPIRATION;
const REFRESH_SECRET: string | undefined  = process.env.REFRESH_SECRET; 
const ACCESS_EXPIRATION: string | undefined  = process.env.ACCESS_EXPIRATION; 
const ACCESS_SECRET: string | undefined  = process.env.ACCESS_SECRET; 

import { PayloadToken } from '../interfaces/jwt_interfaces';

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

     validateJwt(req: Request, res: Response, next: NextFunction){
      let payload: PayloadToken = {uid: Number(req.body.userId)}
        console.log('this is cook', req.cookies)
        if(ACCESS_SECRET && ACCESS_EXPIRATION && REFRESH_SECRET && REFRESH_EXPIRATION){
          
          let accesstoken: string | null = req.cookies.access_token || null;
          let refreshtoken:  string | null = req.cookies.refresh_token || null;
          if (accesstoken && refreshtoken) {
          console.log('here 1')
          
          jwt.verify(accesstoken, ACCESS_SECRET, async function(err: any, decoded: PayloadToken) { 
            console.log('here 2')
            if(err){
              if(err.name === "TokenExpiredError"){
                console.log('this is payload', payload.uid)
                let redis_token = await redisCli.get(String(payload.uid));
                console.log(redis_token);
                if (!redis_token) redis_token = null;
                if (
                  !redis_token ||
                  redis_token.refresh_token === refreshtoken
                ) {
                  console.log('here 4')
                  res.status(403).send({
                    success: false,
                    content: {},
                    message: `Нет доступа к ресурсу!`,
                    code: 403
                  })
                } else {
                  console.log('here 5')
                  if (redis_token.expires > new Date()){
                    console.log('here 6')
                    let refresh_token = await jwt.sign(payload, REFRESH_SECRET, {
                      expiresIn: Number(REFRESH_EXPIRATION)
                    });

                    res.cookie("refresh_token", refresh_token, {
                      // secure: true,
                      httpOnly: true
                    });

                    let refreshTokenMaxage = new Date((new Date()).getTime() + Number(REFRESH_EXPIRATION)); //env in ms
                    let cash = await redisCli.set(
                      String(decoded.uid),
                      JSON.stringify({
                        refresh_token: refresh_token,
                        expires: refreshTokenMaxage
                      }),
                    );
                    if (!cash){
                      return res.status(500).send({
                        success: false,
                        content: {},
                        message: `Internal server error`,
                        code: 500
                      }) 
                    }
                  }
                    let token = await jwt.sign({ uid: payload.uid }, process.env.ACCESS_SECRET, {
                      expiresIn: Number(ACCESS_EXPIRATION),
                    });

                    res.cookie("access_token", token, {
                      httpOnly: true
                    });
                    console.log('зашел в первй next')
                    next()
                  
                  console.log('here 7')
                }
              }
            } else {

              next()
            }
          })
        } else {
          return res.status(403).send({
            success: false,
            content: {},
            message: `Токены доступа отсутствуют!`,
            code: 403
          })
        }
      } else {
        return res.status(500).send({
          success: false,
          content: {},
          message: `Переменные доступа не переданы!`,
          code: 500
        })
      }
    }
}


export = { JWTService };


