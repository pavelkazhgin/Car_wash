import Visit from '../../../db/models/visit';

// console.log('this is User', User)

class VisitDatabase {
  constructor() { }
  
 async visitNew(status: string, userId: number, carId: number, boxId: number){
      const createVisit = await Visit.create({
          status,
          userId,
          carId,
          boxId,
      });
      return createVisit;
  }

  async deleteVisit(visitId: number){
    const deleteVisit = await Visit.destroy({
      where: {
        id : visitId
      }
  }); 
    return deleteVisit;
  }

  async updateVisit(visitId: number){
    await Visit.update({ status: "end" }, {
      where: {
        id : visitId,
      }
    });
  }

}

module.exports = { VisitDatabase };
