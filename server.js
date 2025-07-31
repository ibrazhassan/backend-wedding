// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/save-field', (req, res) => {
  const { field, value, timestamp } = req.body;
  console.log(`Received: ${field} = ${value} at ${timestamp}`);

  // For now, just send back success
  res.status(200).json({ message: 'Saved successfully' });
});

app.get('/', (req, res) => {
  res.send('RSVP Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
