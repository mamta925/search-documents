import { DATA_STORAGE } from "../config/constant";
import { S3 } from "./s3/s3StorageService";
import { IStorage } from "./storageInterface";

export class DataStorage {
    static getDataStorageInstance(storageType: string): S3 {
        switch(storageType){
            case DATA_STORAGE.S3:
            case DATA_STORAGE.DROP_BOX:
            case DATA_STORAGE.GOOGLE_DRIVE:
            case DATA_STORAGE.DEFAULT:
                return new S3()
        }
        return new S3()
    }
}