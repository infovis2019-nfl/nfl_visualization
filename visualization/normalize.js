// The data and attributes that we should be normalizing
const normalizeSelectedAttributes = (data, attributes) => {
	for (let i = 0; i < attributes.length; i++) {
		// first find the max values of each
		const values = data.map((player) => player[attributes[i]]);
		const max = Math.max(...values);
		const min = Math.min(...values);

		// normalize with respect to the max and min values
		for (let j = 0; j < data.length; j++) {
			const normalizedValue = (data[j][attributes[i]] - min) / (max - min);
			data[j][attributes[i] + '-Normalized'] = normalizedValue;
		}
	}
};
