import { DATA_SEARCH } from "../config/constant";
import { Elastic } from "./elasticSearch/elasticSearch";


export class DataSearch {
    static getDataSearchInstance(searchEngineType: string) {
        switch(searchEngineType){
            case DATA_SEARCH.ELASTIC_SEARCH:
                return new Elastic()

        }
    }
}