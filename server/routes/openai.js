import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { openai } from '../index.js';

dotenv.config();
const router = express.Router();

router.post('/text', async (req, res) => {
    try {
        const { text, activeChatId } = req.body;

        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: text,
            temperature: 0.5,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0.5
        });

        await axios.post(
            `https://api.chatengine.io/chats/${activeChatId}/messages/`,
            { text: response.data.choices[0].text },
            {
                headers: {
                    "Project-ID": process.env.PROJECT_ID,
                    "User-Name": process.env.BOT_USER,
                    "User-Secret": process.env.BOT_PWD
                }
            }
        );

        res.status(200).json({ text: response.data.choices[0].text });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ error: e.message });
    }
});

router.post('/assist', async (req, res) => {
    try {
        const { text } = req.body;

        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `finish my thought: ${text}`,
            temperature: 0.5,
            max_tokens: 512,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0.5
        });
        console.log("🚀 ~ file: openai.js:55 ~ router.post ~ response:", response.data.choices[0].text);


        res.status(200).json({ text: response.data.choices[0].text });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ error: e.message });
    }
});


export default router;