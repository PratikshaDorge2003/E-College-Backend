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
    SR_ID : string;
    isDeleted:boolean;
    approved : boolean;
    subject :string;

}

export interface professorLoginDetails{
    userName: string,
    password: string
}

export interface professorID{
    userName : string
}

export interface subject {
    department : string,
    subject1 : {
        name :string,
        status:string
    }
    subject2 : {
        name :string,
        status:string
    }
    subject3 : {
        name :string,
        status:string
    }
    subject4 : {
        name :string,
        status:string
    }
    subject5 : {
        name :string,
        status:string
    }


}

export interface professorSubject{
    subjects : string,
    userName : string
}