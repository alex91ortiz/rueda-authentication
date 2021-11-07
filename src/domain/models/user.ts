export type UserModel = {
    id: string | number;
    name: string;
    identification: number;
    serial: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    email: string;
    password: string;
    accessToken: string;
    enable: boolean;
    locked: boolean;
    information:  {
        birthday: string;
        country: string;
        state: string;
        city: string;
        address: string;
        phone: number;
    },
    health:{
        typeBlood: string;
        allergy: string;
        medicines: string;
        sickness: string;
    },
    emergency:{
        contact: string;
        phone: number;
        relationship: string;
    }
}

export type AddUserParams = Omit<UserModel, 'id'>
