const express = require('express');
const cors = require('cors');
require('dotenv').config();
const weatherRoute = require('./routes/weather');

const app = express();
app.use(cors());

app.use('/weather', weatherRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));