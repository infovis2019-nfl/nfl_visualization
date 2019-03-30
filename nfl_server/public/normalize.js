// The data and attributes that we should be normalizing
const normalizeSelectedAttributes = (data, attributes) => {
	let qb_attributes = attributes['qb'];
	let wr_attributes = attributes['wr'];
	let rb_attributes = attributes['rb'];

	let qb_data = data.filter(function(pl) {
		return pl.Pos == 'qb';
	});

	let wr_data = data.filter(function(pl) {
		return pl.Pos == 'wr';
	});

	let rb_data = data.filter(function(pl) {
		return pl.Pos == 'rb';
	});

	// normalize QBs
	for (let i = 0; i < qb_attributes.length; i++) {
		// first find the max and min values of each
		const values = qb_data.map((player) => player[qb_attributes[i]]);
		const max = Math.max(...values);
		const min = Math.min(...values);

		// normalize with respect to the max and min values
		for (let j = 0; j < qb_data.length; j++) {
			const normalizedValue = max != min ? (qb_data[j][qb_attributes[i]] - min) / (max - min) : 1;
			qb_data[j][qb_attributes[i] + '-Normalized'] = normalizedValue;
		}
	}

	// normalize WRs
	for (let i = 0; i < wr_attributes.length; i++) {
		// first find the max and min values of each
		const values = wr_data.map((player) => player[wr_attributes[i]]);
		const max = Math.max(...values);
		const min = Math.min(...values);

		// normalize with respect to the max and min values
		for (let j = 0; j < wr_data.length; j++) {
			const normalizedValue = max != min ? (wr_data[j][wr_attributes[i]] - min) / (max - min) : 1;
			wr_data[j][wr_attributes[i] + '-Normalized'] = normalizedValue;
		}
	}

	// normalize RBs
	for (let i = 0; i < rb_attributes.length; i++) {
		// first find the max and min values of each
		const values = rb_data.map((player) => player[rb_attributes[i]]);
		const max = Math.max(...values);
		const min = Math.min(...values);

		// normalize with respect to the max and min values
		for (let j = 0; j < rb_data.length; j++) {
			const normalizedValue = max != min ? (rb_data[j][rb_attributes[i]] - min) / (max - min) : 1;
			rb_data[j][rb_attributes[i] + '-Normalized'] = normalizedValue;
		}
	}
};
