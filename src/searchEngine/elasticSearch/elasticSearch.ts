import {Client } from 'elasticsearch';
import fs from 'fs';

const client = new Client({
    host: 'https://elastic:1HBJ*eGd1kb6mAy8mnTN@localhost:9200'
})

client.indices.create({ index: 'files' }).then(() => {
    // create a mapping for the attachment
    return client.indices.putMapping({
        index: 'files',
        type: 'document',
        body: {
            document: {
                properties: {
                    file: {
                        type: 'attachment',
                        fields: {
                            content: {
                                type: 'string',
                                term_vector: 'with_positions_offsets',
                                store: true,
                            },
                        },
                    },
                },
            },
        },
    });
});

export class Elastic {

async syncElastic(filePath: string, fileName: string){
    const fileContents = fs.readFileSync(filePath);
    const fileBase64 = new Buffer(fileContents).toString('base64');
    
    client
        .create({
            index: 'files',
            type: 'document',
            id: fileName,
            body: {
                file_id: fileName,
                file: {
                    _content: fileBase64,
                },
            },
        })
        .catch((err) => {
            console.error('Error while creating elasticsearch record', err);
        });
}
async search(query){
    client.search(
        {
            q: query,
            index: 'files',
        },
        (error, result) => {
            if (error) return error;
            console.log(result.hits);
        }
    );
}

}