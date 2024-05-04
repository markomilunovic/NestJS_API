import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateTodoDto {
    @IsNotEmpty({ message: 'Title is required'})
    title: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    imagePath?: string;
};