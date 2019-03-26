const margin = { top: 20, right: 20, bottom: 50, left: 50 },
	width = 960 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom;

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
let xScale = d3.scaleLinear().range([ 0, width ]); // value -> display
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
	.select('#visualization')
	.append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// add the tooltip area to the webpage
const tooltip = d3.select('#visualization').append('div').attr('class', 'tooltip').style('opacity', 0);

const updateYAxis = () => {
	if (shownPlayers.length == 0) return;
	yScale.domain([ 0, d3.max(shownPlayers, yValue) + 0.5 ]);
	svg.select('.y-axis').call(yAxis);
};

const updateXAxis = () => {
	if (shownPlayers.length == 0) return;
	xScale.domain([ d3.min(shownPlayers, xValue) - 10, d3.max(shownPlayers, xValue) + 20 ]);
	svg.select('.x-axis').call(xAxis);
};

const updateScatterPlotYValues = (checkedAttributes, sliderAttributes) => {
	normalizeSelectedAttributes(shownPlayers, sliderAttributes);
	yValue = function(d) {
		// Calculate the combined score of each of the selected statistics
		let combinedScore = 0;
		let norm_value = 0;
		let weight_total = 0
		let num_attr = 0
		for (var attr in sliderAttributes) {
			if (checkedAttributes.includes(attr)) {
				norm_value = parseFloat(d[attr + '-Normalized'])
				weight_value = parseFloat(sliderAttributes[attr]) / 100
				weight_total += weight_value
				combinedScore += (norm_value * weight_value);
				num_attr++
			}
		}
		combinedScore = combinedScore * num_attr / weight_total
		return combinedScore;
	};

	updateYAxis();

	svg.transition().selectAll('.dot').duration(1500).attr('cy', yMap);
	svg.transition().selectAll('.playerNames').duration(1500).attr('y', (d) => {
		return yMap(d) - 10;
	});
};

const updateScatterPlotXValues = (playerCheckbox) => {
	if (playerCheckbox.checked) {
		const newPlayers = qbData.filter(function(player) {
			return player.Player == playerCheckbox.id;
		});
		shownPlayers.push(newPlayers[0]);
	} else {
		shownPlayers = shownPlayers.filter(function(player) {
			return player.Player != playerCheckbox.id;
		});
	}

	const dot = svg.selectAll('.dot').data(shownPlayers, function(d) {
		return d.Player;
	});

	normalizeSelectedAttributes(shownPlayers, getSliderAttributes());
	updateYAxis();
	updateXAxis();

	let displayRawStatsOnClick = true;
	dot
		.enter()
		.append('circle')
		.attr('class', 'dot')
		.attr('r', 10)
		.attr('cx', 0)
		.attr('cy', height)
		.style('fill', function(d) {
			return color(cValue(d));
		})
		.style('cursor', 'pointer')
		.on('mouseover', function(d) {
			displayRawStatsOnClick = true;
			const checkedAttributes = getCheckedAttributes();
			const sliderAttributes = getSliderAttributes();

			tooltip.transition().duration(200).style('opacity', 1);
			tooltip
				.html(generateTooltipHtmlPieChart(d, checkedAttributes))
				.style('left', d3.event.pageX + 70 + 'px')
				.style('top', d3.event.pageY - 40 + 'px');

			generatePieChart(d, checkedAttributes);
		})
		.on('click', function(d) {
			const checkedAttributes = getCheckedAttributes();
			tooltip.html(
				displayRawStatsOnClick == true
					? generateTooltipHtmlRawStats(d, checkedAttributes)
					: generateTooltipHtmlPieChart(d, checkedAttributes)
			);
			if (!displayRawStatsOnClick) generatePieChart(d, checkedAttributes);
			displayRawStatsOnClick = !displayRawStatsOnClick;
		})
		.on('mouseout', function(d) {
			tooltip.transition().duration(500).style('opacity', 0);
		});

	dot.exit().remove();

	addOrRemoveDotLabels();

	// We need to chain the transitions as we cannot have > 1 transition on the same object at a time
	const dotsVerticalTransition = svg.selectAll('.dot').transition().duration(500).attr('cy', yMap);
	dotsVerticalTransition.transition().duration(500).attr('cx', xMap);

	const playerNamesVerticalTransition = svg.selectAll('.playerNames').transition().duration(500).attr('y', (d) => {
		return yMap(d) - 10;
	});

	playerNamesVerticalTransition.transition().duration(500).attr('x', (d) => {
		return xMap(d);
	});
};

let qbData;
let shownPlayers = [];
d3.csv('http://localhost:3000/data/career_passing_stats_10_normalized').then(function(data) {
	initializeAttributeCheckboxes(data);
	initializeAttributeSliders(data);
	initializePlayerCheckboxes(data);
	
	qbData = data;

	data.forEach(function(d) {
		d.G = +d.G;
	});

	// don't want dots overlapping axis, so add in buffer to data domain
	xScale.domain([ 100, 200 ]);
	yScale.domain([ 0, d3.max(data, yValue) + 1 ]);

	// TODO: Figure out why the Axis labels aren't showing
	// x-axis
	svg
		.append('g')
		.attr('class', 'axis')
		.attr('class', 'x-axis')
		.attr('transform', 'translate(0,' + height + ')')
		.call(xAxis);

	svg
		.append('text')
		.attr('transform', 'translate(' + width / 2 + ' ,' + (height + margin.top + 20) + ')')
		.style('text-anchor', 'middle')
		.text('Games Played');

	// y-axis
	svg.append('g').attr('class', 'axis').attr('class', 'y-axis').call(yAxis);
	svg
		.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('y', 0 - margin.left)
		.attr('x', 0 - height / 2)
		.attr('dy', '1em')
		.style('text-anchor', 'middle')
		.text('Combined Score');
});
