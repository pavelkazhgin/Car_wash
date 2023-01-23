import {Request, Response} from 'express';


const express = require('express');
const router = express.Router();
const controller = new (require('./controller').UserController)();

router.post(
  '/signIn',
   async(req: Request, res: Response) => {
    try {
      const phone: string = req.body.phone;
      const email: string = req.body.email;
      const pass: string  = req.body.pass;

      const result = await controller.signIn(phone, email, pass);
      console.log(result);
      res.cookie("access_token", result.content.authToken.token, {
        httpOnly: true
      });
      res.cookie("refresh_token", result.content.refresh_token, {
        httpOnly: true
    });
      return res.status(200).send(result)
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

  // .app.post('/logout',
  //  async (req: Request, res: Response) => {
  //   redis.del(req.body.id);
  //   res.clearCookie("access_token");
  //   res.clearCookie("refresh_token");
  //   res.redirect("/");
  //  })



export = router;

