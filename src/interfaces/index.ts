export interface IRegisterInput {
  name: "email" | "username" | "password";
  placeholder: string;
  type: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}


export interface IErrorResponse {
  error: {
  
    message?: string;
  };
}

export interface IfomrLogin{
  name:"identifier"|"password"
  placeholder: string;
  type: string;
  validation:{
    required?: boolean;
    minLength?: number;
     pattern?: RegExp;
  }

}