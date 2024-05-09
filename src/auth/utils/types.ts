export type RegisterType = {
    roles: Role,
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
    roles: 'user' | 'admin';
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  };

  export type Role = 'admin' | 'user';

  export type JwtPayloadType = {
  user: {
    id: number;
    roles: Role,
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  iat: number;
  exp: number;
};

