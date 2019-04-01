const shouldDisplayPieChart = (d, checkedAttributes) => {
	let displayPieChart = false;
	checkedAttributes.forEach((attr) => {
		if (d[attr + '-Normalized'] > 0) displayPieChart = true;
	});
	return displayPieChart;
};

const generateTooltipHtmlRawStats = (d, checkedAttributes) => {
	let toolTipHtml = `<h5>${d.Player}</h5>`;
	toolTipHtml += '<strong>Coordinates: </strong> (' + xValue(d) + ', ' + yValue(d) + ')';
	toolTipHtml += '<br/> <strong>Games Played: </strong> ' + d['G'];
	checkedAttributes.forEach((attribute) => {
		toolTipHtml += '<br/> <strong>' + attribute + ': </strong> ' + d[attribute];
	});
	return toolTipHtml;
};

const generateTooltipHtmlPieChart = (d, checkedAttributes) => {
	let toolTipHtml = `<h5>${d.Player}</h5>`;
	if (checkedAttributes.length > 0) {
		if (shouldDisplayPieChart(d, checkedAttributes)) {
			toolTipHtml += '<strong> Combined Score Breakdown: </strong>';
			toolTipHtml += '<br/> <div id="tipDiv"></div><br/>';
		} else {
			toolTipHtml += '<br/> <strong> Combined Score: 0</strong>';
		}
	}
	return toolTipHtml;
};
