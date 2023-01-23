import { Request, Response } from "express";


const express = require('express');
const router = express.Router();
const controller = new (require('./controller').BoxController)();


router.get('/vacants', 
 async  (req: Request, res: Response) => {
  try {
    let result = await controller.getVacantBoxes()
    return res.status(200).send(result)
  } catch (err) {
      res.status(500).send(err);
  }
})

   

export = router;
