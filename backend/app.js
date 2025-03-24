const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Users data
let users = [
	{ id: 1, name: 'John Doe' },
	{ id: 2, name: 'Jane Smith' }
];

// Middleware
app.use(cors()); // cross-domain
app.use(express.json()); // parsing

// Get users list
app.get('/users', (req, res) => {
	res.json(users);
});

// add new user
app.post('/users', (req, res) => {
	const { name } = req.body;
	if (!name) {
		return res.status(400).json({ message: 'Name is required' });
	}
	const newUser = { id: users.length + 1, name };
	users.push(newUser);
	res.status(201).json(newUser);
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
