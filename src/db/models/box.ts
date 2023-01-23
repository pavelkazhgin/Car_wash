import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

interface BoxAttributes {
  id: number,
  name: string,
  vacant: boolean
}

interface BoxCreationAttributes
  extends Optional<BoxAttributes, 'id'> {}

  interface BoxInstance
  extends Model<BoxAttributes, BoxCreationAttributes>,
    BoxAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }

    const Box = sequelize.define<BoxInstance>(
      'Box',
      {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: DataTypes.UUID,
          unique: true,
        },
        name: {
          allowNull: false,
          type: DataTypes.TEXT,
        },
        vacant: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
        }
      }
    );

    export default Box;
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Box extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Box.init({
//     name: DataTypes.STRING,
//     vacant: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'Box',
//   });
//   return Box;
// };
