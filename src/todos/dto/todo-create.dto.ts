import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty()
  description: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  status: string;
  @ApiProperty({ type: Boolean, default: false })
  completed: string;
  @ApiProperty()
  userId: string;
}
