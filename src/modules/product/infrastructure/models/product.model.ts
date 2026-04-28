import { DataTypes, Model } from "sequelize";
import { sequelizeInstance } from "@/config/db.js";

export class ProductModel extends Model {
    declare id: number;
    declare name: string;
    declare category: string;
    declare price: string;
}

ProductModel.init(
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
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeInstance,
        tableName: "products",
        timestamps: false,
    }
);