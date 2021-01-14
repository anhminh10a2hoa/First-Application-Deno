import {MongoClient} from "https://deno.land/x/mongo@v0.12.1/mod.ts";

const client = new MongoClient();
client.connectWithUri(Deno.env.get('MONGO_CONNECTION_KET')!);
const db = client.database("deno_survey");

export const userCollection = db.collection('users');
export const surveyCollection = db.collection('surveys');
export const questionCollection = db.collection('questions');