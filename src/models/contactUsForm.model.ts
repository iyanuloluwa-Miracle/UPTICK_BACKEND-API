// src/models/ContactUs.ts
import { DataTypes, Model } from 'sequelize';
import sequelize  from '../config/database';

class ContactUs extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public phone!: string;
    public description!: string;
  }
  
  ContactUs.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ContactUs',
    }
  );
  
  export default ContactUs;
  
