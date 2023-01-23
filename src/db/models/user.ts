import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import Car from './car';
import Visit from './visit';

interface UserAttributes {
  id: number;
  firstName: string,
  lastName: string,
  email: string | null,
  pass: string,
  phone: string | null,
};


interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}


interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
  UserAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }

    // ... instances code
    
    const User = sequelize.define<UserInstance>(
      'User',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.UUID,
          unique: true,
        },
        firstName: {
          allowNull: false,
          type: DataTypes.TEXT,
        },
        lastName: {
          allowNull: false,
          type: DataTypes.TEXT,
        },
        email: {
          allowNull: true,
          type: DataTypes.TEXT,
          unique: true,
        },
        pass: {
          allowNull: false,
          type: DataTypes.TEXT,
        },
        phone: {
          allowNull: true,
          type: DataTypes.TEXT,
          unique: true,
        }
      }
    );

    User.hasMany(Car, {
      sourceKey: 'id',
      foreignKey: 'userId',
      as: 'cars'
    });

    Car.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user'
    });

    User.hasMany(Visit, {
      sourceKey: 'id',
      foreignKey: 'userId',
      as: 'visits'
    });

    Visit.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user'
    });

export default User;









// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     email: DataTypes.STRING,
//     pass: DataTypes.STRING,
//     phone: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };
