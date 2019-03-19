// TODO: Uncomment a value to create a checkbox for it
const allowedAttributes = [
	// 'Rk',
	// 'Player',
	// 'From',
	// 'To',
	// 'Draft',
	// 'Tm',
	// 'Lg',
	// 'G',
	// 'GS',
	// 'Cmp',
	// 'Att',
	'Cmp%',
	'Yds',
	'TD',
	// 'Int',
	// 'Pick6',
	// 'TD%',
	// 'Int%',
	'Rate',
	// 'Sk',
	// 'YdsASDF',
	// 'Y/A',
	// 'AY/A',
	// 'ANY/A',
	// 'Y/G',
	'W'
	// 'L',
	// 'T',
	// '4QC',
	// 'GWD'
];

// const getCheckedAttributes = () => {
// 	const checkedAttributes = [];
// 	d3.selectAll('.attrCheckbox').each(function(d) {
// 		const cb = d3.select(this);
// 		const checked = cb.property('checked');
// 		const id = cb.property('id');
// 		if (checked) {
// 			checkedAttributes.push(id);
// 		}
// 	});
// 	return checkedAttributes;
// };

// const changeAttributeCheckbox = () => {
// 	const checkedAttributes = getCheckedAttributes();
// 	updateScatterPlotYValues(checkedAttributes);
// };

const getCheckedAttributes = () => {
	const weights = [];
	d3.selectAll('.weightSlider').each(function(d) {
		const slider = d3.select(this);
		const weight = slider.property('value');
		const id = slider.property('id');
		weights[id] = weight
	});
	return weights;
};

const changeWeightSlider = () => {
	const weights = getCheckedAttributes();
	updateScatterPlotYValues(weights);
};

const initializeAttributeCheckboxes = (data) => {
	d3
		.select('#attrCol')
		.selectAll('attributeInput')
		.data(allowedAttributes)
		.enter()
		.append('label')
		.attr('for', function(d, i) {
			return d;
		})
		.text(function(d) {
			return d;
		})
		.append('input')
		.attr('type', 'range')
		.attr('class', 'weightSlider')
		.attr('min', '1')
		.attr('max', '100')
		.attr('id', function(d, i) {
			return d;
		})
		.attr('onClick', 'changeWeightSlider(this)');

		// .append('input')
		// .attr('type', 'checkbox')
		// .attr('class', 'attrCheckbox')
		// .attr('id', function(d, i) {
		// 	return d;
		// })
		// .attr('onClick', 'changeAttributeCheckbox()');
};
