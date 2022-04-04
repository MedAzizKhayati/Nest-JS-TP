import { MinLength } from "class-validator";
import { CreateDTO } from "src/generics/dto/create.dto";

export class CreateSkillDto extends CreateDTO {
    @MinLength(1)
    designation: string;
}
