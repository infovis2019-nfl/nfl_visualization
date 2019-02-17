d3.csv('http://localhost:3000/career_passing_stats').then(function(data) {
	d3
		.select('.chart')
		.selectAll('div')
		.data(data)
		.enter()
		.append('div')
		.style('width', function(d) {
			return d.TD + 'px';
		})
		.text(function(d) {
			return d.Player + ' ' + d.TD;
		});
});
