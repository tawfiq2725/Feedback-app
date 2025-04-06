export interface Feedback {
    _id:string;
    name: string;
    gender: "male" | "female" | "other";
    nationality: string;
    email: string;
    phoneNumber: string;
    address: string;
    message: string;
    userId: string ;
    createdAt: Date;
    updatedAt: Date;   
}