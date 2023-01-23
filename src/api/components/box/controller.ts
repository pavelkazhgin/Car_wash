
const dbBox = new (require("./repository").BoxDatabase)();


class BoxController {
  constructor() { }

  async updateStatusBox(boxId: number){
    const result = await dbBox.updateStatusBox(boxId);
      if(result){
        return {
          success: true,
          content: result,
          message: 'Статус бронирования бокса обновлен!',
          code: 200
        }
        } else {
          return {
            success: false,
            content: {},
            message: 'Ошибка обновления статуса бронирования бокса!',
            code: 403
        }
      }
          
    }

    async getVacantBoxes(){
      const result = await dbBox.getVacantBoxes();
        if(result){
          return {
            success: true,
            content: result,
            message: 'Поиск свободных боксов успешен!',
            code: 200
          }
          } else {
            return {
              success: false,
              content: {},
              message: 'Ошибка при поиске свободных боксов!',
              code: 403
          }
        }
            
      }

}


module.exports = {
  BoxController
};
