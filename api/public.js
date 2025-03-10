import { bot } from "./bot.js";

export default async (request, response) => {
    try {
        const { body } = request;

        bot.processUpdate(req.body);
    }
    catch(error) {
        console.error('Error sending message');
        console.log(error.toString());
    }
    
    response.send('OK');
};