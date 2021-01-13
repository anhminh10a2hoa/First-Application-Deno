import { RouterContext } from "../deps.ts";
import Survey from "../models/Survey.ts";
import User from "../models/User.ts";

export default class BaseSurveyController {
    async findSurveyOrFail(id: string, ctx: RouterContext): Promise<Survey | null>{
        const survey = await Survey.findOne(id);
        if(!survey){
            ctx.response.status = 404;
            ctx.response.body = "Incorrect Id";
            return null;
        }
        return survey;
    }
}