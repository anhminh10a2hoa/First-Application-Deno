import surveyController from "../controllers/SurveyController.ts";
import { surveyCollection } from "../mongo.ts";
import BaseModel from "./BaseModel.ts";

export default class Survey extends BaseModel {
    public id?: string = '';

    constructor(
        public userId: string,
        public name: string,
        public description: string,
    ){
        super();
        this.userId = userId,
        this.name = name,
        this.description = description
    }
    static async findByUser(userId: string): Promise<Survey[]>{
        const surveys = await surveyCollection.find({userId});
        return surveys.map((survey: any) => 
            Survey.prepare(survey)
        )
    }

    static async findById(surveyId: string){
        const survey = await surveyCollection.findOne({_id: { $oid: surveyId }});
        if(!survey){
            return null;
        }
        return Survey.prepare(survey);
    }

    async create(){
        delete this.id;
        const {$oid} = await surveyCollection.insertOne(this);
        this.id = $oid;
        return this;
    }

    protected static prepare(data: any): Survey{
        data = BaseModel.prepare(data);
        const survey = new Survey(data.userId, data.name, data.description)
        survey.id = data.id;
        return survey;
    }
}