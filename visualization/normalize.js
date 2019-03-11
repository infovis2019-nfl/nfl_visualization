/*
Steps to normalize:
1. Find the min and max values
2. Normalize
*/

// The data and attributes that we should be normalizing
const normalizeSelectedAttributes = (data, attributes) => {
	console.log('The normalize function was called');
	for (let i = 0; i < attributes.length; i++) {
		// first find the max values of each
		const values = data.map((player) => player[attributes[i]]);
		// const max = Math.max((...data)[attributes[i]])
		const max = Math.max(...values);
		const min = Math.min(...values);

		console.log(`The max value for ${attributes[i]} is: ${max}`);
		console.log(`The min value for ${attributes[i]} is: ${min}`);
		console.log('The value of data is:', data);
		// data[attributes[i] + '-Normalized'] =
		for (let j = 0; j < data.length; j++) {
			const normalizedValue = (data[j][attributes[i]] - min) / (max - min);
			data[j][attributes[i] + '-Normalized'] = normalizedValue;
		}
	}
	console.log('The new value of data is:', data);
	for (let i = 0; i < data.length; i++) {
		const player = data[i];
		console.log(
			`${player.Player}: ${player['Cmp%-Normalized']} ${player['Yds-Normalized']} ${player[
				'TD-Normalized'
			]} ${player['Rate-Normalized']} ${player['W-Normalized']} `
		);
	}
};
