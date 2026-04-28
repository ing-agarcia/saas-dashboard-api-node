import { DataTypes, Model } from "sequelize";
import { sequelizeInstance } from "@/config/db.js";
import { UserModel } from "./user.model.js";

export class UserHierarchyModel extends Model {
    declare parentUserId: number;
    declare childUserId: number;
    declare level: number;

    declare parent?: UserModel;
    declare child?: UserModel;
}

UserHierarchyModel.init(
    {
        parentUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "parent_user_id",
            primaryKey: true,
        },
        childUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "child_user_id",
            primaryKey: true,
        },

    },
    {
        sequelize: sequelizeInstance,
        tableName: "user_hierarchy",
        timestamps: false,
    }
);

UserHierarchyModel.belongsTo(UserModel, {
    foreignKey: "parentUserId",
    as: "parent"
});

UserHierarchyModel.belongsTo(UserModel, {
    foreignKey: "childUserId",
    as: "child"
});