import surveyController from "../controllers/SurveyController.ts";
import { surveyCollection } from "../mongo.ts";

export default class Survey {
    public id?: string = '';

    constructor(
        public userId: string,
        public name: string,
        public description: string,
    ){
        this.userId = userId,
        this.name = name,
        this.description = description
    }
    static async findById(userId: string){
        return await surveyCollection.find({userId});
    }

    async create(){
        delete this.id;
        const {$oid} = await surveyCollection.insertOne(this);
        this.id = $oid;
        return this;
    }
}