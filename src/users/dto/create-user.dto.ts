import { IsEmail, IsOptional, MaxLength, MinLength } from "class-validator";
import { CreateDTO } from "src/generics/dto/create.dto";

export class CreateUserDto extends CreateDTO{
    @IsOptional()
    username: string;
    @IsEmail()
    email: string;
    @MinLength(8)
    @MaxLength(32)
    password: string;
}
