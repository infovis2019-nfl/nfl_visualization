const generateTooltipHtml = (data, checkedAttributes) => {
	let toolTipHtml = data.Player + '<br/> (' + xValue(data) + ', ' + yValue(data) + ')';
	checkedAttributes.forEach((attribute) => {
		toolTipHtml += '<br/> ' + attribute + ': ' + data[attribute];
	});
	toolTipHtml += '<br/> <div id="tipDiv"></div><br/>';
	return toolTipHtml;
};
