import { DataTypes, Model } from "sequelize";
import { sequelizeInstance } from "@/config/db.js";
import { UserModel } from "@/modules/user/infrastructure/models/user.model.js";

export class OpportunityModel extends Model {
    declare id: number;
    declare ownerId: number;
    declare name: string;
    declare stage: string;
    declare probability: number;
    declare createdAt: Date;

    declare user?: UserModel;
}

OpportunityModel.init(
    {
        id: {
            type: DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true,
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "owner_id",
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        probability: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "created_at",
        },
    },
    {
        sequelize: sequelizeInstance,
        tableName: "opportunities",
        timestamps: false,
    }
);

OpportunityModel.belongsTo(UserModel, {
    foreignKey: "ownerId",
    as: "user"
});