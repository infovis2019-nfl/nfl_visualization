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
	yValue = function(d) {
		// Calculate the combined score of each of the selected statistics
		console.log(d);
		let combinedScore = 0;
		for (let i = 0; i < checkedAttributes.length; i++) {
			combinedScore += parseFloat(d[checkedAttributes[i]]);
		}
		console.log(`Combined Score for ${d.Player}: ${combinedScore}`);
		return combinedScore;
	};
	yScale.domain([ 0, d3.max(qbData, yValue) + 0.5 ]);

	svg.select('.y-axis').call(yAxis);
	svg.transition().selectAll('.dot').duration(1500).attr('cy', yMap);
};

let qbData;
d3.csv('http://localhost:3000/data/career_passing_stats_10_normalized').then(function(data) {
	initializeCheckboxes(data);
	qbData = data;

	// change string (from CSV) into number format
	data.forEach(function(d) {
		d.G = +d.G;
		d.cmpNormalized = +d['Cmp%-Normalized'];
		d.ydsNormalized = +d['Yds-Normalized'];
		d.tdsNormalized = +d['TD-Normalized'];
		d.rateNormalized = +d['Rate-Normalized'];
		d.winsNormalized = +d['W-Normalized'];
	});

	// don't want dots overlapping axis, so add in buffer to data domain
	xScale.domain([ d3.min(data, xValue) - 10, d3.max(data, xValue) + 20 ]);
	// yScale.domain([ d3.min(data, yValue) - 1, d3.max(data, yValue) + 1 ]);
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
			tooltip.transition().duration(200).style('opacity', 0.9);
			tooltip
				.html(
					d['Player'] +
						'<br/> (' +
						xValue(d) +
						', ' +
						yValue(d) +
						') <br/> Touchdowns: ' +
						d.TD +
						' <br/> Yards: ' +
						d.Yds +
						' <br/> Wins: ' +
						d.W +
						' <br/> Completion Percentage: ' +
						d['Cmp%'] +
						'<br/> QBR: ' +
						d.Rate
				)
				.style('left', d3.event.pageX + 20 + 'px')
				.style('top', d3.event.pageY - 28 + 'px');
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
