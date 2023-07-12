<script>
	import Select, { Option } from '@smui/select';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import Button, { Label } from '@smui/button';
	import Paper, { Content } from '@smui/paper';
	import { browser } from '$app/environment';

	let topics = [
		'HTML',
		'CSS',
		'JavaScript',
		'TypeScript',
		'Python',
		'PHP',
		'Ruby',
		'Java',
		'C#',
		'Swift',
		'Go',
		'Rust',
		'Scala',
		'Kotlin',
		'React',
		'Angular',
		'Vue.js',
		'jQuery',
		'Ember.js',
		'Backbone.js',
		'Preact',
		'Express.js',
		'Django',
		'Ruby on Rails',
		'ASP.NET',
		'Spring Boot',
		'Flask',
		'Laravel',
		'Symfony',
		'MySQL',
		'PostgreSQL',
		'MongoDB',
		'SQLite',
		'Redis',
		'Cassandra',
		'MariaDB',
		'Amazon Web Services (AWS)',
		'Microsoft Azure',
		'Google Cloud Platform (GCP)',
		'Heroku',
		'DigitalOcean',
		'Firebase',
		'Git',
		'GitHub',
		'Bitbucket',
		'GitLab'
	];
	let topic = '';
	let numQuestions = '1';
	let apiKey = '';
	let buttonLabel = 'Generate';
	let buttonDisabled = false;

	if (browser) {
		topic = localStorage.getItem('topic') || '';
		numQuestions = localStorage.getItem('numQuestions') || '1';
		apiKey = localStorage.getItem('apiKey') || '';
	}
	let result = '';

	async function handleSubmit() {
		try {
			buttonLabel = 'Generating...';
			buttonDisabled = true;
			result = '';

			const formData = new FormData();
			formData.append('topic', topic);
			formData.append('numQuestions', numQuestions);
			formData.append('apiKey', apiKey);

			const response = await fetch(this.action, {
				method: 'POST',
				body: formData,
				headers: {
					'x-sveltekit-action': 'true',
					Accept: 'application/json'
				}
			});
			const json = await response.json();

			result = JSON.parse(json.data).join(', ');
		} catch (e) {
		} finally {
			buttonLabel = 'Generate';
			buttonDisabled = false;
		}
	}

	const handleApiKeyChange = (event) => {
		if (browser) {
			localStorage.setItem('apiKey', event.target.value);
		}
	};

	const handleNumQuestionsChange = (event) => {
		if (browser) {
			localStorage.setItem('numQuestions', event.detail.value);
		}
	};

	const handleTopicChange = (event) => {
		if (browser) {
			localStorage.setItem('topic', event.detail.value);
		}
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div style="margin-bottom: 20px;">
		<Textfield
			variant="filled"
			label="ChatGPT API Key"
			bind:value={apiKey}
			on:change={handleApiKeyChange}
			style="width: 100%"
			required
		>
			<HelperText persistent slot="helper">
				Get your API Key <a href="https://platform.openai.com/account/api-keys" target="_blank"
					>here</a
				>
			</HelperText>
		</Textfield>
	</div>
	<div class="grid">
		<Select
			label="Choose a Topic"
			bind:value={topic}
			on:SMUISelect:change={handleTopicChange}
			variant="filled"
			required
		>
			{#each topics as topic}
				<Option value={topic}>{topic}</Option>
			{/each}
		</Select>
		<Select
			label="Number of Questions"
			bind:value={numQuestions}
			on:SMUISelect:change={handleNumQuestionsChange}
			variant="filled"
			required
		>
			{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as num}
				<Option value={`${num}`}>{`${num}`}</Option>
			{/each}
		</Select>
	</div>
	<Button variant="unelevated" style="width: 100%" disabled={buttonDisabled}>
		<Label>{buttonLabel}</Label>
	</Button>
	{#if result}
		<Paper variant="outlined" style="margin-top: 20px">
			<Content>
				<pre>{result}</pre>
			</Content>
		</Paper>
	{/if}
</form>

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 20px;
		margin-bottom: 20px;
	}

	pre {
		font-family: inherit;
		white-space: pre-line;
	}
</style>
