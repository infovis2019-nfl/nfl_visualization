// TODO: Uncomment a value to create a checkbox for it
const allowedPositions = [
    'QB',
    'WR',
];

const getCheckedPositions = () => {
	const checkedPositions = [];
	d3.selectAll('.attrCheckbox').each(function(d) {
		const cb = d3.select(this);
		const checked = cb.property('checked');
		const id = cb.property('id');
		if (checked) {
			checkedPositions.push(id);
		}
	});
	return checkedPositions;
};

const initializePositionsCheckboxes = (data) => {
	d3
		.select('#posCol')
		.selectAll('attributeInput')
		.data(allowedPositions)
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
		.attr('class', 'attrCheckbox')
		.attr('id', function(d, i) {
			return d;
		})
		.attr('onClick', 'updatePlot()');
};
