import { RouterContext } from "../deps.ts";
import Survey from "../models/Survey.ts";

class SurveyController {
    async getAllForUsers(ctx: RouterContext){
        const surveys = await Survey.findByUser('1');
        console.log(surveys);
        ctx.response.body = surveys;
    }
    async getSingle(ctx: RouterContext){
        const id = ctx.params.id!;
        const survey = await Survey.findById(id);
        if(!survey){
            ctx.response.status = 404;
            ctx.response.body = "Incorrect Id";
        }
        ctx.response.body = survey;
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