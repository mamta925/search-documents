import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { BUCKET_NAME, DATA_STORAGE } from './src/config/constant';
import { DataStorage } from './src/dataStorage/dataStorageService';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
   const instance =  DataStorage.getDataStorageInstance(DATA_STORAGE.S3)
   instance.getS3BucketObjects(BUCKET_NAME).then((data)=>
   {
    res.send('Hi');
   }, (error)=>{
    res.send(error);
   })
 
});



app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));