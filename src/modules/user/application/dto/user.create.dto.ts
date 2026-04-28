// Los datos que necesita el caso de uso para ejecutarse.
export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    roleId: number;
    groupId: number,
    managerId: number,
}