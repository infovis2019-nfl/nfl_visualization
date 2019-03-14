const getCheckedPlayers = () => {
	const checkedPlayers = [];
	d3.selectAll('.playerCheckbox').each(function(d) {
		const cb = d3.select(this);
		const checked = cb.property('checked');
		const id = cb.property('id');
		if (checked) {
			checkedPlayers.push(id);
		}
	});
	return checkedPlayers;
};

const changePlayerCheckbox = (checkbox) => {
	const checkedPlayers = getCheckedPlayers();
	updateScatterPlotXValues(checkbox);
};

const initializePlayerCheckboxes = (data) => {
	const players = [];
	data.forEach((player) => {
		players.push(player.Player);
	});

	d3
		.select('#playerCol')
		.selectAll('playerInput')
		.data(players)
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
		.attr('class', 'playerCheckbox')
		.attr('id', function(d, i) {
			return d;
		})
		.attr('onClick', 'changePlayerCheckbox(this)');
};
