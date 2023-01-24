import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

const express = require('express');
const router = express.Router();
const controller = new (require('./controller').CarController)();
const jwt_service = new (require('../../../services/jwt_service').JWTService)();

// router.post('/new', async (req: Request, res: Response) => {
//   jwt_service.validateJwt(req, res).then( (result : [Request, Response]) => {
//     let req = result[0];
//     let res = result[1];
//      async ( req: Request , res: Response ) => {
//       try {
//         console.log('This is data', req.body.number, req.body.brand, req.body.model, req.body.userId)
//           if (!(req.body.number && req.body.brand && req.body.model && req.body.userId)){
//             return res.status(500).send({
//               success: false,
//               content: {},
//               message: `Некорректно переданы данные!`,
//               code: 500
//             })
//           }
//           let { brand, model,number, userId  } = req.body
//           if(!req.files) {
//             let result = await controller.uploadCar(brand, model, number, userId)
//             return res.status(200).send(result)
//           } else {
//             let photo: UploadedFile = req.files.file;
//             let result = await controller.uploadCarwithPhoto(brand, model, number, userId, photo);
//             console.log('this is ', result)
//             return res.status(200).send(result)
//           }
//     } catch (err) {
//         res.status(500).send(err);
//     }
//  }
// }).catch()


 




// })
router.post('/new', 
 async  (req: Request, res: Response) => {
  try {
    console.log('This is data', req.body.number, req.body.brand, req.body.model, req.body.userId)
      if (!(req.body.number && req.body.brand && req.body.model && req.body.userId)){
        return res.status(500).send({
          success: false,
          content: {},
          message: `Некорректно переданы данные!`,
          code: 500
        })
      }
      let { brand, model,number, userId  } = req.body
      if(!req.files) {
         let result = await controller.uploadCar(brand, model, number, userId)
         return res.status(200).send(result)
      } else {
        let photo: UploadedFile = req.files.file;
        let result = await controller.uploadCarwithPhoto(brand, model, number, userId, photo);
        console.log('this is ', result)
        return res.status(200).send(result)
      }
  } catch (err) {
      res.status(500).send(err);
  }
})

.post('/newPhoto', async(req: Request, res: Response)=>{
  try {
    // console.log('This is data', req.body.carId, req.body.userId)
      if (!(req.body.carId && req.body.userId)){
        return res.status(500).send({
          success: false,
          content: {},
          message: `Некорректно переданы данные!`,
          code: 500
        })
      }
      let { carId, userId  } = req.body;
      if(!req.files) {

         return res.status(500).send({
          success: false,
          content: {},
          message: `Изображение не передано!`,
          code: 500
        })
      } else {
        let photo: UploadedFile = req.files.file;
        let result = await controller.uploadPhoto(photo, carId, userId);
        console.log('this is ', result)
        return res.status(200).send(result)
      }
  } catch (err) {
      res.status(500).send(err);
  }
})
   

export = router;
