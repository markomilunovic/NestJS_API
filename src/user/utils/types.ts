export type UpdateUserType = {
    roles?: 'user' | 'admin';
    username?: string;
    password?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
};