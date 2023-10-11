import { ApiProperty } from '@nestjs/swagger';

export class CreatedUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
  @ApiProperty({ type: Number })
  age: number;
}
