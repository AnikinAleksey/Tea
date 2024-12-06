const express = require('express');
const cors = require('cors');
const teasRouter = require('./src/routes/teas');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/teas', teasRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});