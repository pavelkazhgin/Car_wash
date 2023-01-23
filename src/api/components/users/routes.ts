require('dotenv').config();

import {Request, Response} from 'express';

const express = require('express');
const router = express.Router();
const controller = new (require('./controller').UserController)();
import  redisCli  from '../../../db/redis/database';

const REFRESH_EXPIRATION: string | undefined = process.env.REFRESH_EXPIRATION;

router.post(
  '/signIn',
   async(req: Request, res: Response) => {
    try {
      const phone: string = req.body.phone;
      const email: string = req.body.email;
      const pass: string  = req.body.pass;

      const result = await controller.signIn(phone, email, pass);
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
        
        await redisCli.set(result.content.id, JSON.stringify({
            refresh_token: result.content.tokens[1],
            expires: new Date((new Date()).getTime() + Number(REFRESH_EXPIRATION))
          }),
        )
      } else {
        new Error(); 
      }
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
    redisCli.del(req.body.id);
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.redirect("/user/signUp");
   })



export = router;

