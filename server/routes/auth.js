import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { username, secret } = req.body;
        console.log("🚀 ~ file: auth.js:10 ~ router.post ~ username, secret:", username, secret);

        const chatResponse = await axios.get(
            'https://api.chatengine.io/users/me',
            {
                headers: {
                    "Project-ID": process.env.PROJECT_ID,
                    "User-Name": username,
                    "User-Secret": secret
                }
            }
        );
        res.status(200).json({ response: chatResponse.data });
        console.log("chatResponse.data:", chatResponse.data);

    } catch (e) {
        res.status(200).json({ error: e.message });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { username, secret } = req.body;

        const chatResponse = await axios.post(
            'https://api.chatengine.io/users/',
            {
                username,
                secret
            },
            {
                headers: {
                    "Private-key": process.env.PRIVATE_KEY,
                }
            }
        );
        res.status(200).json({ response: chatResponse.data });
    } catch (e) {
        res.status(200).json({ error: e.message });
    }
});

export default router;