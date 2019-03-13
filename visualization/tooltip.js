const generateTooltipHtml = (data, checkedAttributes) => {
	let toolTipHtml = data.Player;
	if (checkedAttributes.length > 0) {
		toolTipHtml += '<br/> (' + xValue(data) + ', ' + yValue(data) + ')';
		checkedAttributes.forEach((attribute) => {
			toolTipHtml += '<br/> ' + attribute + ': ' + data[attribute];
		});
		toolTipHtml += '<br/> <h5> Combined Score Breakdown: </h5>';
		toolTipHtml += '<br/> <div id="tipDiv"></div><br/>';
	}
	return toolTipHtml;
};
