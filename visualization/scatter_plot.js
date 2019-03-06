const margin = { top: 20, right: 20, bottom: 30, left: 40 },
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

/* 
 * value accessor - returns the value to encode for a given data object.
 * scale - maps value to a visual display encoding, such as a pixel position.
 * map function - maps from data value to display value
 * axis - sets up axis
 */

// setup x
const xValue = function(d) {
	// TODO: This will need to be the sum of the normalized statistics that are chosen by the user
	return d.G;
};
const xScale = d3.scaleLinear().range([ 0, width ]); // value -> display
const xMap = function(d) {
	return xScale(xValue(d));
};
const xAxis = d3.axisBottom().scale(xScale);

// setup y
const yValue = function(d) {
	return d.TD;
};
const yScale = d3.scaleLinear().range([ height, 0 ]); // value -> display
const yMap = function(d) {
	return yScale(yValue(d));
};
const yAxis = d3.axisLeft().scale(yScale);

// setup fill color
const cValue = function(d) {
	return d.Manufacturer;
};
const color = d3.scaleOrdinal(d3.schemeCategory10);

// add the graph canvas to the body of the webpage
const svg = d3
	.select('body')
	.append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// add the tooltip area to the webpage
const tooltip = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);

// load data
d3.csv('http://localhost:3000/data/career_passing_stats_10').then(function(data) {
	// change string (from CSV) into number format
	data.forEach(function(d) {
		// d.Calories = +d.Calories;
		d.G = +d.G;
		d.TD = +d.TD;
		// d['Protein (g)'] = +d['Protein (g)'];
	});

	// don't want dots overlapping axis, so add in buffer to data domain
	// TODO: determine how much additional padding should be added to each - this will be dependent on the units that are used
	xScale.domain([ d3.min(data, xValue) - 100, d3.max(data, xValue) + 100 ]);
	yScale.domain([ d3.min(data, yValue) - 100, d3.max(data, yValue) + 100 ]);

	// x-axis
	svg
		.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + height + ')')
		.call(xAxis)
		.append('text')
		.attr('class', 'label')
		.attr('x', width)
		.attr('y', -6)
		.style('text-anchor', 'end')
		.text('Games Played');

	// y-axis
	svg
		.append('g')
		.attr('class', 'y axis')
		.call(yAxis)
		.append('text')
		.attr('class', 'label')
		.attr('transform', 'rotate(-90)')
		.attr('y', 6)
		.attr('dy', '.71em')
		.style('text-anchor', 'end')
		.text('Yards');

	// draw dots
	svg
		.selectAll('.dot')
		.data(data)
		.enter()
		.append('circle')
		.attr('class', 'dot')
		.attr('r', 5)
		.attr('cx', xMap)
		.attr('cy', yMap)
		.style('fill', function(d) {
			return color(cValue(d));
		})
		.on('mouseover', function(d) {
			tooltip.transition().duration(200).style('opacity', 0.9);
			tooltip
				.html(d['Player'] + '<br/> (' + xValue(d) + ', ' + yValue(d) + ')')
				.style('left', d3.event.pageX + 5 + 'px')
				.style('top', d3.event.pageY - 28 + 'px');
		})
		.on('mouseout', function(d) {
			tooltip.transition().duration(500).style('opacity', 0);
		});

	// // draw legend
	// const legend = svg
	// 	.selectAll('.legend')
	// 	.data(color.domain())
	// 	.enter()
	// 	.append('g')
	// 	.attr('class', 'legend')
	// 	.attr('transform', function(d, i) {
	// 		return 'translate(0,' + i * 20 + ')';
	// 	});

	// // draw legend colored rectangles
	// legend.append('rect').attr('x', width - 18).attr('width', 18).attr('height', 18).style('fill', color);

	// // draw legend text
	// legend
	// 	.append('text')
	// 	.attr('x', width - 24)
	// 	.attr('y', 9)
	// 	.attr('dy', '.35em')
	// 	.style('text-anchor', 'end')
	// 	.text(function(d) {
	// 		return d;
	// 	});
});
