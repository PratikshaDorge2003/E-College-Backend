export interface IProfessor{
    firstName:string;
    lastName:string;
    phoneNumber:string;
    email:string;
    password:string;
    department :string;
    subject : string;
    SR_ID : string;
}

export interface IProfessor2{
    _id : string;
    firstName:string;
    lastName:string;
    phoneNumber:string;
    email:string;
    password:string;
    department :string;
    subject : string;
    SR_ID : string;
    isDeleted:boolean;
    approved : boolean

}