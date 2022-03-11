import { FILE_MANAGE_SERVICE } from "@/domain/use-cases/file-manager-service";
import { FileManagerServiceImpl } from "@/domain/use-cases/impl/file-manager-service-impl";
import {Mapping, Get, Post, Request, Body, Inject} from "@tsclean/core";

@Mapping('api/v1/file-manager')
export class FileManagerController {

    constructor(
        @Inject(FILE_MANAGE_SERVICE) private readonly fileManagerService: FileManagerServiceImpl
    ) {
    }
    
   
    @Post()
   
    async uploadFile(@Request() file: Request ): Promise<any> {
        this.fileManagerService;
        console.log(file);
        return 'Welcome to the world of clean architecture'
    }
}
