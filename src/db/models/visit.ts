import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

interface VisitAttributes {
  id: number;
  status: string,
  userId: number,
  carId: number,
  boxId: number
};


interface VisitCreationAttributes
  extends Optional<VisitAttributes, 'id'> {}


interface VisitInstance
  extends Model<VisitAttributes, VisitCreationAttributes>,
  VisitAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }
    
    const Visit = sequelize.define<VisitInstance>(
      'Visit',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.UUID,
          unique: true,
        },
        status: {
          allowNull: false,
          type: DataTypes.TEXT,
        },
        userId: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        carId: {
          allowNull: true,
          type: DataTypes.INTEGER,
        },
        boxId: {
          allowNull: false,
          type: DataTypes.INTEGER,
        }
      }
    );


    export default Visit;

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Visit extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Visit.init({
//     status: DataTypes.STRING,
//     userId: DataTypes.INTEGER,
//     car_id: DataTypes.INTEGER,
//     box_id: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Visit',
//   });
//   return Visit;
// };
