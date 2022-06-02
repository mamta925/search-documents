import * as AWS from "aws-sdk"
import * as fs from 'fs'
import { DATA_SEARCH } from "../../config/constant";
import { ApacheTika } from "../../searchEngine/apache/apachetika"
import { DataSearch } from "../../searchEngine/searchService";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {Response}  =  require('node-fetch');
AWS.config.update({ region: 'ap-south-1' });

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });


export class S3 {
   async  getS3BucketObjects(bucketName: string) {

     const fileNames: string[] = []
     const data =  await s3.listObjectsV2({ Bucket: bucketName }).promise();
      data.Contents?.forEach((content)=>{
        if(content.Key){
          fileNames.push(content.Key)
        } 
      })

      await Promise.all(fileNames.map(async Key =>{
        const params = {Bucket: bucketName, Key};
            const location =  `${__dirname}/temp/${Key}`
        const res = fs.createWriteStream(location)
        const response =  s3.getObject(params).createReadStream();
        response.pipe(res)
        const instance =  DataSearch.getDataSearchInstance(DATA_SEARCH.ELASTIC_SEARCH)
        await instance?.syncElastic(location, Key)
        //const result =  await this.extractText(location)
       // console.log(result)
      }))
       
    }

    async extractText(fileName: string){
      return (new ApacheTika()).parseFile(fileName)
    }

}

