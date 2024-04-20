export interface studentDetails{
    registrationID :string,
    srID :string;
    admissionDate : string;
    firstName:string;
    lastName:string;
    DOB:string;
    gender:string;
    department:string;
    physicalDisability:string;
    phoneNumber:string;
    fatherFirstName :string;
    fatherLastName:string;
    motherFirstName:string;
    motherLastName :string;
    familyIncome :string;
    caste:string;
    religion:string;
    govtIDType:string;
    govtID:string;
    email:string;
    addressLine:string;
    place:string;
    pinCode:string
}

export interface numberDetails{
    total : string
}

export interface studentLoginDetail{
    userName: string,
    password: string
}