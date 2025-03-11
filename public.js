import { botInstance } from "./bot.js";

export const config = {
    runtime: 'edge',
  };
  
const bot = botInstance();

export default async function handler(request) {
    try {
        const { body } = request;
        console.log('Request body:', body);

        await bot.processUpdate(req.body);
    }
    catch(error) {
        console.error('Error sending message');
        console.log(error.toString());
    }
    
    return new Response(`OK`);
};