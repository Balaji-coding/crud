const express = require('express');
const cors = require('cors');
const ConnectDb = require('./config/ConnectDb');
const app = express();
app.use(cors());
app.use(express.json());
ConnectDb();

app.get('/', (req, res) => {
    res.send('Hello World!');
});
const alldata =require('./routes/Alldata');
app.use('/api', alldata);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});