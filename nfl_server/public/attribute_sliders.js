const sliderAttributes = {
	qb: [ 'Completion %', 'Yards', 'Touchdowns', 'QB Rating', 'Wins' ],
	wr: [ 'Receptions', 'Yards', 'Yards/Reception', 'Touchdowns', 'Yards/Game' ],
	rb: [ 'Attempts', 'Yards', 'Yards/Attempt', 'Touchdowns', 'Yards/Game' ]
};

const getSliderAttributes = () => {
	const weights = { qb: {}, wr: {}, rb: {} };
	d3.selectAll('.weightSliderQb').each(function(d) {
		const slider = d3.select(this);
		const weight = slider.property('value');
		const id = slider.property('id');
		weights['qb'][id] = weight;
	});
	d3.selectAll('.weightSliderWr').each(function(d) {
		const slider = d3.select(this);
		const weight = slider.property('value');
		const id = slider.property('id');
		weights['wr'][id] = weight;
	});
	d3.selectAll('.weightSliderRb').each(function(d) {
		const slider = d3.select(this);
		const weight = slider.property('value');
		const id = slider.property('id');
		weights['rb'][id] = weight;
	});
	return weights;
};

const initializeAttributeSliders = (data) => {
	d3
		.select('#weightColQb')
		.selectAll('attributeInput')
		.data(sliderAttributes['qb'])
		.enter()
		.append('label')
		.attr('for', function(d, i) {
			return d;
		})
		.text(function(d) {
			return d;
		})
		.append('input')
		.attr('type', 'range')
		.attr('class', 'weightSliderQb')
		.attr('min', '1')
		.attr('max', '100')
		.attr('id', function(d, i) {
			return d;
		})
		.attr('onClick', 'updatePlot()');

	d3
		.select('#weightColWr')
		.selectAll('attributeInput')
		.data(sliderAttributes['wr'])
		.enter()
		.append('label')
		.attr('for', function(d, i) {
			return d;
		})
		.text(function(d) {
			return d;
		})
		.append('input')
		.attr('type', 'range')
		.attr('class', 'weightSliderWr')
		.attr('min', '1')
		.attr('max', '100')
		.attr('id', function(d, i) {
			return d;
		})
		.attr('onClick', 'updatePlot()');

	d3
		.select('#weightColRb')
		.selectAll('attributeInput')
		.data(sliderAttributes['rb'])
		.enter()
		.append('label')
		.attr('for', function(d, i) {
			return d;
		})
		.text(function(d) {
			return d;
		})
		.append('input')
		.attr('type', 'range')
		.attr('class', 'weightSliderRb')
		.attr('min', '1')
		.attr('max', '100')
		.attr('id', function(d, i) {
			return d;
		})
		.attr('onClick', 'updatePlot()');
};
