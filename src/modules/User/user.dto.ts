import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, MinLength, MaxLength, Matches, IsEmail } from 'class-validator';

export class UserLoginDTO {
  @ApiProperty({ readOnly: true, required: false })
  id: number;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'incorrect format',
  })
  password: string;

  @ApiProperty()
  @MinLength(4)
  @MaxLength(16)
  username: string;
}

export class UserDTO extends UserLoginDTO {
  @ApiProperty({ required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsBoolean()
  isAdmin: boolean;
}
