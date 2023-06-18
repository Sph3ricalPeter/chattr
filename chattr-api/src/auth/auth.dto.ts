import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min } from "class-validator";

export class AuthDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @Min(2)
  @MaxLength(20)
  username: string;

  @IsString()
  @IsNotEmpty()
  accessToken: string;
}