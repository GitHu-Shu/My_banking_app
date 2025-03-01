
const express = require('express');
const cors = require('cors');
const jwt = require('jwt-simple');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Dummy users for login
const users = [
	{ username: 'user1', password: 'password1' },
	{ username: 'user2', password: 'password2' },
  ];

app.get('/', (req, res) => {
	  console.log('Get request to /')
	  res.send('Welcome to the Banking App API!');
});

// Login route
app.post('/login', (req, res) => {
	const { username, password } = req.body;
	console.log('Login attempt:', username);

	// Dummy validation of username and password
	const user = users.find(u => u.username === username && u.password === password);

	if (user) {
	  // Create JWT token
	  const payload = { username: user.username };
	  const token = jwt.encode(payload, process.env.JWT_SECRET);  // Encode with secret key
	  console.log('Login successful:', username);

	  // Return the token in response
	  res.json({ token });
	} else {
	  // If login failed
	  console.log('Invalid login attempt:', username);
	  res.status(401).send('Invalid username or password');
	}
  });

  // API to get payment service (Placeholder for future APIs)
app.get('/payments', (req, res) => {
	res.json({ message: 'Payments service is under construction.' });
  });

  // Start server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
  });

// Login route (for simplicity, it's a dummy example)
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//
//     // Dummy login validation, in a real-world scenario use DB or authentication service
//       if (username === 'user' && password === 'password') {
//           const token = jwt.encode({ username }, process.env.JWT_SECRET);
//               res.json({ token });
//                 } else {
//                     res.status(401).send('Invalid credentials');
//                       }
//                       });
//
//                       // API to get the payment service and other data can go here.
//                       app.listen(PORT, () => {
//                         console.log(`Server running on port ${PORT}`);
//                         });
//
