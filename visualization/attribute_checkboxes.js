// TODO: Uncomment a value to create a checkbox for it
const allowedAttributes = {
	'qb': [
		'Cmp%',
		'Yds',
		'TD',
		'Rate',
		'W'
	],
	'wr': [
		'Rec',
		'Yds',
		'Y/R',
		'TD',
		'Y/G'
	]
};

const getCheckedAttributes = () => {
	const checkedAttributes = {'qb': [], 'wr': []};
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
	return checkedAttributes;
};

const initializeAttributeCheckboxes = (data) => {
	d3
		.select('#attrCol')
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
};
