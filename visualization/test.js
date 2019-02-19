d3.csv('http://localhost:3000/career_passing_stats').then(function(data) {
	d3
		.select('.chart')
		.selectAll('div')
		.data(data)
		.enter()
		.append('div')
		.attr('class', 'bar')
		.style('width', function(d) {
			return d.TD + 'px';
		})
		.text(function(d) {
			return d.Player + ' ' + d.TD;
		});

	d3.selectAll('.bar').on('click', function() {
		console.log('The bar graph has been clicked');
	});
});

document.getElementById('sort').addEventListener('click', function() {
	let data = d3.select('.chart').selectAll('div').data();
	const sortedData = data.sort(function(x, y) {
		return y.TD - x.TD;
	});

	// This is going to remove all of the data before entering new data
	let bars = d3.select('.chart').selectAll('div').remove().exit().data(sortedData);
	bars
		.enter()
		.append('div')
		.attr('class', 'bar')
		.style('width', function(d) {
			return d.TD + 'px';
		})
		.text(function(d) {
			return d.Player + ' ' + d.TD;
		});

	console.log('The value of the sorted data is:', sortedData);
});
