const shouldDisplayPieChart = (d, checkedAttributes) => {
	let displayPieChart = false;
	checkedAttributes.forEach((attr) => {
		if (d[attr + '-Normalized'] > 0) displayPieChart = true;
	});
	return displayPieChart;
};

const generateTooltipHtmlRawStats = (d, checkedAttributes) => {
	let toolTipHtml = d.Player;
	toolTipHtml += '<br/> (' + xValue(d) + ', ' + yValue(d) + ')';
	checkedAttributes.forEach((attribute) => {
		toolTipHtml += '<br/> ' + attribute + ': ' + d[attribute];
	});
	return toolTipHtml;
};

const generateTooltipHtmlPieChart = (d, checkedAttributes) => {
	let toolTipHtml = d.Player;
	if (checkedAttributes.length > 0) {
		if (shouldDisplayPieChart(d, checkedAttributes)) {
			toolTipHtml += '<br/> <h5> Combined Score Breakdown: </h5>';
			toolTipHtml += '<br/> <div id="tipDiv"></div><br/>';
		} else {
			toolTipHtml += '<br/> <h5> Combined Score: 0</h5>';
		}
	}
	return toolTipHtml;
};
