import { RouterContext } from "../deps.ts";
import Survey from "../models/Survey.ts";
import BaseSurveyController from "./BaseSurveyController.ts";

class SurveyController extends BaseSurveyController {
    async getAllForUsers(ctx: RouterContext){
        const surveys = await Survey.findByUser('1');
        console.log(surveys);
        ctx.response.body = surveys;
    }
    async getSingle(ctx: RouterContext){
        const id = ctx.params.id!;
        console.log(id);
        let survey: Survey | null = await this.findSurveyOrFail(id, ctx);
        if (survey) {
            ctx.response.body = survey;
        }
    }
    async create(ctx: RouterContext){
        const {value} = await ctx.request.body();
        const {name, description} = await value;

        const survey = new Survey('1', name, description);
        await survey.create();

        ctx.response.status = 201;
        ctx.response.body = survey;

    }
    async update(ctx: RouterContext) {
        const id: string = ctx.params.id!;
        const { value } = await ctx.request.body();
        const { name, description } = await value;
        const survey: Survey | null = await this.findSurveyOrFail(id, ctx);
        if (survey) {
          await survey.update({ name, description });
          ctx.response.body = survey;
        }
    }
    
    async delete(ctx: RouterContext){
        const id = ctx.params.id!;
        const survey = await this.findSurveyOrFail(id, ctx);
        if(survey){
            await survey.delete();
            ctx.response.status = 204;
            ctx.response.body = "Successful";
        } 
    }
}

const surveyController = new SurveyController()
export default surveyController;