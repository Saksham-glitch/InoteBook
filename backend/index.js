const express = require('express');
const connectToMongo = require('./db');
const app = express();
const port = 5000;
const cors = require('cors');

connectToMongo();
 
app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/notes', require('./routes/notes.routes'));

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});