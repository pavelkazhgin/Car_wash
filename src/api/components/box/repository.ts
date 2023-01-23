import Box from '../../../db/models/box';


class BoxDatabase {

  constructor() { }
  
  async updateStatusBox(boxId: number){
    let updateVacant = await Box.update({ vacant : true }, {
      where: {
        id : boxId,
      }
    });
      return updateVacant;
  }

  async getVacantBoxes(){
    let vacantBoxes = await Box.findAll({
      where: {vacant : true}
    })
    return vacantBoxes;
  }

}

module.exports = { BoxDatabase };
