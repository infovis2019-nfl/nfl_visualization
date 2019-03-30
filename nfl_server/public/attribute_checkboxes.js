const allowedAttributes = {
	qb: [ 'Completion %', 'Yards', 'TD', 'QB Rating', 'Wins' ],
	wr: [ 'Receptions', 'Yards', 'Yards/Reception', 'TD', 'Yards/Game' ],
	rb: ['Attempts', 'Yards', 'Yards/Attempt', 'TD', 'Yards/Game']
};

const getCheckedAttributes = () => {
	const checkedAttributes = { qb: [], wr: [], rb: [] };
	d3.selectAll('.attrCheckboxQb').each(function(d) {
		const cb = d3.select(this);
		const checked = cb.property('checked');
		const id = cb.property('id');
		if (checked) {
			checkedAttributes['qb'].push(id);
		}
	});
	d3.selectAll('.attrCheckboxWr').each(function(d) {
		const cb = d3.select(this);
		const checked = cb.property('checked');
		const id = cb.property('id');
		if (checked) {
			checkedAttributes['wr'].push(id);
		}
	});
	d3.selectAll('.attrCheckboxRb').each(function(d) {
		const cb = d3.select(this);
		const checked = cb.property('checked');
		const id = cb.property('id');
		if (checked) {
			checkedAttributes['rb'].push(id);
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
		.attr('for', function(d, i) {
			return d;
		})
		.text(function(d) {
			return d;
		})
		.append('input')
		.attr('type', 'checkbox')
		.attr('class', 'attrCheckboxQb')
		.attr('id', function(d, i) {
			return d;
		})
		.attr('onClick', 'updatePlot()');

	d3
		.select('#attrColWr')
		.selectAll('attributeInput')
		.data(allowedAttributes['wr'])
		.enter()
		.append('label')
		.attr('for', function(d, i) {
			return d;
		})
		.text(function(d) {
			return d;
		})
		.append('input')
		.attr('type', 'checkbox')
		.attr('class', 'attrCheckboxWr')
		.attr('id', function(d, i) {
			return d;
		})
		.attr('onClick', 'updatePlot()');

	d3
		.select('#attrColRb')
		.selectAll('attributeInput')
		.data(allowedAttributes['rb'])
		.enter()
		.append('label')
		.attr('for', function(d, i) {
			return d;
		})
		.text(function(d) {
			return d;
		})
		.append('input')
		.attr('type', 'checkbox')
		.attr('class', 'attrCheckboxRb')
		.attr('id', function(d, i) {
			return d;
		})
		.attr('onClick', 'updatePlot()');
};
