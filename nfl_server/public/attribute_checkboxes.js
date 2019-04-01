const allowedAttributes = {
	qb: [ 'Completion %', 'Yards', 'Touchdowns', 'QB Rating', 'Wins' ],
	wr: [ 'Receptions', 'Yards', 'Yards/Reception', 'Touchdowns', 'Yards/Game' ],
	rb: [ 'Attempts', 'Yards', 'Yards/Attempt', 'Touchdowns', 'Yards/Game' ]
};

const getCheckedAttributes = () => {
	const checkedAttributes = { qb: [], wr: [], rb: [] };
	d3.selectAll('.attrCheckboxQb').each(function(d) {
		const cb = d3.select(this);
		const checked = cb.property('checked');
		const id = cb.property('id');
		if (checked) {
			checkedAttributes['qb'].push(id.substring(0, id.indexOf('Qb')));
		}
	});
	d3.selectAll('.attrCheckboxWr').each(function(d) {
		const cb = d3.select(this);
		const checked = cb.property('checked');
		const id = cb.property('id');
		if (checked) {
			checkedAttributes['wr'].push(id.substring(0, id.indexOf('Wr')));
		}
	});
	d3.selectAll('.attrCheckboxRb').each(function(d) {
		const cb = d3.select(this);
		const checked = cb.property('checked');
		const id = cb.property('id');
		if (checked) {
			checkedAttributes['rb'].push(id.substring(0, id.indexOf('Rb')));
		}
	});
	return checkedAttributes;
};

const initializeAttributeCheckboxes = (data) => {
	d3
		.select('#attrColQb')
		.selectAll('attributeInput')
		.data(allowedAttributes['qb'])
		.enter()
		.append('label')
		.attr('class', 'pointer')
		.attr('for', function(d, i) {
			return d + 'Qb';
		})
		.text(function(d) {
			return d;
		})
		.append('input')
		.attr('type', 'checkbox')
		.attr('class', 'attrCheckboxQb')
		.attr('id', function(d, i) {
			return d + 'Qb';
		})
		.attr('onClick', 'updatePlot()');

	d3
		.select('#attrColWr')
		.selectAll('attributeInput')
		.data(allowedAttributes['wr'])
		.enter()
		.append('label')
		.attr('class', 'pointer')
		.attr('for', function(d, i) {
			return d + 'Wr';
		})
		.text(function(d) {
			return d;
		})
		.append('input')
		.attr('type', 'checkbox')
		.attr('class', 'attrCheckboxWr')
		.attr('id', function(d, i) {
			return d + 'Wr';
		})
		.attr('onClick', 'updatePlot()');

	d3
		.select('#attrColRb')
		.selectAll('attributeInput')
		.data(allowedAttributes['rb'])
		.enter()
		.append('label')
		.attr('class', 'pointer')
		.attr('for', function(d, i) {
			return d + 'Rb';
		})
		.text(function(d) {
			return d;
		})
		.append('input')
		.attr('type', 'checkbox')
		.attr('class', 'attrCheckboxRb')
		.attr('id', function(d, i) {
			return d + 'Rb';
		})
		.attr('onClick', 'updatePlot()');
};
