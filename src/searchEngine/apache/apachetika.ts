
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';


export class ApacheTika {

    async parseFile(fileName: string){
        const form = new FormData();
        form.append('file', fs.createReadStream(fileName));
      return   axios({
            method: 'PUT',
            url: `http://localhost:9998/tika`,
            headers: {   
                ...form.getHeaders()
            },
            data: form
        })
    }
}

