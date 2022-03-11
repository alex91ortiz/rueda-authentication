import {Service} from "@tsclean/core";
import {IFileManagerService} from "@/domain/use-cases/file-manager-service";
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
@Service()
export class FileManagerServiceImpl implements IFileManagerService {
    constructor() {
        
    }
    async uploadFileToFirebase(userId: string, file: File): Promise<void> {
        
        const firebaseConfig = {
            apiKey: 'AIzaSyCZdqpEoXdqsGPSm66ZCU-GkrnFHsYLgdg ',
            storageBucket: 'gs://tutibdo-a60bc.appspot.com'
          };
        const firebaseApp = initializeApp(firebaseConfig);
        const storage = getStorage(firebaseApp);
        throw new Error("Method not implemented.");
    }
}