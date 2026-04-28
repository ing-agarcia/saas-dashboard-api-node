import { DataTypes, Model } from "sequelize";
import { sequelizeInstance } from "@/config/db.js";
import { RoleModel } from "./role.model.js";

export class RoleHierarchyModel extends Model {
    declare roleId: number;
    declare parentRoleId: number | null;
}

RoleHierarchyModel.init(
    {
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "role_id",
            primaryKey: true,
            references: {
                model: RoleModel,
                key: "id",
            },
        },
        parentRoleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "parent_role_id",
            primaryKey: true,
            references: {
                model: RoleModel,
                key: "id",
            },
        },
    },
    {
        sequelize: sequelizeInstance,
        tableName: "role_hierarchy",
        timestamps: false,
    }
);

RoleHierarchyModel.belongsTo(RoleModel, {
    foreignKey: "roleId",
    as: "role"
});

RoleHierarchyModel.belongsTo(RoleModel, {
    foreignKey: "parentRoleId",
    as: "parentRole"
});