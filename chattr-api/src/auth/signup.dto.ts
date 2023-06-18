import { IsString, MaxLength, Min, MinLength } from "class-validator";

export class SignupDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}