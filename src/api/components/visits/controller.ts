
require('dotenv').config();

const dbVisit = new (require("./repository").VisitDatabase)();
const boxController = new (require('../box/controller').BoxController)();



class VisitController {
  constructor() { }

 async createVisit(status: string, userId: number, carId: number, boxId: number) {

    const createVisit = await dbVisit.visitNew(status, userId, carId, boxId)
    if (createVisit.id){
      let updateStatusBox = await boxController.updateStatusBox(createVisit.boxId);
      if(updateStatusBox){
        return {
          success: true,
          content: createVisit,
          message: 'Забронирвано на час!',
          code: 200
        }
      } else {
        await this.deleteVisit(createVisit.id);
        return {
          success: false,
          content: {},
          message: 'Бокс занят!',
          code: 400
        }
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
        const currentVisit = await dbVisit.currentVisit(visitId);
        if (currentVisit.boxId){
          let updateStatusBox = await boxController.updateStatusBox(currentVisit.boxId);
          if (updateStatusBox){
            return {
              success: true,
              content: currentVisit,
              message: 'Посещение завершено!',
              code: 200
            }
          }
          return {
            success: false,
            content: {},
            message: 'Ошибка обновления статуса бронирования!',
            code: 403
          }
        } else {
          return {
            success: false,
            content: {},
            message: 'Запись не найдена!',
            code: 403
        }
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
