import Car from '../../../db/models/car';

// console.log('this is User', User)

class CarDatabase {
  constructor() { }
  
 async carNew(brand:string, model: string, number: string, userId: number){
      const photoUpload = await Car.create({
          brand,
          model,
          number,
          userId,
          photo: null,
      });
      return photoUpload;
  }

  async photoUpload(path: string, carId: number, userId: number){
    const photoUpload = await Car.update({ photo: path}, {
      where: {
        id: carId,
        userId: userId 
      }
    }) 
    return photoUpload;
  }

  async getCar(carId: string, userId: string){
    const currentCar = await Car.findOne({
      where: {
        id: carId,
        userId
      },
    });
    return currentCar;
  }
}

module.exports = {CarDatabase};
