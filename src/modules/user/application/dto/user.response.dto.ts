// Contrato de salida
export interface ResponseUserDTO {
    id: number | null;
    name: string;
    email: string;
    roleId: number | null;
    role: string | null;
    groupId: number | null;
    group: string | null;
    managerId: number | null;
    manager: string | null;
    createdAt: Date;
}