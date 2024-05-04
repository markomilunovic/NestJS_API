import { IsOptional, IsIn } from "class-validator";

export class UpdateTodoDto{
    @IsOptional()
    title?: string; 

    @IsOptional()
    description?: string;

    @IsOptional()
    @IsIn(['pending', 'completed'])
    status?: 'pending' | 'completed';

    @IsOptional()
    imagePath?: string;
};