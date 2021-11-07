import {Mapping, Adapter, Post, Body, Param} from "@tsclean/core";
import {ComplementalDataServiceImpl} from "@/domain/use-cases/impl/complemental-data-service-impl";
import { COMPLEMENTAL_DATA_SERVICE } from "@/domain/use-cases/complemental-data-service";
import { AddUserParams } from "@/domain/models/user";

@Mapping('api/v1/complemental-data')
export class ComplementalDataController {

    constructor(
        @Adapter(COMPLEMENTAL_DATA_SERVICE) private readonly complementalDataService: ComplementalDataServiceImpl
    ) {
    }
    
    @Post("/:id")
    async addComplementalData(@Param("id") id: number | string, @Body() data: AddUserParams): Promise<any> {
       await this.complementalDataService.addComplementalData(id, data);
    }
}
