

export class LoginDTO{
  email: string;
  password: string;
}

export class RegisterDTO extends LoginDTO{
  username: string;
}
export class UpdateDTO {
   email?:string;
   username?:string;
   password?:string;
   image?:string;
   bio?:string;
  
}

export interface UserResponse {
  email: string;
  username?: string;
  bio: string;
  image: string | null;
}

export interface AuthResponse extends UserResponse {
  token: string;
}

export interface ProfileResponse extends UserResponse {
  following: boolean | null;
}