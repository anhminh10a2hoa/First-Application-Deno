import { RouterContext } from "../deps.ts";
import Survey from "../models/Survey.ts";

class SurveyController {
    async getAllForUsers(ctx: RouterContext){
        ctx.response.body = []
    }
    async getSingle(ctx: RouterContext){
        
    }
    async create(ctx: RouterContext){
        const {value} = await ctx.request.body();
        const {name, description} = await value;

        const survey = new Survey('1', name, description);
        await survey.create();

        ctx.response.status = 201;
        ctx.response.body = survey;

    }
    async update(ctx: RouterContext){
        
    }
    async delete(ctx: RouterContext){
        
    }
}

const surveyController = new SurveyController()
export default surveyController;