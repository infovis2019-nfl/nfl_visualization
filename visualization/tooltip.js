const generateTooltipHtml = (data, sliderAttributes) => {
	let toolTipHtml ='<br/> <div id="tipDiv"></div><br/>';
	if (sliderAttributes) {
		// toolTipHtml += '<br/> (' + xValue(data) + ', ' + yValue(data) + ')';
		// for (var attr in sliderAttributes) {
		// 	toolTipHtml += '<br/> ' + attr + ': ' + sliderAttributes[attr];
		// }
		// toolTipHtml += '<br/> <h5> Combined Score Breakdown: </h5>';
		// toolTipHtml += '<br/> <div id="tipDiv"></div><br/>';
	}
	return toolTipHtml;
};
