import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import Visit from './visit';

interface CarAttributes {
  id: number,
  brand: string,
  model: string,
  number: string,
  photo: string | null, 
  userId: number
}

interface CarCreationAttributes
  extends Optional<CarAttributes, 'id'> {}

interface CarInstance
  extends Model<CarAttributes, CarCreationAttributes>,
    CarAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }

const Car = sequelize.define<CarInstance>(
  'Car',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    brand: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    model: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    number: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    photo: {
      allowNull: true,
      type: DataTypes.STRING
    },
    userId: {
      allowNull: false,
      type: DataTypes.NUMBER
    }
  }
);

Car.hasMany(Visit, {
  sourceKey: 'id',
  foreignKey: 'carId',
  as: 'cars'
});

Visit.belongsTo(Visit, {
  foreignKey: 'userId',
  as: 'user'
});

export default Car;








// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Car extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Car.init({
//     brand: DataTypes.STRING,
//     model: DataTypes.STRING,
//     number: DataTypes.STRING,
//     photo: DataTypes.STRING,
//     userId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Car',
//   });
//   return Car;
// };
