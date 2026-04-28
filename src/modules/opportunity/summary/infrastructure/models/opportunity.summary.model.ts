import { DataTypes, Model } from "sequelize";
import { sequelizeInstance } from "@/config/db.js";
import { UserModel } from "@/modules/user/infrastructure/models/user.model.js";

export class OpportunitySummaryModel extends Model {
    declare id: number;
    declare name: string;
    declare ownerId: number;
    declare stage: string;
    declare probability: number;
    declare createdAt: Date;
    declare amount: number;

    declare user?: UserModel;
}


OpportunitySummaryModel.init(
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
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        probability: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "created_at",
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeInstance,
        tableName: "opportunity_summary",
        timestamps: false,
    }
);

OpportunitySummaryModel.belongsTo(UserModel, {
    foreignKey: "ownerId",
    as: "user"
});