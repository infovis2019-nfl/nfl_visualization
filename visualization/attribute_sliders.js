const sliderAttributes = [
	'Cmp%',
	'Yds',
	'TD',
	'Rate',
	'W'
];

const getSliderAttributes = () => {
	const weights = {};
	d3.selectAll('.weightSlider').each(function(d) {
		const slider = d3.select(this);
		const weight = slider.property('value');
		const id = slider.property('id');
		weights[id] = weight
	});
	return weights;
};

const changeWeightSlider = () => {
	const weights = getSliderAttributes();
	updateScatterPlotYValues(weights);
};

const initializeAttributeSliders = (data) => {
	d3
		.select('#attrCol')
		.selectAll('attributeInput')
		.data(sliderAttributes)
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
		.attr('class', 'weightSlider')
		.attr('min', '1')
        .attr('max', '100')
		.attr('id', function(d, i) {
			return d;
		})
        .attr('onClick', 'changeWeightSlider(this)');
};
