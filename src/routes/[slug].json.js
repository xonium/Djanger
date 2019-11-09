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
	
		res.end(JSON.stringify(lookup.get(slug)));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));		
	}

}