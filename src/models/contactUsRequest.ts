import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "./index";

export interface ContactUsRequestAttributes {
  RequestID?: string;
  Name: string;
  Email: string;
  Phone: string;
  Message: string;
  DateSubmitted: Date | string;
}

class ContactUsRequest extends Model<
InferAttributes<ContactUsRequest>, InferCreationAttributes<ContactUsRequest>
> implements ContactUsRequestAttributes {
  declare RequestID: CreationOptional<string>;
  declare Name: string;
  declare Email: string;
  declare Phone: string;
  declare Message: string;
  declare DateSubmitted: Date | string;
}

ContactUsRequest.init(
  {
    RequestID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DateSubmitted: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "contactUsRequest",
  },
);

export default ContactUsRequest;
