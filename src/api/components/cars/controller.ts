import { UploadedFile } from "express-fileupload";
import { dirname } from "path";

require('dotenv').config();
const fs = require('fs/promises')
const dbCar = new (require("./repository").CarDatabase)();



class CarController {
  constructor() { }

 async uploadCar(brand:string, model: string, number: string, userId: number) {

    const newCar = await dbCar.carNew(brand, model, number, userId)
    if (newCar.id){
      return {
        success: true,
        content: newCar,
        message: 'Автомобиль сохранен в базе!',
        code: 200
      }
    }
    return {
      success: false,
      content: {},
      message: 'Ошибка при сохранении автомобиля!',
      code: 403
      }   
  }

  async uploadPhoto(photo: UploadedFile, carId: number, userId: number){
    const car= await dbCar.getCar(carId, userId)
      if(car){
        let path;
        try {
          let carPath =  String(car.id).split('').reverse().join('/');
          let carPathwithoutLastSymbol = carPath.substring(0, carPath.length - 1);
          // console.log('this is carPath', carPathwithoutLastSymbol, carPath[carPath.length - 1], photo.mimetype )
          photo.name = carPath[carPath.length - 1] + "." + photo.mimetype.split('/')[1];
          path = `./jpg/${carPathwithoutLastSymbol}${photo.name}`;
          // console.log("this is path", path )
          await photo.mv(path);
        } catch (error) {
          console.log(error)
          return {
            success: false,
            content: {},
            message: 'Ошибка при сохранении фото автомобиля',
            code: 403
        }
      }

      const newCarPhoto = await dbCar.photoUpload(path, car.id, car.userId)
      if(newCarPhoto){
        return {
          success: true,
          content: newCarPhoto,
          message: 'Фото авто сохранено в базе!',
          code: 200
        }
      } else {
        return {
          success: false,
          content: {},
          message: 'Ошибка при сохранении фото автомобиля!',
          code: 403
          }
        }
    } else {
      return {
        success: false,
        content: {},
        message: 'Автомобиль не найден!',
        code: 403
        }
    }  
  }

 async uploadCarwithPhoto(brand:string, model: string, number: string, userId: number, photo: UploadedFile) {
    let savedCar = await this.uploadCar(brand, model, number, userId);
    if (savedCar.success){
      let path;
      try {
        let carPath =  String(savedCar.content.id).split('').reverse().join('/');
        let carPathwithoutLastSymbol = carPath.substring(0, carPath.length - 1);
        // console.log('this is carPath', carPathwithoutLastSymbol, carPath[carPath.length - 1], photo.mimetype )
        photo.name = carPath[carPath.length - 1] + "." + photo.mimetype.split('/')[1];
        path = `./jpg/${carPathwithoutLastSymbol}${photo.name}`;
        // console.log("this is path", path )
        await photo.mv(path);
      } catch (error) {
        console.log(error)
        return {
          success: false,
          content: {},
          message: 'Ошибка при сохранении фото автомобиля',
          code: 403
        }
      }

      const newCarPhoto = await dbCar.photoUpload(path, savedCar.content.id, savedCar.content.userId)
      if(newCarPhoto){
        return {
          success: true,
          content: newCarPhoto,
          message: 'Автомобиль сохранен в базе!',
          code: 200
        }
      } else {
        return {
          success: false,
          content: {},
          message: 'Ошибка при сохранении автомобиля!',
          code: 403
          }
        }
    } else {
      return savedCar;
    }
  }
    
  async deleteCar(carId: number,  userId: number){
    if (carId && userId) {
      let result = await dbCar.getCar(carId,  userId);
      if(result.id){
        try {
          if(result.photo){
            //delete photo
          }
          const deleted = await db.deleteCar(carId);

          return {
            success: true,
            content: {},
            message: 'автмобиль успешно удален!',
            code: 200,
            };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            content: {},
            message: 'Ошибка при удалении автомобиля!',
            code: 403
            }
        }
        
      } 


      return {
        success: false,
        content: {},
        message: `Автомобиль не найден!`,
        code: 403,
      };    
    }
  }
}


module.exports = {
  CarController,
};
