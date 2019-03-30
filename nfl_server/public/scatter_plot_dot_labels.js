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
		.style('text-anchor', 'middle');

	playerLabels.exit().remove();
};
