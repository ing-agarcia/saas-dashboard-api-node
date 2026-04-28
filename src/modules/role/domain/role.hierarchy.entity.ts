export class RoleHierarchyEntity {

    private constructor(
        public readonly roleId: number,
        public readonly parentRoleId: number | null
    ) { }

    static fromPrimitives(data: {
        roleId: number;
        parentRoleId: number | null;
    }): RoleHierarchyEntity {

        return new RoleHierarchyEntity(
            data.roleId,
            data.parentRoleId
        );
    }

    toPrimitives() {
        return {
            roleId: this.roleId,
            parentRoleId: this.parentRoleId
        };
    }

}