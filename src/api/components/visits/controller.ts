import { UploadedFile } from "express-fileupload";
import { dirname } from "path";

require('dotenv').config();
const fs = require('fs/promises')
const dbVisit = new (require("./repository").VisitDatabase)();



class VisitController {
  constructor() { }

 async createVisit(status: string, userId: number, carId: number, boxId: number) {

    const createVisit = await dbVisit.visitNew(status, userId, carId, boxId)
    if (createVisit.id){
      return {
        success: true,
        content: createVisit,
        message: 'Забронирвано на час!',
        code: 200
      }
    }
    return {
      success: false,
      content: {},
      message: 'Ошибка при бронировании!',
      code: 403
      }   
  }

  async updateVisit(visitId: number){
    const result = await dbVisit.updateVisit(visitId)
      if(result){
        return {
          success: true,
          content: result,
          message: 'Статус бронирования обновлен!',
          code: 200
        }
        } else {
          return {
            success: false,
            content: {},
            message: 'Ошибка обновления статуса бронирования!',
            code: 403
        }
      }
          
    }

  async deleteVisit(visitId: number){
    const result = await dbVisit.deleteVisit(visitId)
      if(result){
        return {
          success: true,
          content: result,
          message: 'Бронирование отменено!',
          code: 200
        }
        } else {
          return {
            success: false,
            content: {},
            message: 'Ошибка отмены бронирования!',
            code: 403
        }
      }
  }

 
}


module.exports = {
  VisitController
};
