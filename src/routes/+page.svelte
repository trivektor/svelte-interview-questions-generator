<script>
	import InterviewQuestions from '../lib/interview-questions.svelte';
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	let prominent = false;
	let dense = false;
	let secondaryColor = false;
</script>

<div>
	<div class="top-app-bar-container">
		<TopAppBar
			variant="static"
			{prominent}
			{dense}
			color={secondaryColor ? 'secondary' : 'primary'}
		>
			<Section>
				<Title>Software Engineer Interview Questions Generator</Title>
			</Section>
		</TopAppBar>
		<div class="main-content">
			<InterviewQuestions />
		</div>
	</div>
</div>

<style>
	.top-app-bar-container {
		background-color: var(--mdc-theme-background, #fff);
	}

	@media (max-width: 480px) {
		.top-app-bar-container {
			margin-right: 0;
		}
	}

	.main-content {
		padding: 20px;
	}
</style>
