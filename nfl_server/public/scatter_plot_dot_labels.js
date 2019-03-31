const addOrRemoveDotLabels = () => {
	const playerLabels = svg.selectAll('.playerNames').data(shownPlayers, function(d) {
		return d.Player;
	});

	playerLabels
		.enter()
		.append('text')
		.attr('class', 'playerNames')
		.text((d) => d.Player)
		.attr('x', 0)
		.attr('y', height - 10)
		.attr('display', function() {
			const toggleCB = document.getElementById('toggleLabelCheckbox');
			return toggleCB.checked ? 'block' : 'none';
		})
		.style('text-anchor', 'middle');

	playerLabels.exit().remove();
};
