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
	return d.G;
};
const xScale = d3.scaleLinear().range([ 0, width ]); // value -> display
const xMap = function(d) {
	return xScale(xValue(d));
};
const xAxis = d3.axisBottom().scale(xScale);

// setup y
let yValue = function(d) {
	return 0;
};
let yScale = d3.scaleLinear().range([ height, 0 ]); // value -> display
const yMap = function(d) {
	return yScale(yValue(d));
};
const yAxis = d3.axisLeft().scale(yScale);

// setup fill color
const cValue = function(d) {
	return d.Player;
};
const color = d3.scaleOrdinal(d3.schemeCategory10);

// add the graph canvas to the body of the webpage
const svg = d3
	.select('body')
	.append('svg')
	.attr('class', 'container')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// add the tooltip area to the webpage
const tooltip = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);

const updateScatterPlot = (checkedAttributes) => {
	normalizeSelectedAttributes(qbData, checkedAttributes);
	yValue = function(d) {
		// Calculate the combined score of each of the selected statistics
		let combinedScore = 0;
		for (let i = 0; i < checkedAttributes.length; i++) {
			combinedScore += parseFloat(d[checkedAttributes[i] + '-Normalized']);
		}
		return combinedScore;
	};
	yScale.domain([ 0, d3.max(qbData, yValue) + 0.5 ]);

	svg.select('.y-axis').call(yAxis);
	svg.transition().selectAll('.dot').duration(1500).attr('cy', yMap);
};

let qbData;
d3.csv('http://localhost:3000/data/career_passing_stats_10').then(function(data) {
	initializeCheckboxes(data);
	qbData = data;

	// change string (from CSV) into number format
	data.forEach(function(d) {
		d.G = +d.G;
	});

	// don't want dots overlapping axis, so add in buffer to data domain
	xScale.domain([ d3.min(data, xValue) - 10, d3.max(data, xValue) + 20 ]);
	yScale.domain([ 0, d3.max(data, yValue) + 1 ]);

	// TODO: Figure out why the Axis labels aren't showing
	// x-axis
	svg
		.append('g')
		.attr('class', 'axis')
		.attr('class', 'x-axis')
		.attr('transform', 'translate(0,' + height + ')')
		.call(xAxis)
		.append('text')
		.attr('class', 'label')
		.attr('x', width)
		.attr('y', -6)
		.style('text-anchor', 'end')
		.text('Total Normalized Score');

	// y-axis
	svg
		.append('g')
		.attr('class', 'axis')
		.attr('class', 'y-axis')
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
			const checkedAttributes = getCheckedAttributes();

			tooltip.transition().duration(200).style('opacity', 0.9);
			tooltip
				.html(generateToolTipHtml(d, checkedAttributes))
				.style('left', d3.event.pageX + 20 + 'px')
				.style('top', d3.event.pageY - 28 + 'px');

			const w = 450;
			const h = 450;
			const margin = 10;

			const radius = Math.min(width, height) / 4 - margin;

			const pieChartData = {};
			checkedAttributes.forEach((attr) => {
				pieChartData[attr + '-Normalized'] = d[attr + '-Normalized'];
			});

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
			const data_ready = pie(d3.entries(pieChartData));

			const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

			pieSVG
				.selectAll('slices')
				.data(data_ready)
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
				.data(data_ready)
				.enter()
				.append('text')
				.text(function(d) {
					return d.data.key + ':' + d.data.value;
				})
				.attr('transform', function(d) {
					return 'translate(' + arcGenerator.centroid(d) + ')';
				})
				.style('text-anchor', 'middle')
				.style('font-size', 15);
		})
		.on('mouseout', function(d) {
			tooltip.transition().duration(500).style('opacity', 0);
		});

	// draw legend
	const legend = svg
		.selectAll('.legend')
		.data(color.domain())
		.enter()
		.append('g')
		.attr('class', 'legend')
		.attr('transform', function(d, i) {
			return 'translate(0,' + i * 20 + ')';
		});

	// draw legend colored rectangles
	legend.append('rect').attr('x', width - 18).attr('width', 18).attr('height', 18).style('fill', color);

	// draw legend text
	legend
		.append('text')
		.attr('x', width - 24)
		.attr('y', 9)
		.attr('dy', '.35em')
		.style('text-anchor', 'end')
		.text(function(d) {
			return d;
		});
});
