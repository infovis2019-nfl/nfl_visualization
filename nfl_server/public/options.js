const initializePlayerLabelToggle = () => {
	const cb = document.getElementById('toggleLabelCheckbox');

	cb.addEventListener('click', function() {
		const playerLabels = document.getElementsByClassName('playerNames');
		if (this.checked) {
			for (let i = 0; i < playerLabels.length; i++) {
				playerLabels[i].style.display = 'block';
			}
		} else {
			for (let i = 0; i < playerLabels.length; i++) {
				playerLabels[i].style.display = 'none';
			}
		}
	});
};
