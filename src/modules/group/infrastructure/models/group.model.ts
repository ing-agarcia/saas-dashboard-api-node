import { DataTypes, Model } from "sequelize";
import { sequelizeInstance } from "@/config/db.js";

export class GroupModel extends Model {
    declare id: number;
    declare name: string;
}

GroupModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        sequelize: sequelizeInstance,
        tableName: "groups",
        timestamps: false,
    }
);