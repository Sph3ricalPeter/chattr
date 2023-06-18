import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class MessageDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  public username: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  text: string

  @IsDate()
  @IsOptional()
  createdAt?: Date

}