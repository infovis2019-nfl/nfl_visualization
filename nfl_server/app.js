const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', function(req, res) {
	res.send('Hit the home page of the server');
});

app.get('/data/:fileName', function(req, res) {
	const fileName = req.params.fileName;
	res.sendFile(`${__dirname}/data/${fileName}.csv`, function(err) {
		if (!err) console.log(`File: ${fileName}.csv has been sent!`);
	});
});

app.listen(process.env.PORT || 3000, function() {
	console.log('NFL Server listening on PORT:', process.env.PORT);
});
