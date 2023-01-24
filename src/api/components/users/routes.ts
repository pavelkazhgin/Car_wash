require('dotenv').config();

import {Request, Response} from 'express';
import { validateLocaleAndSetLanguage } from 'typescript';

const express = require('express');
const router = express.Router();
const controller = new (require('./controller').UserController)();
import  redisCli  from '../../../db/redis/database';

const REFRESH_EXPIRATION: string | undefined = process.env.REFRESH_EXPIRATION;
const HOST:string | undefined  = process.env.HOST;
const PORT:string | undefined  = process.env.PORT;
// const REFRESH_EXPIRATION: string | undefined = undefined;

router.post(
  '/signIn',
   async(req: Request, res: Response) => {
    try {
      const phone: string = req.body.phone;
      const email: string = req.body.email;
      const pass: string  = req.body.pass;

      const result = await controller.signIn(phone, email, pass);
      console.log(5, REFRESH_EXPIRATION);
      if (REFRESH_EXPIRATION){
        // console.log(result);
        res.cookie("access_token", result.content.tokens[0], {
          // secure: true,
          httpOnly: true
        });
        res.cookie("refresh_token", result.content.tokens[1], {
          // secure: true,
          httpOnly: true
        });
        console.log(6, result.content.id );   
        let cash = await redisCli.set(String(result.content.id), JSON.stringify({
            refresh_token: result.content.tokens[1],
            expires: new Date((new Date()).getTime() + Number(REFRESH_EXPIRATION))}))
        if (!cash){
          return res.status(500).send({
            success: false,
            content: {},
            message: `Internal server error`,
            code: 500
          }) 
        }
      } else {
        return res.status(500).send({
          success: false,
          content: {},
          message: `Internal server error`,
          code: 500
        }) 
      }
      console.log(7)
      return res.status(200).send({
        success: true,
        content: { 
          id : result.content.id, 
          firstName: result.content.firstName,
          lastName: result.content.lastName,
          email: result.content.email,},
        message: `Авторизация успешна!`,
        code: 200
      })
    } catch (error) {
      return res.status(500).send({
        success: false,
        content: {},
        message: `Internal server error`,
        code: 500
      })
    }
  })

.post(
  '/signUp', 
   async (req: Request, res: Response) => {
    try {
      let {firstName, lastName, email, pass, phone} = req.body;
      console.log(firstName, lastName, email, pass, phone)
      const result = await controller.signUp(firstName, lastName, email, pass, phone);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send({
        success: false,
        content: {},
        message: `Internal server error`,
        code: 500,
      });
    }
  })

  .post('/logout',
   async (req: Request, res: Response) => {
    console.log('in logout');
    redisCli.del(String(req.body.userId));
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.redirect(`http:/${HOST}:${PORT}/user/signUp`);
   })



export = router;

