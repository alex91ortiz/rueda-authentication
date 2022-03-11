export const FILE_MANAGE_SERVICE = "FILE_MANAGE_SERVICE";

export interface IFileManagerService {
    uploadFileToFirebase(userId: string, file: File): Promise<void>;
}