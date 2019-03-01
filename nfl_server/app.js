const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', function(req, res) {
	res.send('Hit the home page of the server');
});

app.get('/career_passing_stats', function(req, res) {
	res.sendFile(__dirname + '/data/career_passing_stats_10.csv', function(err) {
		if (!err) console.log('File has been sent');
	});
});

app.listen(process.env.PORT || 3000, function() {
	console.log('NFL Server listening on PORT:', process.env.PORT);
});
