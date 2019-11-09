<style>
</style>

<svelte:head>
	<title>apakaka</title>
</svelte:head>

<script context="module">
	export async function preload(page, session) {
		if(page.query.date) {
			return this.fetch(`${page.query.date}.json`).then(r => r.json()).then(workouts => {
				return { workouts };
			});
		}

		const workoutDate = new Date();
		const day = ('0' + workoutDate.getDate()).slice(-2);
		const month = ('0' + (workoutDate.getMonth() + 1)).slice(-2);
		const year = workoutDate.getFullYear();

		return this.fetch(`${year + month + day}.json`).then(r => r.json()).then(workouts => {
			return { workouts };
		});
	}
</script>

<script>
	export let workouts;
</script>

<ul>
	{#each workouts as workout}
		<div>
			<div>{workout.scheduledDateInteger}</div>
			<div>{workout.description}</div>
			<div>{workout.athletesNotes}</div>
		</div>
	{/each}
</ul>


