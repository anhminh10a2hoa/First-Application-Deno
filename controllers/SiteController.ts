import Survey from "../models/Survey.ts";
import { renderFileToString, RouterContext } from "../deps.ts";
import { renderView } from "../helpers.ts";
import Question from "../models/Question.ts";
import { answerCollection } from "../mongo.ts";

class SiteController {
    async surveys(ctx: RouterContext){
        const surveys = await Survey.findAll();
        ctx.response.body = await renderFileToString(`${Deno.cwd()}/views/surveys.ejs`, {surveys});
    }
    async viewSurvey(ctx: RouterContext){
        const id: string = ctx.params.id!;
        const survey = await Survey.findOne(id);
        if (!survey) {
          ctx.response.body = await renderView("notfound");
          return;
        }
        const questions = await Question.findBySurvey(id);
    
        ctx.response.body = await renderView("survey", {
          survey,
          questions,
          errors: {},
          answers: {},
        });
    }
    async submitSurvey(ctx: RouterContext) {
        const id: string = ctx.params.id!;
        const survey = await Survey.findOne(id);
        if (!survey) {
          ctx.response.body = await renderView("notfound");
          return;
        }
        const { value } = await ctx.request.body();
        const formData: URLSearchParams = value as any;
        const questions: Question[] = await Question.findBySurvey(id);
        const answers: any = {};
        const errors: any = {}; 
        for (const question of questions) {
          let value: string | string[] | null = formData.get(question.id!);
          if (question.isChoice() && question.data.multiple) {
            value = formData.getAll(question.id!);
          }
          if (question.required) {
            if (!value || question.isChoice() && question.data.multiple && !value.length) {
              errors[question.id!] = "This field is required";
            }
          }
          answers[question.id!] = value;
        }
        if (Object.keys(errors).length > 0) {
          ctx.response.body = await renderView("survey", {
            survey,
            questions,
            errors,
            answers,
          });
          return;
        }
        const { $oid } = await answerCollection.insertOne({
          surveyId: id,
          date: new Date(),
          userAgent: ctx.request.headers.get("User-Agent"),
          answers,
        });
        ctx.response.body = await renderView("surveyFinish", {
          answerId: $oid,
        });
      }
} 

const siteController = new SiteController();
export default siteController;