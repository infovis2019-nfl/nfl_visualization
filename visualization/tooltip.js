const shouldDisplayPieChart = (data, checkedAttributes) => {
	let displayPieChart = false;
	checkedAttributes.forEach((attr) => {
		if (data[attr + '-Normalized'] > 0) displayPieChart = true;
	});
	return displayPieChart;
};

const generateTooltipHtml = (data, checkedAttributes) => {
	let toolTipHtml = data.Player;
	if (checkedAttributes.length > 0) {
		toolTipHtml += '<br/> (' + xValue(data) + ', ' + yValue(data) + ')';
		checkedAttributes.forEach((attribute) => {
			toolTipHtml += '<br/> ' + attribute + ': ' + data[attribute];
		});

		if (shouldDisplayPieChart(data, checkedAttributes)) {
			toolTipHtml += '<br/> <h5> Combined Score Breakdown: </h5>';
			toolTipHtml += '<br/> <div id="tipDiv"></div><br/>';
		} else {
			toolTipHtml += '<br/> <h5> Combined Score: 0</h5>';
		}
	}
	return toolTipHtml;
};
