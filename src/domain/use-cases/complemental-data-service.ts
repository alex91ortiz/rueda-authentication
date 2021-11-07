import { AddUserParams } from "../models/user";
export const COMPLEMENTAL_DATA_SERVICE =  "COMPLEMENTAL_DATA_SERVICE";
export interface IComplementalDataService {
    addComplementalData:(id: string | number,data: AddUserParams) => Promise<void>;
}