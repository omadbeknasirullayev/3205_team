import { IsEmail, IsOptional, IsString, Matches } from "class-validator";

export class UserRequest {
  @IsEmail()
  public email!: string;

  @IsOptional()
  @IsString()
  public number?: string;
}
