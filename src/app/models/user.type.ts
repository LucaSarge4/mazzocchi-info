
export enum UserRoleEnum {
    ADMIN = 'admin',
    USER = 'user'
}

export type UserType = {
    createdAt: string;
    customer_name?: string;
    email: string;
    id: number;
    name: string;
    photo: string;
    role: UserRoleEnum;
    updatedAt: string;
    verified: boolean;
}