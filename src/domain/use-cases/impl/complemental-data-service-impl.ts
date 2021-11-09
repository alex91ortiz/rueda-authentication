import { Inject, Service} from "@tsclean/core";
import {IComplementalDataService} from "@/domain/use-cases/complemental-data-service";
import { AddUserParams } from "@/domain/models/user";
import { ISetUserRepository, SET_USER_REPOSITORY } from "@/domain/models/gateways/set-user-repository";

@Service()
export class ComplementalDataServiceImpl implements IComplementalDataService {
    constructor(
        @Inject(SET_USER_REPOSITORY) private readonly setUserRepository : ISetUserRepository
    ) {
    }
    addComplementalData(id: string | number, data: AddUserParams): Promise<void>{
        return this.setUserRepository.addComplementalDataUser(id,data);
    }

}