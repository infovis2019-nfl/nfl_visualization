const w = 700;
const h = 500;
const margin = {
	top: 50,
	bottom: 100,
	left: 30,
	right: 20
};
const width = w - margin.left - margin.right;
const height = h - margin.top - margin.bottom;

d3.csv('http://localhost:3000/career_passing_stats').then(function(data) {
	let x = d3
		.scaleBand()
		.domain(
			data.map(function(d) {
				return d.Player;
			})
		)
		.range([ margin.left, width ])
		.padding(0.1); // controls the padding between each of the bars

	let y = d3
		.scaleLinear()
		.domain([
			0,
			d3.max(data, function(d) {
				return d.TD;
			})
		])
		.range([ height, margin.top ]);

	const yAxis = d3.axisLeft().scale(y);
	let svg = d3.select('body').append('svg').attr('id', 'chart').attr('width', w).attr('height', h);

	svg.append('g').attr('class', 'axis').attr('transform', 'translate(' + margin.left + ',0)').call(yAxis);

	const toolTip = d3.select('body').append('div').attr('class', 'toolTip');

	svg
		.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('class', 'bar')
		.on('mouseover', function(data) {
			d3.select(this).attr('fill', 'red');
			toolTip.style('visibility', 'visible');
		})
		.on('mouseout', function() {
			d3.select(this).transition('colorfade').duration(250).attr('fill', function(d) {
				return (
					'rgb(' +
					Math.round(d.value * 2) +
					',' +
					Math.round(d.value * 2) +
					',' +
					Math.round(d.value * 2) +
					')'
				);
			});
			toolTip.style('visibility', 'hidden');
		})
		.on('mousemove', function(data) {
			toolTip.style('top', event.pageY - 10 + 'px').style('left', event.pageX + 10 + 'px');
			toolTip.text(`${data.Player} : ${data.TD} TDs`);
		})
		.attr('fill', function(d) {
			return (
				'rgb(' + Math.round(d.value * 2) + ',' + Math.round(d.value * 2) + ',' + Math.round(d.value * 2) + ')'
			);
		})
		.attr('x', function(d, i) {
			return x(d.Player);
		})
		.attr('width', x.bandwidth())
		.attr('y', height)
		.transition('bars')
		.delay(function(d, i) {
			return i * 50;
		})
		.duration(1000)
		.attr('y', function(d, i) {
			return y(d.TD);
		})
		.attr('height', function(d, i) {
			return height - y(d.TD);
		});

	// svg.selectAll('rect').append('title').text(function(d) {
	// 	return d.Player + ': ' + d.TD;
	// });

	// Value at the top of the bar
	svg
		.selectAll('.val-label')
		.data(data)
		.enter()
		.append('text')
		.classed('val-label', true)
		.attr('x', function(d, i) {
			return x(d.Player) + x.bandwidth() / 2;
		})
		.attr('y', height)
		.transition('label')
		.delay(function(d, i) {
			return i * 50;
		})
		.duration(1000)
		.attr('y', function(d, i) {
			return y(d.TD) - 4;
		})
		.attr('text-anchor', 'middle')
		.text(function(d) {
			return d.TD;
		});

	// Player Name along the x-axis
	svg
		.selectAll('.bar-label')
		.data(data)
		.enter()
		.append('text')
		.classed('bar-label', true)
		.attr('transform', function(d, i) {
			return 'translate(' + (x(d.Player) + x.bandwidth() / 2 - 8) + ',' + (height + 15) + ')' + ' rotate(45)';
		})
		.attr('text-anchor', 'left')
		.text(function(d) {
			return d.Player;
		});

	d3.select('#byPlayer').on('click', function() {
		data.sort(function(a, b) {
			return d3.ascending(a.Player, b.Player);
		});
		x.domain(
			data.map(function(d) {
				return d.Player;
			})
		);
		svg.selectAll('.bar').transition().duration(500).attr('x', function(d, i) {
			return x(d.Player);
		});

		svg.selectAll('.val-label').transition().duration(500).attr('x', function(d, i) {
			return x(d.Player) + x.bandwidth() / 2;
		});

		svg.selectAll('.bar-label').transition().duration(500).attr('transform', function(d, i) {
			return 'translate(' + (x(d.Player) + x.bandwidth() / 2 - 8) + ',' + (height + 15) + ')' + ' rotate(45)';
		});
	});

	d3.select('#byTD').on('click', function() {
		data.sort(function(a, b) {
			return d3.descending(a.TD, b.TD);
		});
		x.domain(
			data.map(function(d) {
				return d.Player;
			})
		);
		svg.selectAll('.bar').transition().duration(500).attr('x', function(d, i) {
			return x(d.Player);
		});

		svg.selectAll('.val-label').transition().duration(500).attr('x', function(d, i) {
			return x(d.Player) + x.bandwidth() / 2;
		});

		svg.selectAll('.bar-label').transition().duration(500).attr('transform', function(d, i) {
			return 'translate(' + (x(d.Player) + x.bandwidth() / 2 - 8) + ',' + (height + 15) + ')' + ' rotate(45)';
		});
	});
});
