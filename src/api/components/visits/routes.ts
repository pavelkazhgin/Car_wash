import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

const express = require('express');
const router = express.Router();
const controller = new (require('./controller').VisitController)();

router.post('/new', 
 async  (req: Request, res: Response) => {
  try {
      if (!(req.body.status && req.body.userId && req.body.carId && req.body.boxId)){
        return res.status(500).send({
          success: false,
          content: {},
          message: `Некорректно переданы данные!`,
          code: 500
        })
      }
      let { status, userId, carId, boxId  } = req.body
      let result = await controller.createVisit(status, userId, carId, boxId)
      return res.status(200).send(result)
  } catch (err) {
      res.status(500).send(err);
  }
})

.delete('/:id', async(req: Request, res: Response)=>{
  try {
    let visitId: number = Number(req.params.id)
      if (!visitId){
        return res.status(500).send({
          success: false,
          content: {},
          message: `Некорректно переданы данные!`,
          code: 500
        })
      }
    let result = await controller.deletePhoto(visitId);
    return res.status(200).send(result);
  } catch (err) {
      res.status(500).send(err);
  }
})

.put('/:id', async(req: Request, res: Response)=>{
  try {
    let visitId: number = Number(req.params.id)
      if (!visitId){
        return res.status(500).send({
          success: false,
          content: {},
          message: `Некорректно переданы данные!`,
          code: 500
        })
      }
    let result = await controller.updatePhoto(visitId);
    return res.status(200).send(result);
  } catch (err) {
      res.status(500).send(err);
  }
})

   

export = router;
