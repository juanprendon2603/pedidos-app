// Read environment variables
require('dotenv').config();

const app = require('./server');
require('./database');

// Server is listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
