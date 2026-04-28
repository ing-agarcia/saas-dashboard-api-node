import { DataTypes, Model } from "sequelize";
import { sequelizeInstance } from "@/config/db.js";
import { RoleModel } from "@/modules/role/infrastructure/models/role.model.js";
import { GroupModel } from "@/modules/group/infrastructure/models/group.model.js";

export class UserModel extends Model {
    declare id: number;
    declare name: string;
    declare email: string;
    declare passwordHash: string;
    declare roleId: number;
    declare groupId: number;
    declare managerId: number;
    declare createdAt: Date;

    declare role?: RoleModel;
    declare group?: GroupModel;
    declare manager?: UserModel;
}

UserModel.init(
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
            unique: true,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "password",
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "role_id",
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "group_id",
        },
        managerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "manager_id",
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "created_at",
        },

    },
    {
        sequelize: sequelizeInstance,
        tableName: "users",
        timestamps: false,
    }
);

UserModel.belongsTo(RoleModel, {
    foreignKey: "roleId",
    as: "role"
});

UserModel.belongsTo(GroupModel, {
    foreignKey: "groupId",
    as: "group"
});

UserModel.belongsTo(UserModel, {
    foreignKey: "managerId",
    as: "manager"
});