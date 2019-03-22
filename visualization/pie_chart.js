const generatePieChart = (sliderAttributes, d) => {
	const w = 400;
	const h = 400;
	const radius = 100;

	const pieChartData = {};
	for (var attr in sliderAttributes) {
		attr_label = attr + '-Normalized'
		norm_value = parseFloat(d[attr_label])
		weight = parseFloat(sliderAttributes[attr]) / 100
		pieChartData[attr_label] = norm_value * weight;
	}

	const pieSVG = d3
		.select('#tipDiv')
		.append('svg')
		.attr('width', w)
		.attr('height', h)
		.append('g')
		.attr('transform', 'translate(' + width / 4 + ',' + height / 4 + ')');

	// TODO: Change the colors of the pie chart
	const color = d3
		.scaleOrdinal()
		.domain(pieChartData)
		.range([ '#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56' ]);

	const pie = d3.pie().value(function(d) {
		return d.value;
	});
	const pieChartProportions = pie(d3.entries(pieChartData));
	const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
	pieSVG
		.selectAll('slices')
		.data(pieChartProportions)
		.enter()
		.append('path')
		.attr('d', arcGenerator)
		.attr('fill', function(d) {
			return color(d.data.key);
		})
		.attr('stroke', 'black')
		.style('stroke-width', '2px')
		.style('opacity', 0.7);

	pieSVG
		.selectAll('slices')
		.data(pieChartProportions)
		.enter()
		.append('text')
		.text(function(d) {
			let attribute = d.data.key;
			attribute = attribute.substring(0, attribute.indexOf('-Normalized'));
			return attribute + ': ' + d.data.value.toFixed(2);
		})
		.attr('transform', function(d) {
			return 'translate(' + arcGenerator.centroid(d) + ')';
		})
		.style('text-anchor', 'middle')
		.style('font-size', 15);
};
