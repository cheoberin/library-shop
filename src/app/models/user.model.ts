export interface IUser {
  _id: string | any;
  name: string;
  birthDate: Date;
  cpf: string;
  phone: string;
  email: string;
  password: string;
}

export interface ISingInRequest{
  email: string;
  password: string;

}

