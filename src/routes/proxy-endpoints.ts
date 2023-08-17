import express, { Router } from 'express';
import axios from 'axios';

import Ban from '../models/ban';

const router: Router = express.Router();

/* 
TITLE: Endpoint For Sending Webhook Message
URL: http://localhost/v1/webhook/{webhook.id}/{webhook.token}
HEADERS: X-API-KEY
*/

export const sendWebhookMessage = router.post('/webhook/:id/:token', async (request, response) => {
	const { id, token } = request.params;

	try {
		await axios({
			method: 'POST',
			url: `https://discord.com/api/webhooks/${id}/${token}`,
			data: request.body,
		});
	} catch (err) {
		// console.log(err);
		return response.status(400).json(err);
	}

	return response.json({ sucess: true });
});

export const fetchAvatar = router.get('/avatar/:robloxid', async (request, response) => {
	const { robloxid } = request.params;
	let avatar;

	try {
		await axios({
			method: 'GET',
			url: `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${robloxid}&size=720x720&format=png`,
		}).then((res) => {
			avatar = res.data.data.map((value: any) => value.imageUrl).toString();
		});
	} catch (err) {
		// console.log(err);
		return response.status(400).json(err);
	}

	return response.json({ avatar });
});
