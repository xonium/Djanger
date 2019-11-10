import workouts from './_workouts.js';

const lookup = new Map();
workouts.data.forEach(post => {
	if(lookup.has(post.scheduledDateInteger.toString())) {
		let array = lookup.get(post.scheduledDateInteger.toString());
		array.push(post)
	} else {
		lookup.set(post.scheduledDateInteger.toString(), [post]);
	}
	
});

export function get(req, res) {
	const { slug } = req.params;
	
	if(lookup.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		let unsortedWorkouts = lookup.get(slug);
		unsortedWorkouts.sort((a, b) => {
			if(a.whiteboardDisplayOrder < b.whiteboardDisplayOrder) return -1;
			if(a.whiteboardDisplayOrder > b.whiteboardDisplayOrder) return 1;
			return 0;
		})

		res.end(JSON.stringify(unsortedWorkouts));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));		
	}

}