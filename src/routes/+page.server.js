import { ChatGPTAPI } from 'chatgpt';

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();

		const topic = data.get('topic');
		const numQuestions = data.get('numQuestions');
		const apiKey = data.get('apiKey');
		const api = new ChatGPTAPI({
			apiKey
		});
		const res = await api.sendMessage(`Generate ${numQuestions} ${topic} interview questions`);

		return res.text;
	}
};
