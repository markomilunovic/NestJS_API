import { SetMetadata } from "@nestjs/common";
import { Role } from "auth/utils/types";

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);