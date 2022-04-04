import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { CreateDTO } from 'src/generics/dto/create.dto';

export class AddTodoDto extends CreateDTO{
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(10)
  name: string;
  @IsNotEmpty()
  @MinLength(10)
  description: string;
}
