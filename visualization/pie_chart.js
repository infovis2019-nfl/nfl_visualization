const generatePieChart = (d, checkedAttributes) => {
	const width = 400,
		height = 400,
		radius = Math.min(width, height) / 6 - 10,
		color = d3.scaleOrdinal(d3.schemeCategory10),
		donut = d3.pie(),
		arc = d3.arc().innerRadius(0).outerRadius(radius);

	const cValue = function(d) {
		let stat = d.data.name;
		return stat.substring(0, stat.indexOf('-Normalized'));
	};

	const pieChartData = [];
	checkedAttributes.forEach((attr) => {
		pieChartData[attr + '-Normalized'] = d[attr + '-Normalized'];
		pieChartData.push({
			name: attr + '-Normalized',
			val: d[attr + '-Normalized']
		});
	});

	if (shouldDisplayPieChart(d, checkedAttributes)) {
		const pieSVG = d3
			.select('#tipDiv')
			.append('svg')
			.data([ pieChartData ])
			.attr('width', width + 150)
			.attr('height', height);

		const arcs = pieSVG
			.selectAll('arc')
			.data(
				donut.value(function(d) {
					return d.val;
				})
			)
			.enter()
			.append('g')
			.attr('class', 'arc')
			.attr('transform', 'translate(' + width / 4 + ',' + height / 4 + ')');

		arcs
			.append('path')
			.attr('fill', function(d, i) {
				return color(cValue(d));
			})
			.attr('d', arc);

		arcs
			.append('text')
			.attr('text-anchor', 'middle')
			.attr('x', function(d) {
				const a = d.startAngle + (d.endAngle - d.startAngle) / 2 - Math.PI / 2;
				d.cx = Math.cos(a) * (radius - 45);
				return (d.x = Math.cos(a) * (radius + 30));
			})
			.attr('y', function(d) {
				const a = d.startAngle + (d.endAngle - d.startAngle) / 2 - Math.PI / 2;
				d.cy = Math.sin(a) * (radius - 45);
				return (d.y = Math.sin(a) * (radius + 30));
			})
			.text(function(d) {
				return d.value > 0 ? d.value.toFixed(2) : '';
			})
			.each(function(d) {
				const bbox = this.getBBox();
				d.sx = d.x - bbox.width / 2 - 2;
				d.ox = d.x + bbox.width / 2 + 2;
				d.sy = d.oy = d.y + 5;
			});

		arcs
			.append('path')
			.attr('class', 'pointer')
			.style('fill', 'none')
			.style('stroke', 'black')
			.attr('d', function(d) {
				if (d.data.val > 0) {
					if (d.cx > d.ox) {
						return 'M' + d.sx + ',' + d.sy + 'L' + d.ox + ',' + d.oy + ' ' + d.cx + ',' + d.cy;
					} else {
						return 'M' + d.ox + ',' + d.oy + 'L' + d.sx + ',' + d.sy + ' ' + d.cx + ',' + d.cy;
					}
				}
			});

		const legend = pieSVG
			.selectAll('.legend')
			.data(color.domain())
			.enter()
			.append('g')
			.attr('class', 'legend')
			.attr('transform', function(d, i) {
				return 'translate(0,' + i * 20 + ')';
			});

		// draw legend colored rectangles
		legend.append('rect').attr('x', width - 90).attr('width', 18).attr('height', 18).style('fill', color);

		// draw legend text
		legend
			.append('text')
			.attr('x', width - 96)
			.attr('y', 9)
			.attr('dy', '.35em')
			.style('text-anchor', 'end')
			.text(function(d) {
				return d;
			});
	}
};
