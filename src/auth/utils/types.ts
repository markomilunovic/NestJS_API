export type RegisterType = {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
};

export type LoginType = {
    password: string;
    email: string;
};

export type ForgotPasswordType = {
    email: string;
};

export type ResetPasswordType = {
    newPassword: string;
    token: string;
};

export type RefreshTokneEncodeType = {
    jti: number;
    sub: number;
};

export type ResetTokneEncodeType = {
    jti: number;
    email: string;
};

export type UserPublicDataType = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  };