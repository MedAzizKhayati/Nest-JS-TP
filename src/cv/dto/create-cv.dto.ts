import { IsOptional } from "class-validator";
import { CreateDTO } from "src/generics/dto/create.dto";

export class CreateCvDto extends CreateDTO{
    @IsOptional()
    name: string;
}
